using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using System.IO;

namespace ModelAuditor
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class ModelAuditorCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            try
            {
                UIApplication uiApp = commandData.Application;
                UIDocument uiDoc = uiApp.ActiveUIDocument;
                Document doc = uiDoc.Document;

                // Show audit options dialog
                var optionsDialog = new AuditOptionsDialog();
                if (optionsDialog.ShowDialog() != DialogResult.OK)
                    return Result.Cancelled;

                var options = optionsDialog.AuditOptions;

                // Perform comprehensive model audit
                var auditor = new RevitModelAuditor();
                var results = auditor.AuditModel(doc, options);

                // Auto-fix issues if requested
                if (options.AutoFixIssues && results.FixableIssues.Any())
                {
                    using (Transaction trans = new Transaction(doc, "Auto-Fix Model Issues"))
                    {
                        trans.Start();
                        var fixer = new ModelIssueFixer();
                        var fixResults = fixer.FixIssues(doc, results.FixableIssues);
                        results.FixResults = fixResults;
                        trans.Commit();
                    }
                }

                // Generate comprehensive audit report
                var reporter = new ModelAuditReporter();
                var reportPath = reporter.GenerateReport(results, doc.Title);

                // Show results summary
                var summary = GenerateAuditSummary(results);
                var dialog = TaskDialog.NewTaskDialog("Model Audit Complete");
                dialog.MainContent = summary;
                dialog.AddCommandLink(TaskDialogCommandLinkId.CommandLink1, 
                    "Open Detailed Report", "View comprehensive audit report with recommendations");
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

        private string GenerateAuditSummary(ModelAuditResults results)
        {
            var summary = $"MODEL HEALTH AUDIT RESULTS\n\n";
            
            summary += $"Overall Health Score: {results.HealthScore:F1}/100\n";
            summary += $"Audit Categories: {results.CategoryResults.Count}\n";
            summary += $"Total Issues Found: {results.AllIssues.Count}\n\n";

            // Issue breakdown by severity
            var criticalCount = results.AllIssues.Count(i => i.Severity == AuditSeverity.Critical);
            var highCount = results.AllIssues.Count(i => i.Severity == AuditSeverity.High);
            var mediumCount = results.AllIssues.Count(i => i.Severity == AuditSeverity.Medium);
            var lowCount = results.AllIssues.Count(i => i.Severity == AuditSeverity.Low);

            if (criticalCount > 0)
                summary += $"🔴 Critical: {criticalCount}\n";
            if (highCount > 0)
                summary += $"🟠 High: {highCount}\n";
            if (mediumCount > 0)
                summary += $"🟡 Medium: {mediumCount}\n";
            if (lowCount > 0)
                summary += $"🟢 Low: {lowCount}\n";

            // Auto-fix results
            if (results.FixResults != null)
            {
                summary += $"\nAuto-Fix Results:\n";
                summary += $"• Fixed: {results.FixResults.FixedCount}\n";
                summary += $"• Failed: {results.FixResults.FailedCount}\n";
            }

            // Top recommendations
            summary += "\nPriority Actions:\n";
            var topIssues = results.AllIssues
                .Where(i => i.Severity == AuditSeverity.Critical || i.Severity == AuditSeverity.High)
                .GroupBy(i => i.Category)
                .OrderByDescending(g => g.Count())
                .Take(3);

            foreach (var issueGroup in topIssues)
            {
                summary += $"• {issueGroup.Key}: {issueGroup.Count()} issues\n";
            }

            return summary;
        }
    }

    public class RevitModelAuditor
    {
        public ModelAuditResults AuditModel(Document doc, AuditOptions options)
        {
            var results = new ModelAuditResults
            {
                ProjectName = doc.Title,
                AuditDate = DateTime.Now,
                Options = options
            };

            var categoryResults = new List<CategoryAuditResult>();

            // Audit different categories based on options
            if (options.CheckWarnings)
                categoryResults.Add(AuditWarnings(doc));

            if (options.CheckMissingLinks)
                categoryResults.Add(AuditMissingLinks(doc));

            if (options.CheckUnusedFamilies)
                categoryResults.Add(AuditUnusedFamilies(doc));

            if (options.CheckModelPerformance)
                categoryResults.Add(AuditModelPerformance(doc));

            if (options.CheckViewsAndSheets)
                categoryResults.Add(AuditViewsAndSheets(doc));

            if (options.CheckWorksets)
                categoryResults.Add(AuditWorksets(doc));

            if (options.CheckCoordination)
                categoryResults.Add(AuditCoordination(doc));

            results.CategoryResults = categoryResults;
            results.AllIssues = categoryResults.SelectMany(c => c.Issues).ToList();
            results.FixableIssues = results.AllIssues.Where(i => i.IsFixable).ToList();
            results.HealthScore = CalculateHealthScore(results.AllIssues);

            return results;
        }

        private CategoryAuditResult AuditWarnings(Document doc)
        {
            var result = new CategoryAuditResult
            {
                Category = "Warnings",
                Description = "Revit model warnings and errors"
            };

            var warnings = doc.GetWarnings().ToList();
            
            foreach (var warning in warnings)
            {
                var severity = GetWarningSeverity(warning);
                var issue = new AuditIssue
                {
                    Category = "Warnings",
                    IssueType = warning.GetDescriptionText(),
                    Description = warning.GetDescriptionText(),
                    Severity = severity,
                    ElementIds = warning.GetFailingElements()?.ToList() ?? new List<ElementId>(),
                    IsFixable = IsWarningFixable(warning),
                    RecommendedAction = GetWarningRecommendation(warning)
                };
                result.Issues.Add(issue);
            }

            result.Summary = $"Found {warnings.Count} warnings in model";
            return result;
        }

        private CategoryAuditResult AuditMissingLinks(Document doc)
        {
            var result = new CategoryAuditResult
            {
                Category = "Missing Links",
                Description = "Missing external links and references"
            };

            // Check for missing CAD links
            var cadLinks = new FilteredElementCollector(doc)
                .OfClass(typeof(ImportInstance))
                .Cast<ImportInstance>()
                .ToList();

            foreach (var cadLink in cadLinks)
            {
                try
                {
                    var linkType = doc.GetElement(cadLink.GetTypeId()) as CADLinkType;
                    if (linkType != null && !linkType.IsLoaded)
                    {
                        result.Issues.Add(new AuditIssue
                        {
                            Category = "Missing Links",
                            IssueType = "Missing CAD Link",
                            Description = $"CAD link '{linkType.Name}' is not loaded",
                            Severity = AuditSeverity.Medium,
                            ElementIds = new List<ElementId> { cadLink.Id },
                            IsFixable = false,
                            RecommendedAction = "Reload or remove missing CAD link"
                        });
                    }
                }
                catch
                {
                    // Skip if unable to access link properties
                }
            }

            // Check for missing Revit links
            var revitLinks = new FilteredElementCollector(doc)
                .OfClass(typeof(RevitLinkInstance))
                .Cast<RevitLinkInstance>()
                .ToList();

            foreach (var revitLink in revitLinks)
            {
                var linkType = doc.GetElement(revitLink.GetTypeId()) as RevitLinkType;
                if (linkType != null && !revitLink.GetLinkDocument()?.IsValidObject == true)
                {
                    result.Issues.Add(new AuditIssue
                    {
                        Category = "Missing Links",
                        IssueType = "Missing Revit Link",
                        Description = $"Revit link '{linkType.Name}' is not loaded",
                        Severity = AuditSeverity.High,
                        ElementIds = new List<ElementId> { revitLink.Id },
                        IsFixable = false,
                        RecommendedAction = "Reload or remove missing Revit link"
                    });
                }
            }

            result.Summary = $"Found {result.Issues.Count} missing links";
            return result;
        }

        private CategoryAuditResult AuditUnusedFamilies(Document doc)
        {
            var result = new CategoryAuditResult
            {
                Category = "Unused Families",
                Description = "Families loaded but not used in project"
            };

            var allFamilies = new FilteredElementCollector(doc)
                .OfClass(typeof(Family))
                .Cast<Family>()
                .ToList();

            foreach (var family in allFamilies)
            {
                var familySymbols = family.GetFamilySymbolIds();
                var hasInstances = false;

                foreach (var symbolId in familySymbols)
                {
                    var instances = new FilteredElementCollector(doc)
                        .OfClass(typeof(FamilyInstance))
                        .Where(fi => ((FamilyInstance)fi).GetTypeId() == symbolId)
                        .ToList();

                    if (instances.Any())
                    {
                        hasInstances = true;
                        break;
                    }
                }

                if (!hasInstances)
                {
                    result.Issues.Add(new AuditIssue
                    {
                        Category = "Unused Families",
                        IssueType = "Unused Family",
                        Description = $"Family '{family.Name}' is loaded but not used",
                        Severity = AuditSeverity.Low,
                        ElementIds = new List<ElementId> { family.Id },
                        IsFixable = true,
                        RecommendedAction = "Delete unused family to reduce file size"
                    });
                }
            }

            result.Summary = $"Found {result.Issues.Count} unused families";
            return result;
        }

        private CategoryAuditResult AuditModelPerformance(Document doc)
        {
            var result = new CategoryAuditResult
            {
                Category = "Performance",
                Description = "Model performance and optimization"
            };

            // Check file size
            var filePath = doc.PathName;
            if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath))
            {
                var fileInfo = new FileInfo(filePath);
                var fileSizeMB = fileInfo.Length / (1024.0 * 1024.0);

                if (fileSizeMB > 500)
                {
                    result.Issues.Add(new AuditIssue
                    {
                        Category = "Performance",
                        IssueType = "Large File Size",
                        Description = $"Model file size is {fileSizeMB:F1} MB, which may impact performance",
                        Severity = fileSizeMB > 1000 ? AuditSeverity.High : AuditSeverity.Medium,
                        IsFixable = true,
                        RecommendedAction = "Consider purging unused elements, compacting file, or splitting model"
                    });
                }
            }

            // Check for excessive detail components
            var detailComponents = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_DetailComponents)
                .WhereElementIsNotElementType()
                .ToList();

            if (detailComponents.Count > 10000)
            {
                result.Issues.Add(new AuditIssue
                {
                    Category = "Performance",
                    IssueType = "Excessive Detail Components",
                    Description = $"Model contains {detailComponents.Count} detail components, which may impact performance",
                    Severity = AuditSeverity.Medium,
                    IsFixable = false,
                    RecommendedAction = "Review and remove unnecessary detail components"
                });
            }

            result.Summary = $"Performance analysis complete - {result.Issues.Count} issues found";
            return result;
        }

        private CategoryAuditResult AuditViewsAndSheets(Document doc)
        {
            var result = new CategoryAuditResult
            {
                Category = "Views and Sheets",
                Description = "View and sheet organization and cleanup"
            };

            // Check for views not on sheets
            var allViews = new FilteredElementCollector(doc)
                .OfClass(typeof(View))
                .Cast<View>()
                .Where(v => !v.IsTemplate && v.CanBePrinted)
                .ToList();

            var viewsOnSheets = new FilteredElementCollector(doc)
                .OfClass(typeof(ViewSheet))
                .Cast<ViewSheet>()
                .SelectMany(sheet => sheet.GetAllPlacedViews())
                .ToHashSet();

            foreach (var view in allViews)
            {
                if (!viewsOnSheets.Contains(view.Id) && view.ViewType != ViewType.DrawingSheet)
                {
                    var severity = view.Name.StartsWith("{3D}") || view.Name.Contains("Working") ? 
                        AuditSeverity.Low : AuditSeverity.Medium;

                    result.Issues.Add(new AuditIssue
                    {
                        Category = "Views and Sheets",
                        IssueType = "View Not On Sheet",
                        Description = $"View '{view.Name}' is not placed on any sheet",
                        Severity = severity,
                        ElementIds = new List<ElementId> { view.Id },
                        IsFixable = true,
                        RecommendedAction = "Place view on sheet or delete if not needed"
                    });
                }
            }

            result.Summary = $"Found {result.Issues.Count} view and sheet issues";
            return result;
        }

        private CategoryAuditResult AuditWorksets(Document doc)
        {
            var result = new CategoryAuditResult
            {
                Category = "Worksets",
                Description = "Workset organization and usage"
            };

            if (!doc.IsWorkshared)
            {
                result.Summary = "Model is not workshared";
                return result;
            }

            var worksetTable = doc.GetWorksetTable();
            var worksets = new FilteredWorksetCollector(doc)
                .OfKind(WorksetKind.UserWorkset)
                .ToList();

            foreach (var workset in worksets)
            {
                var elementsInWorkset = new FilteredElementCollector(doc)
                    .WherePasses(new ElementWorksetFilter(workset.Id))
                    .ToList();

                if (elementsInWorkset.Count == 0)
                {
                    result.Issues.Add(new AuditIssue
                    {
                        Category = "Worksets",
                        IssueType = "Empty Workset",
                        Description = $"Workset '{workset.Name}' contains no elements",
                        Severity = AuditSeverity.Low,
                        IsFixable = false,
                        RecommendedAction = "Consider removing empty workset if not needed"
                    });
                }
            }

            result.Summary = $"Workset audit complete - {result.Issues.Count} issues found";
            return result;
        }

        private CategoryAuditResult AuditCoordination(Document doc)
        {
            var result = new CategoryAuditResult
            {
                Category = "Coordination",
                Description = "Model coordination and standards compliance"
            };

            // Check for elements at wrong levels
            var levels = new FilteredElementCollector(doc)
                .OfClass(typeof(Level))
                .Cast<Level>()
                .ToList();

            if (levels.Count > 50)
            {
                result.Issues.Add(new AuditIssue
                {
                    Category = "Coordination",
                    IssueType = "Excessive Levels",
                    Description = $"Model contains {levels.Count} levels, which may indicate coordination issues",
                    Severity = AuditSeverity.Medium,
                    IsFixable = false,
                    RecommendedAction = "Review level usage and remove unnecessary levels"
                });
            }

            // Check for duplicate elements
            // This is a simplified check - a full implementation would be more sophisticated
            var walls = new FilteredElementCollector(doc)
                .OfClass(typeof(Wall))
                .Cast<Wall>()
                .ToList();

            var potentialDuplicates = walls
                .GroupBy(w => new { 
                    Type = w.GetTypeId(), 
                    Level = w.LevelId,
                    Length = Math.Round(w.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH)?.AsDouble() ?? 0, 2)
                })
                .Where(g => g.Count() > 1)
                .ToList();

            foreach (var duplicateGroup in potentialDuplicates)
            {
                result.Issues.Add(new AuditIssue
                {
                    Category = "Coordination",
                    IssueType = "Potential Duplicate Elements",
                    Description = $"Found {duplicateGroup.Count()} potentially duplicate walls",
                    Severity = AuditSeverity.Medium,
                    ElementIds = duplicateGroup.Select(w => w.Id).ToList(),
                    IsFixable = false,
                    RecommendedAction = "Review and remove duplicate elements manually"
                });
            }

            result.Summary = $"Coordination audit complete - {result.Issues.Count} issues found";
            return result;
        }

        private AuditSeverity GetWarningSeverity(FailureMessage warning)
        {
            var severity = warning.GetSeverity();
            switch (severity)
            {
                case FailureSeverity.Error:
                    return AuditSeverity.Critical;
                case FailureSeverity.Warning:
                    return AuditSeverity.Medium;
                default:
                    return AuditSeverity.Low;
            }
        }

        private bool IsWarningFixable(FailureMessage warning)
        {
            var description = warning.GetDescriptionText().ToLower();
            
            // Some warnings that can be auto-fixed
            return description.Contains("room") && description.Contains("not enclosed") ||
                   description.Contains("identical instances") ||
                   description.Contains("slightly off axis");
        }

        private string GetWarningRecommendation(FailureMessage warning)
        {
            var description = warning.GetDescriptionText().ToLower();
            
            if (description.Contains("room") && description.Contains("not enclosed"))
                return "Ensure room boundaries are properly enclosed";
            if (description.Contains("identical instances"))
                return "Review and remove duplicate elements";
            if (description.Contains("slightly off axis"))
                return "Align elements to grid or reference lines";
            
            return "Review warning details and resolve manually";
        }

        private double CalculateHealthScore(List<AuditIssue> issues)
        {
            if (!issues.Any()) return 100.0;

            var totalPenalty = 0.0;
            foreach (var issue in issues)
            {
                switch (issue.Severity)
                {
                    case AuditSeverity.Critical:
                        totalPenalty += 10.0;
                        break;
                    case AuditSeverity.High:
                        totalPenalty += 5.0;
                        break;
                    case AuditSeverity.Medium:
                        totalPenalty += 2.0;
                        break;
                    case AuditSeverity.Low:
                        totalPenalty += 0.5;
                        break;
                }
            }

            var healthScore = Math.Max(0, 100.0 - totalPenalty);
            return Math.Min(100.0, healthScore);
        }
    }

    public class ModelAuditResults
    {
        public string ProjectName { get; set; }
        public DateTime AuditDate { get; set; }
        public AuditOptions Options { get; set; }
        public List<CategoryAuditResult> CategoryResults { get; set; } = new List<CategoryAuditResult>();
        public List<AuditIssue> AllIssues { get; set; } = new List<AuditIssue>();
        public List<AuditIssue> FixableIssues { get; set; } = new List<AuditIssue>();
        public double HealthScore { get; set; }
        public FixResults FixResults { get; set; }
    }

    public class CategoryAuditResult
    {
        public string Category { get; set; }
        public string Description { get; set; }
        public string Summary { get; set; }
        public List<AuditIssue> Issues { get; set; } = new List<AuditIssue>();
    }

    public class AuditIssue
    {
        public string Category { get; set; }
        public string IssueType { get; set; }
        public string Description { get; set; }
        public AuditSeverity Severity { get; set; }
        public List<ElementId> ElementIds { get; set; } = new List<ElementId>();
        public bool IsFixable { get; set; }
        public string RecommendedAction { get; set; }
    }

    public enum AuditSeverity
    {
        Low,
        Medium,
        High,
        Critical
    }

    public class AuditOptions
    {
        public bool CheckWarnings { get; set; } = true;
        public bool CheckMissingLinks { get; set; } = true;
        public bool CheckUnusedFamilies { get; set; } = true;
        public bool CheckModelPerformance { get; set; } = true;
        public bool CheckViewsAndSheets { get; set; } = true;
        public bool CheckWorksets { get; set; } = true;
        public bool CheckCoordination { get; set; } = true;
        public bool AutoFixIssues { get; set; } = false;
    }

    public class FixResults
    {
        public int FixedCount { get; set; }
        public int FailedCount { get; set; }
        public List<string> FixedIssues { get; set; } = new List<string>();
        public List<string> FailedIssues { get; set; } = new List<string>();
    }

    public class ModelIssueFixer
    {
        public FixResults FixIssues(Document doc, List<AuditIssue> fixableIssues)
        {
            var results = new FixResults();

            foreach (var issue in fixableIssues)
            {
                try
                {
                    bool fixed = false;

                    switch (issue.IssueType)
                    {
                        case "Unused Family":
                            fixed = FixUnusedFamily(doc, issue);
                            break;
                        case "View Not On Sheet":
                            fixed = FixUnplacedView(doc, issue);
                            break;
                        // Add more fix methods as needed
                    }

                    if (fixed)
                    {
                        results.FixedCount++;
                        results.FixedIssues.Add(issue.Description);
                    }
                    else
                    {
                        results.FailedCount++;
                        results.FailedIssues.Add(issue.Description);
                    }
                }
                catch (Exception ex)
                {
                    results.FailedCount++;
                    results.FailedIssues.Add($"{issue.Description}: {ex.Message}");
                }
            }

            return results;
        }

        private bool FixUnusedFamily(Document doc, AuditIssue issue)
        {
            try
            {
                if (issue.ElementIds.Any())
                {
                    doc.Delete(issue.ElementIds);
                    return true;
                }
            }
            catch
            {
                // Family might be in use or protected
            }
            return false;
        }

        private bool FixUnplacedView(Document doc, AuditIssue issue)
        {
            try
            {
                if (issue.ElementIds.Any())
                {
                    var view = doc.GetElement(issue.ElementIds.First()) as View;
                    if (view != null && !view.IsTemplate && 
                        (view.Name.Contains("Working") || view.Name.Contains("3D")))
                    {
                        doc.Delete(issue.ElementIds);
                        return true;
                    }
                }
            }
            catch
            {
                // View might be referenced or protected
            }
            return false;
        }
    }
}