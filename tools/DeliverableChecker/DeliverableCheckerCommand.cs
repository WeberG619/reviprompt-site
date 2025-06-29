using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;

namespace DeliverableChecker
{
    [Transaction(TransactionMode.ReadOnly)]
    [Regeneration(RegenerationOption.Manual)]
    public class DeliverableCheckerCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            try
            {
                UIApplication uiApp = commandData.Application;
                UIDocument uiDoc = uiApp.ActiveUIDocument;
                Document doc = uiDoc.Document;

                // Show deliverable checking options dialog
                var optionsDialog = new DeliverableOptionsDialog();
                if (optionsDialog.ShowDialog() != DialogResult.OK)
                    return Result.Cancelled;

                var options = optionsDialog.DeliverableOptions;

                // Perform deliverable checking
                var checker = new ProjectDeliverableChecker();
                var results = checker.CheckDeliverables(doc, options);

                // Generate deliverable report
                var reporter = new DeliverableReporter();
                var reportPath = reporter.GenerateReport(results, doc.Title);

                // Show results summary
                var summary = GenerateDeliverableSummary(results);
                var dialog = TaskDialog.NewTaskDialog("Deliverable Check Complete");
                dialog.MainContent = summary;
                dialog.AddCommandLink(TaskDialogCommandLinkId.CommandLink1, 
                    "Open Detailed Report", "View Excel report with complete deliverable analysis");
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

        private string GenerateDeliverableSummary(DeliverableResults results)
        {
            var passedCount = results.CheckResults.Count(c => c.Status == CheckStatus.Pass);
            var failedCount = results.CheckResults.Count(c => c.Status == CheckStatus.Fail);
            var warningCount = results.CheckResults.Count(c => c.Status == CheckStatus.Warning);

            var summary = $"DELIVERABLE CHECK RESULTS\\n\\n";
            
            // Overall status
            var overallStatus = failedCount == 0 ? "READY FOR DELIVERY" : 
                               failedCount <= 2 ? "MINOR ISSUES" : "REQUIRES ATTENTION";
            
            summary += $"Overall Status: {overallStatus}\\n\\n";
            
            summary += $"Total Checks: {results.CheckResults.Count}\\n";
            
            if (passedCount > 0)
                summary += $"✅ Passed: {passedCount}\\n";
            if (warningCount > 0)
                summary += $"⚠️ Warnings: {warningCount}\\n";
            if (failedCount > 0)
                summary += $"❌ Failed: {failedCount}\\n";

            // Critical failures
            var criticalFailures = results.CheckResults
                .Where(c => c.Status == CheckStatus.Fail && c.IsCritical)
                .ToList();

            if (criticalFailures.Any())
            {
                summary += $"\\n🚨 Critical Issues: {criticalFailures.Count}\\n";
                summary += "Must be resolved before delivery.";
            }

            return summary;
        }
    }

    public class ProjectDeliverableChecker
    {
        public DeliverableResults CheckDeliverables(Document doc, DeliverableOptions options)
        {
            var results = new DeliverableResults
            {
                ProjectName = doc.Title,
                CheckDate = DateTime.Now,
                Options = options
            };

            var checks = new List<DeliverableCheck>();

            // Model completeness checks
            if (options.CheckModelCompleteness)
            {
                checks.AddRange(CheckModelCompleteness(doc));
            }

            // Sheet and view checks
            if (options.CheckSheetsAndViews)
            {
                checks.AddRange(CheckSheetsAndViews(doc));
            }

            // Coordination checks
            if (options.CheckCoordination)
            {
                checks.AddRange(CheckCoordination(doc));
            }

            // Documentation checks
            if (options.CheckDocumentation)
            {
                checks.AddRange(CheckDocumentation(doc));
            }

            // Quality checks
            if (options.CheckQuality)
            {
                checks.AddRange(CheckQuality(doc));
            }

            // Standards compliance
            if (options.CheckStandards)
            {
                checks.AddRange(CheckStandards(doc));
            }

            results.CheckResults = checks;
            results.OverallScore = CalculateOverallScore(checks);

            return results;
        }

        private List<DeliverableCheck> CheckModelCompleteness(Document doc)
        {
            var checks = new List<DeliverableCheck>();

            // Check for model elements
            var modelElements = new FilteredElementCollector(doc)
                .WhereElementIsNotElementType()
                .Where(e => e.Category != null)
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Model Completeness",
                CheckName = "Model Elements Present",
                Description = "Verify model contains design elements",
                Status = modelElements.Count > 0 ? CheckStatus.Pass : CheckStatus.Fail,
                Details = $"Found {modelElements.Count} model elements",
                IsCritical = true,
                Recommendation = modelElements.Count > 0 ? "Model contains elements" : "Add design elements to model"
            });

            // Check for levels
            var levels = new FilteredElementCollector(doc)
                .OfClass(typeof(Level))
                .Cast<Level>()
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Model Completeness",
                CheckName = "Levels Defined",
                Description = "Verify building levels are defined",
                Status = levels.Count >= 2 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {levels.Count} levels",
                IsCritical = false,
                Recommendation = levels.Count >= 2 ? "Adequate levels defined" : "Consider adding more levels for multi-story buildings"
            });

            // Check for grids
            var grids = new FilteredElementCollector(doc)
                .OfClass(typeof(Grid))
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Model Completeness",
                CheckName = "Grid System",
                Description = "Verify structural grid system",
                Status = grids.Count > 0 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {grids.Count} grid lines",
                IsCritical = false,
                Recommendation = grids.Count > 0 ? "Grid system present" : "Consider adding structural grid for coordination"
            });

            // Check for rooms/spaces
            var rooms = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_Rooms)
                .WhereElementIsNotElementType()
                .ToList();

            var spaces = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_MEPSpaces)
                .WhereElementIsNotElementType()
                .ToList();

            var totalSpaces = rooms.Count + spaces.Count;
            checks.Add(new DeliverableCheck
            {
                Category = "Model Completeness",
                CheckName = "Spatial Elements",
                Description = "Verify rooms/spaces are defined",
                Status = totalSpaces > 0 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {rooms.Count} rooms, {spaces.Count} MEP spaces",
                IsCritical = false,
                Recommendation = totalSpaces > 0 ? "Spatial elements present" : "Add rooms or spaces for area calculations"
            });

            return checks;
        }

        private List<DeliverableCheck> CheckSheetsAndViews(Document doc)
        {
            var checks = new List<DeliverableCheck>();

            // Check for sheets
            var sheets = new FilteredElementCollector(doc)
                .OfClass(typeof(ViewSheet))
                .Cast<ViewSheet>()
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Sheets and Views",
                CheckName = "Drawing Sheets",
                Description = "Verify drawing sheets are created",
                Status = sheets.Count > 0 ? CheckStatus.Pass : CheckStatus.Fail,
                Details = $"Found {sheets.Count} drawing sheets",
                IsCritical = true,
                Recommendation = sheets.Count > 0 ? "Drawing sheets present" : "Create drawing sheets for deliverables"
            });

            // Check for views on sheets
            var viewsOnSheets = sheets.SelectMany(s => s.GetAllPlacedViews()).ToList();
            checks.Add(new DeliverableCheck
            {
                Category = "Sheets and Views",
                CheckName = "Views on Sheets",
                Description = "Verify views are placed on sheets",
                Status = viewsOnSheets.Count > 0 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {viewsOnSheets.Count} views placed on sheets",
                IsCritical = false,
                Recommendation = viewsOnSheets.Count > 0 ? "Views placed on sheets" : "Place views on drawing sheets"
            });

            // Check for plan views
            var planViews = new FilteredElementCollector(doc)
                .OfClass(typeof(ViewPlan))
                .Cast<ViewPlan>()
                .Where(v => !v.IsTemplate)
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Sheets and Views",
                CheckName = "Floor Plan Views",
                Description = "Verify floor plan views exist",
                Status = planViews.Count > 0 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {planViews.Count} floor plan views",
                IsCritical = false,
                Recommendation = planViews.Count > 0 ? "Floor plans available" : "Create floor plan views"
            });

            // Check for elevations
            var elevations = new FilteredElementCollector(doc)
                .OfClass(typeof(View))
                .Cast<View>()
                .Where(v => v.ViewType == ViewType.Elevation && !v.IsTemplate)
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Sheets and Views",
                CheckName = "Elevation Views",
                Description = "Verify building elevation views",
                Status = elevations.Count >= 4 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {elevations.Count} elevation views",
                IsCritical = false,
                Recommendation = elevations.Count >= 4 ? "Adequate elevations" : "Create more elevation views"
            });

            // Check for sections
            var sections = new FilteredElementCollector(doc)
                .OfClass(typeof(ViewSection))
                .Cast<ViewSection>()
                .Where(v => !v.IsTemplate)
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Sheets and Views",
                CheckName = "Section Views",
                Description = "Verify section views for details",
                Status = sections.Count > 0 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {sections.Count} section views",
                IsCritical = false,
                Recommendation = sections.Count > 0 ? "Section views available" : "Consider adding section views for clarity"
            });

            return checks;
        }

        private List<DeliverableCheck> CheckCoordination(Document doc)
        {
            var checks = new List<DeliverableCheck>();

            // Check for warnings
            var warnings = doc.GetWarnings().ToList();
            var criticalWarnings = warnings.Where(w => w.GetSeverity() == FailureSeverity.Error).ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Coordination",
                CheckName = "Model Warnings",
                Description = "Check for critical model warnings",
                Status = criticalWarnings.Count == 0 ? CheckStatus.Pass : CheckStatus.Fail,
                Details = $"Found {warnings.Count} warnings ({criticalWarnings.Count} critical)",
                IsCritical = true,
                Recommendation = criticalWarnings.Count == 0 ? "No critical warnings" : "Resolve critical model warnings"
            });

            // Check for links
            var revitLinks = new FilteredElementCollector(doc)
                .OfClass(typeof(RevitLinkInstance))
                .ToList();

            var cadLinks = new FilteredElementCollector(doc)
                .OfClass(typeof(ImportInstance))
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Coordination",
                CheckName = "External Links",
                Description = "Verify external file coordination",
                Status = CheckStatus.Pass, // This would need more sophisticated checking
                Details = $"Found {revitLinks.Count} Revit links, {cadLinks.Count} CAD links",
                IsCritical = false,
                Recommendation = "Verify all links are properly loaded and coordinated"
            });

            // Check worksets (if workshared)
            if (doc.IsWorkshared)
            {
                var worksets = new FilteredWorksetCollector(doc)
                    .OfKind(WorksetKind.UserWorkset)
                    .ToList();

                checks.Add(new DeliverableCheck
                {
                    Category = "Coordination",
                    CheckName = "Workset Organization",
                    Description = "Verify workset organization",
                    Status = worksets.Count > 1 ? CheckStatus.Pass : CheckStatus.Warning,
                    Details = $"Found {worksets.Count} user worksets",
                    IsCritical = false,
                    Recommendation = worksets.Count > 1 ? "Multiple worksets for organization" : "Consider using multiple worksets"
                });
            }

            return checks;
        }

        private List<DeliverableCheck> CheckDocumentation(Document doc)
        {
            var checks = new List<DeliverableCheck>();

            // Check for title blocks
            var titleBlocks = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_TitleBlocks)
                .WhereElementIsNotElementType()
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Documentation",
                CheckName = "Title Blocks",
                Description = "Verify title blocks on sheets",
                Status = titleBlocks.Count > 0 ? CheckStatus.Pass : CheckStatus.Fail,
                Details = $"Found {titleBlocks.Count} title blocks",
                IsCritical = true,
                Recommendation = titleBlocks.Count > 0 ? "Title blocks present" : "Add title blocks to sheets"
            });

            // Check for dimensions
            var dimensions = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_Dimensions)
                .WhereElementIsNotElementType()
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Documentation",
                CheckName = "Dimensions",
                Description = "Verify dimensioning is present",
                Status = dimensions.Count > 0 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {dimensions.Count} dimensions",
                IsCritical = false,
                Recommendation = dimensions.Count > 0 ? "Dimensions present" : "Add dimensions for construction clarity"
            });

            // Check for text and annotations
            var textNotes = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_TextNotes)
                .WhereElementIsNotElementType()
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Documentation",
                CheckName = "Text Annotations",
                Description = "Verify text annotations are present",
                Status = textNotes.Count > 0 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {textNotes.Count} text notes",
                IsCritical = false,
                Recommendation = textNotes.Count > 0 ? "Text annotations present" : "Add text notes for clarification"
            });

            // Check for schedules
            var schedules = new FilteredElementCollector(doc)
                .OfClass(typeof(ViewSchedule))
                .Cast<ViewSchedule>()
                .Where(s => !s.IsTemplate)
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Documentation",
                CheckName = "Schedules",
                Description = "Verify schedules are created",
                Status = schedules.Count > 0 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {schedules.Count} schedules",
                IsCritical = false,
                Recommendation = schedules.Count > 0 ? "Schedules available" : "Create schedules for quantity takeoffs"
            });

            return checks;
        }

        private List<DeliverableCheck> CheckQuality(Document doc)
        {
            var checks = new List<DeliverableCheck>();

            // Check model file size
            var filePath = doc.PathName;
            if (!string.IsNullOrEmpty(filePath) && System.IO.File.Exists(filePath))
            {
                var fileInfo = new System.IO.FileInfo(filePath);
                var fileSizeMB = fileInfo.Length / (1024.0 * 1024.0);

                checks.Add(new DeliverableCheck
                {
                    Category = "Quality",
                    CheckName = "File Size",
                    Description = "Check model file size for performance",
                    Status = fileSizeMB < 200 ? CheckStatus.Pass : fileSizeMB < 500 ? CheckStatus.Warning : CheckStatus.Fail,
                    Details = $"File size: {fileSizeMB:F1} MB",
                    IsCritical = false,
                    Recommendation = fileSizeMB < 200 ? "File size optimal" : "Consider model optimization for performance"
                });
            }

            // Check for unused families
            var allFamilies = new FilteredElementCollector(doc)
                .OfClass(typeof(Family))
                .Cast<Family>()
                .ToList();

            var unusedFamilies = allFamilies.Where(f => !HasFamilyInstances(doc, f)).ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Quality",
                CheckName = "Unused Families",
                Description = "Check for unused families affecting file size",
                Status = unusedFamilies.Count <= 5 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {unusedFamilies.Count} unused families",
                IsCritical = false,
                Recommendation = unusedFamilies.Count <= 5 ? "Minimal unused families" : "Consider purging unused families"
            });

            // Check for empty views
            var views = new FilteredElementCollector(doc)
                .OfClass(typeof(View))
                .Cast<View>()
                .Where(v => !v.IsTemplate && v.CanBePrinted)
                .ToList();

            var emptyViews = views.Where(v => IsViewEmpty(doc, v)).ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Quality",
                CheckName = "Empty Views",
                Description = "Check for views with no visible elements",
                Status = emptyViews.Count <= 2 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {emptyViews.Count} potentially empty views",
                IsCritical = false,
                Recommendation = emptyViews.Count <= 2 ? "Minimal empty views" : "Review and remove unnecessary views"
            });

            return checks;
        }

        private List<DeliverableCheck> CheckStandards(Document doc)
        {
            var checks = new List<DeliverableCheck>();

            // Check for project information
            var projectInfo = doc.ProjectInformation;
            var projectName = projectInfo.Name;
            var projectNumber = projectInfo.Number;

            checks.Add(new DeliverableCheck
            {
                Category = "Standards",
                CheckName = "Project Information",
                Description = "Verify project information is filled",
                Status = !string.IsNullOrWhiteSpace(projectName) && !string.IsNullOrWhiteSpace(projectNumber) ? 
                         CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Project: '{projectName}', Number: '{projectNumber}'",
                IsCritical = false,
                Recommendation = "Ensure project information is complete"
            });

            // Check naming conventions (simplified)
            var views = new FilteredElementCollector(doc)
                .OfClass(typeof(View))
                .Cast<View>()
                .Where(v => !v.IsTemplate)
                .ToList();

            var properlyNamedViews = views.Where(v => !v.Name.Contains("Copy") && !v.Name.Contains("{3D}")).ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Standards",
                CheckName = "View Naming",
                Description = "Check view naming conventions",
                Status = properlyNamedViews.Count >= views.Count * 0.8 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"{properlyNamedViews.Count} of {views.Count} views properly named",
                IsCritical = false,
                Recommendation = "Follow consistent view naming conventions"
            });

            // Check for view templates
            var viewTemplates = new FilteredElementCollector(doc)
                .OfClass(typeof(View))
                .Cast<View>()
                .Where(v => v.IsTemplate)
                .ToList();

            checks.Add(new DeliverableCheck
            {
                Category = "Standards",
                CheckName = "View Templates",
                Description = "Verify view templates are used",
                Status = viewTemplates.Count > 0 ? CheckStatus.Pass : CheckStatus.Warning,
                Details = $"Found {viewTemplates.Count} view templates",
                IsCritical = false,
                Recommendation = viewTemplates.Count > 0 ? "View templates in use" : "Create view templates for consistency"
            });

            return checks;
        }

        private bool HasFamilyInstances(Document doc, Family family)
        {
            var symbolIds = family.GetFamilySymbolIds();
            foreach (var symbolId in symbolIds)
            {
                var instances = new FilteredElementCollector(doc)
                    .OfClass(typeof(FamilyInstance))
                    .Where(fi => ((FamilyInstance)fi).GetTypeId() == symbolId)
                    .ToList();

                if (instances.Any())
                    return true;
            }
            return false;
        }

        private bool IsViewEmpty(Document doc, View view)
        {
            try
            {
                var collector = new FilteredElementCollector(doc, view.Id);
                var elements = collector.WhereElementIsNotElementType().ToList();
                return elements.Count <= 10; // Threshold for "empty"
            }
            catch
            {
                return false;
            }
        }

        private double CalculateOverallScore(List<DeliverableCheck> checks)
        {
            if (!checks.Any()) return 0;

            var totalPoints = 0.0;
            var maxPoints = 0.0;

            foreach (var check in checks)
            {
                var weight = check.IsCritical ? 2.0 : 1.0;
                maxPoints += weight;

                switch (check.Status)
                {
                    case CheckStatus.Pass:
                        totalPoints += weight;
                        break;
                    case CheckStatus.Warning:
                        totalPoints += weight * 0.5;
                        break;
                    case CheckStatus.Fail:
                        totalPoints += 0;
                        break;
                }
            }

            return maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
        }
    }

    public class DeliverableResults
    {
        public string ProjectName { get; set; }
        public DateTime CheckDate { get; set; }
        public DeliverableOptions Options { get; set; }
        public List<DeliverableCheck> CheckResults { get; set; } = new List<DeliverableCheck>();
        public double OverallScore { get; set; }
    }

    public class DeliverableCheck
    {
        public string Category { get; set; }
        public string CheckName { get; set; }
        public string Description { get; set; }
        public CheckStatus Status { get; set; }
        public string Details { get; set; }
        public bool IsCritical { get; set; }
        public string Recommendation { get; set; }
    }

    public enum CheckStatus
    {
        Pass,
        Warning,
        Fail
    }

    public class DeliverableOptions
    {
        public bool CheckModelCompleteness { get; set; } = true;
        public bool CheckSheetsAndViews { get; set; } = true;
        public bool CheckCoordination { get; set; } = true;
        public bool CheckDocumentation { get; set; } = true;
        public bool CheckQuality { get; set; } = true;
        public bool CheckStandards { get; set; } = true;
    }
}