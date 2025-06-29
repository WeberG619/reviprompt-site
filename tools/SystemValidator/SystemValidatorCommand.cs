using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.DB.Mechanical;
using Autodesk.Revit.DB.Electrical;
using Autodesk.Revit.DB.Plumbing;
using Autodesk.Revit.UI;

namespace SystemValidator
{
    [Transaction(TransactionMode.ReadOnly)]
    [Regeneration(RegenerationOption.Manual)]
    public class SystemValidatorCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            try
            {
                UIApplication uiApp = commandData.Application;
                UIDocument uiDoc = uiApp.ActiveUIDocument;
                Document doc = uiDoc.Document;

                // Show validation options dialog
                var optionsDialog = new ValidationOptionsDialog();
                if (optionsDialog.ShowDialog() != DialogResult.OK)
                    return Result.Cancelled;

                var options = optionsDialog.ValidationOptions;

                // Perform system validation
                var validator = new MEPSystemValidator();
                var results = validator.ValidateSystems(doc, options);

                if (!results.Issues.Any())
                {
                    TaskDialog.Show("System Validator", 
                        "✅ All MEP systems validated successfully!\n\n" +
                        "No connectivity issues or orphaned components found.");
                    return Result.Succeeded;
                }

                // Generate validation report
                var reporter = new ValidationReporter();
                var reportPath = reporter.GenerateReport(results, doc.Title);

                // Show results summary
                var summary = GenerateValidationSummary(results);
                var dialog = TaskDialog.NewTaskDialog("System Validation Complete");
                dialog.MainContent = summary;
                dialog.AddCommandLink(TaskDialogCommandLinkId.CommandLink1, 
                    "Open Detailed Report", "View Excel report with all issues and recommendations");
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

        private string GenerateValidationSummary(ValidationResults results)
        {
            var criticalCount = results.Issues.Count(i => i.Severity == IssueSeverity.Critical);
            var warningCount = results.Issues.Count(i => i.Severity == IssueSeverity.Warning);
            var infoCount = results.Issues.Count(i => i.Severity == IssueSeverity.Info);

            var summary = $"SYSTEM VALIDATION RESULTS\n\n";
            
            if (criticalCount > 0)
                summary += $"🔴 Critical Issues: {criticalCount}\n";
            if (warningCount > 0)
                summary += $"🟡 Warnings: {warningCount}\n";
            if (infoCount > 0)
                summary += $"🔵 Info: {infoCount}\n";

            summary += $"\nTotal Issues Found: {results.Issues.Count}\n\n";

            // Top issue types
            var topIssues = results.Issues
                .GroupBy(i => i.IssueType)
                .OrderByDescending(g => g.Count())
                .Take(3)
                .ToList();

            if (topIssues.Any())
            {
                summary += "Top Issues:\n";
                foreach (var issueGroup in topIssues)
                {
                    summary += $"• {issueGroup.Key}: {issueGroup.Count()} items\n";
                }
            }

            summary += "\nRecommendation: Review detailed report for specific locations and fix procedures.";

            return summary;
        }
    }

    public class MEPSystemValidator
    {
        public ValidationResults ValidateSystems(Document doc, ValidationOptions options)
        {
            var results = new ValidationResults
            {
                ProjectName = doc.Title,
                ValidationDate = DateTime.Now,
                Options = options
            };

            var issues = new List<ValidationIssue>();

            // Validate different system types based on options
            if (options.ValidateMechanical)
                issues.AddRange(ValidateMechanicalSystems(doc));

            if (options.ValidateElectrical)
                issues.AddRange(ValidateElectricalSystems(doc));

            if (options.ValidatePlumbing)
                issues.AddRange(ValidatePlumbingSystems(doc));

            results.Issues = issues;
            results.SystemsChecked = GetSystemsChecked(doc, options);

            return results;
        }

        private List<ValidationIssue> ValidateMechanicalSystems(Document doc)
        {
            var issues = new List<ValidationIssue>();

            // Check for unconnected ducts
            issues.AddRange(FindUnconnectedDucts(doc));

            // Check for orphaned mechanical equipment
            issues.AddRange(FindOrphanedMechanicalEquipment(doc));

            // Check air terminal connections
            issues.AddRange(ValidateAirTerminalConnections(doc));

            // Check mechanical system integrity
            issues.AddRange(ValidateMechanicalSystemIntegrity(doc));

            return issues;
        }

        private List<ValidationIssue> ValidateElectricalSystems(Document doc)
        {
            var issues = new List<ValidationIssue>();

            // Check for unconnected electrical equipment
            issues.AddRange(FindUnconnectedElectricalEquipment(doc));

            // Check circuit integrity
            issues.AddRange(ValidateCircuitIntegrity(doc));

            // Check for missing electrical connections
            issues.AddRange(FindMissingElectricalConnections(doc));

            return issues;
        }

        private List<ValidationIssue> ValidatePlumbingSystems(Document doc)
        {
            var issues = new List<ValidationIssue>();

            // Check for unconnected pipes
            issues.AddRange(FindUnconnectedPipes(doc));

            // Check plumbing fixture connections
            issues.AddRange(ValidatePlumbingFixtureConnections(doc));

            // Check plumbing system integrity
            issues.AddRange(ValidatePlumbingSystemIntegrity(doc));

            return issues;
        }

        private List<ValidationIssue> FindUnconnectedDucts(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var ducts = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_DuctCurves)
                .WhereElementIsNotElementType()
                .Cast<Duct>()
                .ToList();

            foreach (var duct in ducts)
            {
                var connectors = duct.ConnectorManager?.Connectors;
                if (connectors == null) continue;

                foreach (Connector connector in connectors)
                {
                    if (!connector.IsConnected)
                    {
                        issues.Add(new ValidationIssue
                        {
                            ElementId = duct.Id,
                            IssueType = "Unconnected Duct",
                            Description = $"Duct {duct.Id.IntegerValue} has unconnected connector",
                            Severity = IssueSeverity.Warning,
                            Location = GetElementLocation(duct),
                            SystemType = "Mechanical",
                            RecommendedAction = "Connect duct to equipment or add cap/plug"
                        });
                    }
                }
            }

            return issues;
        }

        private List<ValidationIssue> FindOrphanedMechanicalEquipment(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var equipment = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_MechanicalEquipment)
                .WhereElementIsNotElementType()
                .ToList();

            foreach (var equip in equipment)
            {
                var connectors = GetElementConnectors(equip);
                var hasConnections = connectors.Any(c => c.IsConnected);

                if (!hasConnections && connectors.Any())
                {
                    issues.Add(new ValidationIssue
                    {
                        ElementId = equip.Id,
                        IssueType = "Orphaned Equipment",
                        Description = $"Mechanical equipment {equip.Name} (ID: {equip.Id.IntegerValue}) has no connections",
                        Severity = IssueSeverity.Critical,
                        Location = GetElementLocation(equip),
                        SystemType = "Mechanical",
                        RecommendedAction = "Connect equipment to mechanical system or verify equipment placement"
                    });
                }
            }

            return issues;
        }

        private List<ValidationIssue> ValidateAirTerminalConnections(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var airTerminals = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_DuctTerminal)
                .WhereElementIsNotElementType()
                .ToList();

            foreach (var terminal in airTerminals)
            {
                var connectors = GetElementConnectors(terminal);
                var connectedToSystem = connectors.Any(c => c.IsConnected);

                if (!connectedToSystem)
                {
                    issues.Add(new ValidationIssue
                    {
                        ElementId = terminal.Id,
                        IssueType = "Unconnected Air Terminal",
                        Description = $"Air terminal {terminal.Name} (ID: {terminal.Id.IntegerValue}) is not connected to duct system",
                        Severity = IssueSeverity.Warning,
                        Location = GetElementLocation(terminal),
                        SystemType = "Mechanical",
                        RecommendedAction = "Connect air terminal to ductwork or verify installation"
                    });
                }
            }

            return issues;
        }

        private List<ValidationIssue> ValidateMechanicalSystemIntegrity(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var systems = new FilteredElementCollector(doc)
                .OfClass(typeof(MEPSystem))
                .Cast<MEPSystem>()
                .Where(s => s.SystemType == MEPSystemType.SupplyAir || 
                           s.SystemType == MEPSystemType.ReturnAir ||
                           s.SystemType == MEPSystemType.ExhaustAir)
                .ToList();

            foreach (var system in systems)
            {
                var elements = system.Elements?.Cast<Element>().ToList() ?? new List<Element>();
                
                if (elements.Count == 0)
                {
                    issues.Add(new ValidationIssue
                    {
                        ElementId = system.Id,
                        IssueType = "Empty System",
                        Description = $"Mechanical system '{system.Name}' contains no elements",
                        Severity = IssueSeverity.Warning,
                        SystemType = "Mechanical",
                        RecommendedAction = "Add elements to system or delete unused system"
                    });
                }
                else if (elements.Count == 1)
                {
                    issues.Add(new ValidationIssue
                    {
                        ElementId = system.Id,
                        IssueType = "Single Element System",
                        Description = $"Mechanical system '{system.Name}' contains only one element",
                        Severity = IssueSeverity.Info,
                        SystemType = "Mechanical",
                        RecommendedAction = "Verify system configuration and add additional elements if needed"
                    });
                }
            }

            return issues;
        }

        private List<ValidationIssue> FindUnconnectedElectricalEquipment(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var equipment = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_ElectricalEquipment)
                .WhereElementIsNotElementType()
                .ToList();

            foreach (var equip in equipment)
            {
                var connectors = GetElementConnectors(equip);
                var hasConnections = connectors.Any(c => c.IsConnected);

                if (!hasConnections && connectors.Any())
                {
                    issues.Add(new ValidationIssue
                    {
                        ElementId = equip.Id,
                        IssueType = "Unconnected Electrical Equipment",
                        Description = $"Electrical equipment {equip.Name} (ID: {equip.Id.IntegerValue}) has no electrical connections",
                        Severity = IssueSeverity.Critical,
                        Location = GetElementLocation(equip),
                        SystemType = "Electrical",
                        RecommendedAction = "Connect equipment to electrical circuit or verify power requirements"
                    });
                }
            }

            return issues;
        }

        private List<ValidationIssue> ValidateCircuitIntegrity(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var circuits = new FilteredElementCollector(doc)
                .OfClass(typeof(ElectricalSystem))
                .Cast<ElectricalSystem>()
                .ToList();

            foreach (var circuit in circuits)
            {
                var elements = circuit.Elements?.Cast<Element>().ToList() ?? new List<Element>();
                
                if (elements.Count == 0)
                {
                    issues.Add(new ValidationIssue
                    {
                        ElementId = circuit.Id,
                        IssueType = "Empty Circuit",
                        Description = $"Electrical circuit '{circuit.Name}' contains no connected elements",
                        Severity = IssueSeverity.Warning,
                        SystemType = "Electrical",
                        RecommendedAction = "Add elements to circuit or delete unused circuit"
                    });
                }
            }

            return issues;
        }

        private List<ValidationIssue> FindMissingElectricalConnections(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var fixtures = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_LightingFixtures)
                .WhereElementIsNotElementType()
                .ToList();

            fixtures.AddRange(new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_ElectricalFixtures)
                .WhereElementIsNotElementType()
                .ToList());

            foreach (var fixture in fixtures)
            {
                var connectors = GetElementConnectors(fixture);
                var isConnected = connectors.Any(c => c.IsConnected);

                if (!isConnected)
                {
                    issues.Add(new ValidationIssue
                    {
                        ElementId = fixture.Id,
                        IssueType = "Unconnected Fixture",
                        Description = $"Electrical fixture {fixture.Name} (ID: {fixture.Id.IntegerValue}) is not connected to any circuit",
                        Severity = IssueSeverity.Warning,
                        Location = GetElementLocation(fixture),
                        SystemType = "Electrical",
                        RecommendedAction = "Assign fixture to electrical circuit"
                    });
                }
            }

            return issues;
        }

        private List<ValidationIssue> FindUnconnectedPipes(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var pipes = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_PipeCurves)
                .WhereElementIsNotElementType()
                .Cast<Pipe>()
                .ToList();

            foreach (var pipe in pipes)
            {
                var connectors = pipe.ConnectorManager?.Connectors;
                if (connectors == null) continue;

                foreach (Connector connector in connectors)
                {
                    if (!connector.IsConnected)
                    {
                        issues.Add(new ValidationIssue
                        {
                            ElementId = pipe.Id,
                            IssueType = "Unconnected Pipe",
                            Description = $"Pipe {pipe.Id.IntegerValue} has unconnected connector",
                            Severity = IssueSeverity.Warning,
                            Location = GetElementLocation(pipe),
                            SystemType = "Plumbing",
                            RecommendedAction = "Connect pipe to fixture/equipment or add cap"
                        });
                    }
                }
            }

            return issues;
        }

        private List<ValidationIssue> ValidatePlumbingFixtureConnections(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var fixtures = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_PlumbingFixtures)
                .WhereElementIsNotElementType()
                .ToList();

            foreach (var fixture in fixtures)
            {
                var connectors = GetElementConnectors(fixture);
                var hasConnections = connectors.Any(c => c.IsConnected);

                if (!hasConnections && connectors.Any())
                {
                    issues.Add(new ValidationIssue
                    {
                        ElementId = fixture.Id,
                        IssueType = "Unconnected Plumbing Fixture",
                        Description = $"Plumbing fixture {fixture.Name} (ID: {fixture.Id.IntegerValue}) has no pipe connections",
                        Severity = IssueSeverity.Critical,
                        Location = GetElementLocation(fixture),
                        SystemType = "Plumbing",
                        RecommendedAction = "Connect fixture to plumbing system"
                    });
                }
            }

            return issues;
        }

        private List<ValidationIssue> ValidatePlumbingSystemIntegrity(Document doc)
        {
            var issues = new List<ValidationIssue>();
            
            var systems = new FilteredElementCollector(doc)
                .OfClass(typeof(PipingSystem))
                .Cast<PipingSystem>()
                .ToList();

            foreach (var system in systems)
            {
                var elements = system.Elements?.Cast<Element>().ToList() ?? new List<Element>();
                
                if (elements.Count == 0)
                {
                    issues.Add(new ValidationIssue
                    {
                        ElementId = system.Id,
                        IssueType = "Empty Plumbing System",
                        Description = $"Plumbing system '{system.Name}' contains no elements",
                        Severity = IssueSeverity.Warning,
                        SystemType = "Plumbing",
                        RecommendedAction = "Add elements to system or delete unused system"
                    });
                }
            }

            return issues;
        }

        private List<Connector> GetElementConnectors(Element element)
        {
            var connectors = new List<Connector>();
            
            try
            {
                if (element is FamilyInstance familyInstance)
                {
                    var connectorManager = familyInstance.MEPModel?.ConnectorManager;
                    if (connectorManager != null)
                    {
                        foreach (Connector connector in connectorManager.Connectors)
                        {
                            connectors.Add(connector);
                        }
                    }
                }
            }
            catch
            {
                // Element doesn't have connectors or MEP model
            }

            return connectors;
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

        private List<string> GetSystemsChecked(Document doc, ValidationOptions options)
        {
            var systems = new List<string>();
            
            if (options.ValidateMechanical)
                systems.Add("Mechanical Systems");
            if (options.ValidateElectrical)
                systems.Add("Electrical Systems");
            if (options.ValidatePlumbing)
                systems.Add("Plumbing Systems");

            return systems;
        }
    }

    public class ValidationResults
    {
        public string ProjectName { get; set; }
        public DateTime ValidationDate { get; set; }
        public ValidationOptions Options { get; set; }
        public List<ValidationIssue> Issues { get; set; } = new List<ValidationIssue>();
        public List<string> SystemsChecked { get; set; } = new List<string>();
    }

    public class ValidationIssue
    {
        public ElementId ElementId { get; set; }
        public string IssueType { get; set; }
        public string Description { get; set; }
        public IssueSeverity Severity { get; set; }
        public string Location { get; set; }
        public string SystemType { get; set; }
        public string RecommendedAction { get; set; }
    }

    public enum IssueSeverity
    {
        Info,
        Warning,
        Critical
    }

    public class ValidationOptions
    {
        public bool ValidateMechanical { get; set; } = true;
        public bool ValidateElectrical { get; set; } = true;
        public bool ValidatePlumbing { get; set; } = true;
        public bool CheckConnectivity { get; set; } = true;
        public bool CheckSystemIntegrity { get; set; } = true;
        public bool FindOrphanedElements { get; set; } = true;
    }
}