using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Electrical;
using Autodesk.Revit.DB.Mechanical;
using Autodesk.Revit.UI;

namespace LoadCalculator
{
    [Transaction(TransactionMode.ReadOnly)]
    [Regeneration(RegenerationOption.Manual)]
    public class LoadCalculatorCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            try
            {
                UIApplication uiApp = commandData.Application;
                UIDocument uiDoc = uiApp.ActiveUIDocument;
                Document doc = uiDoc.Document;

                // Show calculation options dialog
                var optionsDialog = new CalculationOptionsDialog();
                if (optionsDialog.ShowDialog() != DialogResult.OK)
                    return Result.Cancelled;

                var options = optionsDialog.CalculationOptions;

                // Collect electrical loads from model
                var loadCollector = new ElectricalLoadCollector();
                var equipmentLoads = loadCollector.CollectLoads(doc, options);

                if (!equipmentLoads.Any())
                {
                    TaskDialog.Show("Load Calculator", 
                        "No electrical equipment found with load data.\n\n" +
                        "Ensure your equipment families have 'Electrical - Watts' or similar parameters.");
                    return Result.Failed;
                }

                // Perform load calculations
                var calculator = new LoadCalculationEngine();
                var results = calculator.CalculateLoads(equipmentLoads, options);

                // Generate Excel report
                var reporter = new LoadReporter();
                var reportPath = reporter.GenerateReport(results, doc.Title, options);

                // Show results summary
                var summary = GenerateSummary(results);
                var dialog = TaskDialog.NewTaskDialog("Load Calculation Complete");
                dialog.MainContent = summary;
                dialog.AddCommandLink(TaskDialogCommandLinkId.CommandLink1, 
                    "Open Excel Report", "View detailed calculations and equipment list");
                dialog.AddCommandLink(TaskDialogCommandLinkId.CommandLink2, 
                    "Close", "Close without opening report");
                dialog.DefaultButton = TaskDialogResult.CommandLink1;

                var result = dialog.Show();
                
                if (result == TaskDialogResult.CommandLink1)
                {
                    System.Diagnostics.Process.Start(reportPath);
                }

                return Result.Succeeded;
            }
            catch (Exception ex)
            {
                message = ex.Message;
                return Result.Failed;
            }
        }

        private string GenerateSummary(LoadCalculationResults results)
        {
            return $"ELECTRICAL LOAD SUMMARY\n\n" +
                   $"Connected Loads:\n" +
                   $"• Lighting: {results.ConnectedLoads.Lighting:N0} W\n" +
                   $"• Receptacles: {results.ConnectedLoads.Receptacles:N0} W\n" +
                   $"• HVAC Equipment: {results.ConnectedLoads.HVAC:N0} W\n" +
                   $"• Other Equipment: {results.ConnectedLoads.Other:N0} W\n" +
                   $"• Total Connected: {results.ConnectedLoads.Total:N0} W\n\n" +
                   $"Demand Loads (NEC {results.CodeReference}):\n" +
                   $"• Lighting: {results.DemandLoads.Lighting:N0} W\n" +
                   $"• Receptacles: {results.DemandLoads.Receptacles:N0} W\n" +
                   $"• HVAC: {results.DemandLoads.HVAC:N0} W\n" +
                   $"• Other: {results.DemandLoads.Other:N0} W\n" +
                   $"• Total Demand: {results.DemandLoads.Total:N0} W\n\n" +
                   $"Service Requirements:\n" +
                   $"• Calculated Load: {results.ServiceLoad:N0} VA\n" +
                   $"• Recommended Service: {results.RecommendedServiceSize}A @ {results.SystemVoltage}V\n" +
                   $"• Load Density: {results.LoadDensity:F1} W/sq ft";
        }
    }

    public class ElectricalLoadCollector
    {
        public List<EquipmentLoadData> CollectLoads(Document doc, CalculationOptions options)
        {
            var equipmentLoads = new List<EquipmentLoadData>();

            // Collect lighting fixtures
            equipmentLoads.AddRange(CollectLightingLoads(doc));

            // Collect electrical equipment
            equipmentLoads.AddRange(CollectElectricalEquipmentLoads(doc));

            // Collect mechanical equipment with electrical loads
            equipmentLoads.AddRange(CollectMechanicalEquipmentLoads(doc));

            // Collect receptacles/devices
            if (options.IncludeReceptacles)
                equipmentLoads.AddRange(CollectReceptacleLoads(doc));

            return equipmentLoads;
        }

        private List<EquipmentLoadData> CollectLightingLoads(Document doc)
        {
            var loads = new List<EquipmentLoadData>();
            var collector = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_LightingFixtures)
                .WhereElementIsNotElementType();

            foreach (var element in collector)
            {
                var loadData = ExtractLoadData(element, LoadType.Lighting);
                if (loadData != null)
                    loads.Add(loadData);
            }

            return loads;
        }

        private List<EquipmentLoadData> CollectElectricalEquipmentLoads(Document doc)
        {
            var loads = new List<EquipmentLoadData>();
            var collector = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_ElectricalEquipment)
                .WhereElementIsNotElementType();

            foreach (var element in collector)
            {
                var loadData = ExtractLoadData(element, LoadType.Equipment);
                if (loadData != null)
                    loads.Add(loadData);
            }

            return loads;
        }

        private List<EquipmentLoadData> CollectMechanicalEquipmentLoads(Document doc)
        {
            var loads = new List<EquipmentLoadData>();
            var collector = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_MechanicalEquipment)
                .WhereElementIsNotElementType();

            foreach (var element in collector)
            {
                var loadData = ExtractLoadData(element, LoadType.HVAC);
                if (loadData != null)
                    loads.Add(loadData);
            }

            return loads;
        }

        private List<EquipmentLoadData> CollectReceptacleLoads(Document doc)
        {
            var loads = new List<EquipmentLoadData>();
            
            // Collect electrical fixtures (receptacles, switches, etc.)
            var collector = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_ElectricalFixtures)
                .WhereElementIsNotElementType();

            foreach (var element in collector)
            {
                var loadData = ExtractLoadData(element, LoadType.Receptacles);
                if (loadData != null)
                    loads.Add(loadData);
            }

            return loads;
        }

        private EquipmentLoadData ExtractLoadData(Element element, LoadType loadType)
        {
            try
            {
                var watts = GetParameterValue(element, "Electrical - Watts") ??
                           GetParameterValue(element, "Watts") ??
                           GetParameterValue(element, "Power");

                var voltage = GetParameterValue(element, "Electrical - Voltage") ??
                             GetParameterValue(element, "Voltage") ?? 120.0;

                var current = GetParameterValue(element, "Electrical - Current") ??
                             GetParameterValue(element, "Current");

                var powerFactor = GetParameterValue(element, "Electrical - Power Factor") ??
                                 GetParameterValue(element, "Power Factor") ?? 0.85;

                // Calculate watts if not directly available
                if (watts == null && current != null)
                {
                    watts = voltage * current * powerFactor;
                }

                if (watts == null || watts <= 0)
                    return null;

                var circuitNumber = GetParameterStringValue(element, "Circuit Number") ??
                                   GetParameterStringValue(element, "Electrical - Circuit Number");

                var panelName = GetParameterStringValue(element, "Panel Name") ??
                               GetParameterStringValue(element, "Electrical - Panel Name");

                var loadClassification = GetParameterStringValue(element, "Load Classification") ??
                                        GetParameterStringValue(element, "Electrical - Load Classification") ??
                                        "Non-Continuous";

                return new EquipmentLoadData
                {
                    ElementId = element.Id,
                    Name = element.Name,
                    Category = element.Category?.Name ?? "Unknown",
                    LoadType = loadType,
                    ConnectedWatts = watts.Value,
                    Voltage = voltage,
                    Current = current ?? (watts.Value / voltage / powerFactor),
                    PowerFactor = powerFactor,
                    CircuitNumber = circuitNumber,
                    PanelName = panelName,
                    LoadClassification = loadClassification,
                    IsContinuous = loadClassification?.ToLower().Contains("continuous") ?? false,
                    Location = GetElementLocation(element)
                };
            }
            catch
            {
                return null;
            }
        }

        private double? GetParameterValue(Element element, string parameterName)
        {
            var param = element.LookupParameter(parameterName);
            if (param != null && param.HasValue)
            {
                if (param.StorageType == StorageType.Double)
                    return param.AsDouble();
                else if (param.StorageType == StorageType.Integer)
                    return param.AsInteger();
            }
            return null;
        }

        private string GetParameterStringValue(Element element, string parameterName)
        {
            var param = element.LookupParameter(parameterName);
            return param?.AsString();
        }

        private string GetElementLocation(Element element)
        {
            try
            {
                var location = element.Location;
                if (location is LocationPoint locationPoint)
                {
                    var point = locationPoint.Point;
                    return $"({point.X:F1}, {point.Y:F1})";
                }
                return "Unknown";
            }
            catch
            {
                return "Unknown";
            }
        }
    }

    public enum LoadType
    {
        Lighting,
        Receptacles,
        HVAC,
        Equipment,
        Other
    }

    public class EquipmentLoadData
    {
        public ElementId ElementId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public LoadType LoadType { get; set; }
        public double ConnectedWatts { get; set; }
        public double Voltage { get; set; }
        public double Current { get; set; }
        public double PowerFactor { get; set; }
        public string CircuitNumber { get; set; }
        public string PanelName { get; set; }
        public string LoadClassification { get; set; }
        public bool IsContinuous { get; set; }
        public string Location { get; set; }
    }

    public class CalculationOptions
    {
        public BuildingType BuildingType { get; set; } = BuildingType.Office;
        public bool IncludeReceptacles { get; set; } = true;
        public bool ApplyDemandFactors { get; set; } = true;
        public string CodeEdition { get; set; } = "NEC 2023";
        public double SystemVoltage { get; set; } = 208.0;
        public bool UseCustomDemandFactors { get; set; } = false;
        public Dictionary<LoadType, double> CustomDemandFactors { get; set; } = new Dictionary<LoadType, double>();
    }

    public enum BuildingType
    {
        Office,
        Retail,
        Restaurant,
        Hotel,
        Residential,
        Industrial,
        Healthcare,
        Educational
    }
}