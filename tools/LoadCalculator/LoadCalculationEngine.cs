using System;
using System.Collections.Generic;
using System.Linq;

namespace LoadCalculator
{
    public class LoadCalculationEngine
    {
        public LoadCalculationResults CalculateLoads(List<EquipmentLoadData> equipmentLoads, CalculationOptions options)
        {
            var results = new LoadCalculationResults
            {
                EquipmentLoads = equipmentLoads,
                Options = options,
                CodeReference = options.CodeEdition,
                SystemVoltage = options.SystemVoltage
            };

            // Calculate connected loads by type
            results.ConnectedLoads = CalculateConnectedLoads(equipmentLoads);

            // Calculate demand loads based on NEC or custom factors
            results.DemandLoads = CalculateDemandLoads(results.ConnectedLoads, options);

            // Calculate service requirements
            results.ServiceLoad = results.DemandLoads.Total;
            results.RecommendedServiceSize = CalculateServiceSize(results.ServiceLoad, options.SystemVoltage);

            // Calculate additional metrics
            results.LoadDensity = CalculateLoadDensity(results.ConnectedLoads.Total, options);
            results.DiversityFactor = results.ConnectedLoads.Total > 0 ? 
                results.DemandLoads.Total / results.ConnectedLoads.Total : 0;

            // Generate circuit and panel summaries
            results.CircuitSummary = GenerateCircuitSummary(equipmentLoads);
            results.PanelSummary = GeneratePanelSummary(equipmentLoads, results.DemandLoads);

            return results;
        }

        private ConnectedLoads CalculateConnectedLoads(List<EquipmentLoadData> equipmentLoads)
        {
            var loads = new ConnectedLoads();

            foreach (var equipment in equipmentLoads)
            {
                switch (equipment.LoadType)
                {
                    case LoadType.Lighting:
                        loads.Lighting += equipment.ConnectedWatts;
                        break;
                    case LoadType.Receptacles:
                        loads.Receptacles += equipment.ConnectedWatts;
                        break;
                    case LoadType.HVAC:
                        loads.HVAC += equipment.ConnectedWatts;
                        break;
                    case LoadType.Equipment:
                        loads.Other += equipment.ConnectedWatts;
                        break;
                    default:
                        loads.Other += equipment.ConnectedWatts;
                        break;
                }
            }

            loads.Total = loads.Lighting + loads.Receptacles + loads.HVAC + loads.Other;
            return loads;
        }

        private DemandLoads CalculateDemandLoads(ConnectedLoads connectedLoads, CalculationOptions options)
        {
            var demandLoads = new DemandLoads();

            if (!options.ApplyDemandFactors && !options.UseCustomDemandFactors)
            {
                // No demand factors - use 100% of connected load
                demandLoads.Lighting = connectedLoads.Lighting;
                demandLoads.Receptacles = connectedLoads.Receptacles;
                demandLoads.HVAC = connectedLoads.HVAC;
                demandLoads.Other = connectedLoads.Other;
            }
            else if (options.UseCustomDemandFactors)
            {
                // Apply custom demand factors
                demandLoads.Lighting = connectedLoads.Lighting * 
                    options.CustomDemandFactors.GetValueOrDefault(LoadType.Lighting, 1.0);
                demandLoads.Receptacles = connectedLoads.Receptacles * 
                    options.CustomDemandFactors.GetValueOrDefault(LoadType.Receptacles, 1.0);
                demandLoads.HVAC = connectedLoads.HVAC * 
                    options.CustomDemandFactors.GetValueOrDefault(LoadType.HVAC, 1.0);
                demandLoads.Other = connectedLoads.Other * 
                    options.CustomDemandFactors.GetValueOrDefault(LoadType.Equipment, 1.0);
            }
            else
            {
                // Apply NEC demand factors
                demandLoads = ApplyNECDemandFactors(connectedLoads, options);
            }

            demandLoads.Total = demandLoads.Lighting + demandLoads.Receptacles + demandLoads.HVAC + demandLoads.Other;
            return demandLoads;
        }

        private DemandLoads ApplyNECDemandFactors(ConnectedLoads connectedLoads, CalculationOptions options)
        {
            var demandLoads = new DemandLoads();

            // NEC 220.42 - Lighting (General Illumination)
            if (connectedLoads.Lighting <= 3000)
            {
                demandLoads.Lighting = connectedLoads.Lighting; // 100% of first 3000 VA
            }
            else
            {
                demandLoads.Lighting = 3000 + (connectedLoads.Lighting - 3000) * 0.35; // 35% of remainder
            }

            // NEC 220.44 - Receptacles (General Purpose)
            if (options.IncludeReceptacles)
            {
                if (connectedLoads.Receptacles <= 10000)
                {
                    demandLoads.Receptacles = connectedLoads.Receptacles; // 100% of first 10 kVA
                }
                else
                {
                    demandLoads.Receptacles = 10000 + (connectedLoads.Receptacles - 10000) * 0.50; // 50% of remainder
                }
            }

            // NEC 220.50 - HVAC Equipment
            demandLoads.HVAC = ApplyHVACDemandFactors(connectedLoads.HVAC, options.BuildingType);

            // Other equipment - typically 100% unless specific code provisions apply
            demandLoads.Other = connectedLoads.Other;

            return demandLoads;
        }

        private double ApplyHVACDemandFactors(double hvacLoad, BuildingType buildingType)
        {
            // NEC 220.50 - Air-Conditioning and Heating Equipment
            // Generally 100% of largest load, but can vary by building type
            
            switch (buildingType)
            {
                case BuildingType.Hotel:
                case BuildingType.Residential:
                    // Residential: Can apply diversity for multiple units
                    return hvacLoad * 0.75; // Conservative diversity factor
                
                case BuildingType.Office:
                case BuildingType.Educational:
                    // Commercial: Usually 100% of connected load
                    return hvacLoad;
                
                case BuildingType.Restaurant:
                case BuildingType.Retail:
                    // High occupancy: Full load typically required
                    return hvacLoad;
                
                default:
                    return hvacLoad; // Conservative approach
            }
        }

        private int CalculateServiceSize(double demandLoad, double systemVoltage)
        {
            // Calculate current: P = V × I × √3 × PF (for 3-phase)
            // Assume 3-phase system and 0.85 power factor
            var current = demandLoad / (systemVoltage * Math.Sqrt(3) * 0.85);
            
            // Add 25% spare capacity per NEC 220.87
            current *= 1.25;

            // Round up to standard service sizes
            var standardSizes = new[] { 100, 125, 150, 200, 225, 400, 600, 800, 1000, 1200, 1600, 2000 };
            
            return standardSizes.FirstOrDefault(size => size >= current);
        }

        private double CalculateLoadDensity(double totalLoad, CalculationOptions options)
        {
            // Default building area estimate based on building type
            // In a real application, this would come from the model or user input
            var estimatedArea = GetEstimatedBuildingArea(options.BuildingType);
            
            return estimatedArea > 0 ? totalLoad / estimatedArea : 0;
        }

        private double GetEstimatedBuildingArea(BuildingType buildingType)
        {
            // This is a placeholder - in practice, you'd calculate this from the model
            // or get it from user input. These are typical ranges for estimation.
            switch (buildingType)
            {
                case BuildingType.Office: return 50000; // sq ft
                case BuildingType.Retail: return 25000;
                case BuildingType.Restaurant: return 8000;
                case BuildingType.Hotel: return 75000;
                case BuildingType.Residential: return 150000; // Multi-family
                case BuildingType.Industrial: return 100000;
                case BuildingType.Healthcare: return 200000;
                case BuildingType.Educational: return 125000;
                default: return 50000;
            }
        }

        private List<CircuitSummary> GenerateCircuitSummary(List<EquipmentLoadData> equipmentLoads)
        {
            return equipmentLoads
                .Where(e => !string.IsNullOrEmpty(e.CircuitNumber))
                .GroupBy(e => e.CircuitNumber)
                .Select(g => new CircuitSummary
                {
                    CircuitNumber = g.Key,
                    TotalLoad = g.Sum(e => e.ConnectedWatts),
                    EquipmentCount = g.Count(),
                    PanelName = g.First().PanelName ?? "Unknown",
                    LoadTypes = g.Select(e => e.LoadType).Distinct().ToList()
                })
                .OrderBy(c => c.CircuitNumber)
                .ToList();
        }

        private List<PanelSummary> GeneratePanelSummary(List<EquipmentLoadData> equipmentLoads, DemandLoads demandLoads)
        {
            return equipmentLoads
                .Where(e => !string.IsNullOrEmpty(e.PanelName))
                .GroupBy(e => e.PanelName)
                .Select(g => new PanelSummary
                {
                    PanelName = g.Key,
                    ConnectedLoad = g.Sum(e => e.ConnectedWatts),
                    // Apply simple demand factor for panel-level calculations
                    DemandLoad = g.Sum(e => e.ConnectedWatts) * 0.8, // Conservative 80% demand factor
                    CircuitCount = g.Select(e => e.CircuitNumber).Where(c => !string.IsNullOrEmpty(c)).Distinct().Count(),
                    EquipmentCount = g.Count()
                })
                .OrderBy(p => p.PanelName)
                .ToList();
        }
    }

    public class LoadCalculationResults
    {
        public List<EquipmentLoadData> EquipmentLoads { get; set; }
        public CalculationOptions Options { get; set; }
        public ConnectedLoads ConnectedLoads { get; set; }
        public DemandLoads DemandLoads { get; set; }
        public double ServiceLoad { get; set; }
        public int RecommendedServiceSize { get; set; }
        public double SystemVoltage { get; set; }
        public double LoadDensity { get; set; }
        public double DiversityFactor { get; set; }
        public string CodeReference { get; set; }
        public List<CircuitSummary> CircuitSummary { get; set; }
        public List<PanelSummary> PanelSummary { get; set; }
    }

    public class ConnectedLoads
    {
        public double Lighting { get; set; }
        public double Receptacles { get; set; }
        public double HVAC { get; set; }
        public double Other { get; set; }
        public double Total { get; set; }
    }

    public class DemandLoads
    {
        public double Lighting { get; set; }
        public double Receptacles { get; set; }
        public double HVAC { get; set; }
        public double Other { get; set; }
        public double Total { get; set; }
    }

    public class CircuitSummary
    {
        public string CircuitNumber { get; set; }
        public double TotalLoad { get; set; }
        public int EquipmentCount { get; set; }
        public string PanelName { get; set; }
        public List<LoadType> LoadTypes { get; set; }
    }

    public class PanelSummary
    {
        public string PanelName { get; set; }
        public double ConnectedLoad { get; set; }
        public double DemandLoad { get; set; }
        public int CircuitCount { get; set; }
        public int EquipmentCount { get; set; }
    }
}