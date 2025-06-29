using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;

namespace ElementCounter
{
    [Transaction(TransactionMode.ReadOnly)]
    [Regeneration(RegenerationOption.Manual)]
    public class ElementCounterCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            try
            {
                UIApplication uiApp = commandData.Application;
                UIDocument uiDoc = uiApp.ActiveUIDocument;
                Document doc = uiDoc.Document;

                // Show counting options dialog
                var optionsDialog = new CountingOptionsDialog();
                if (optionsDialog.ShowDialog() != DialogResult.OK)
                    return Result.Cancelled;

                var options = optionsDialog.CountingOptions;

                // Perform element counting
                var counter = new RevitElementCounter();
                var results = counter.CountElements(doc, options);

                // Generate counting report
                var reporter = new ElementCountReporter();
                var reportPath = reporter.GenerateReport(results, doc.Title);

                // Show results summary
                var summary = GenerateCountingSummary(results);
                var dialog = TaskDialog.NewTaskDialog("Element Counting Complete");
                dialog.MainContent = summary;
                dialog.AddCommandLink(TaskDialogCommandLinkId.CommandLink1, 
                    "Open Detailed Report", "View Excel report with complete element breakdown");
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

        private string GenerateCountingSummary(ElementCountResults results)
        {
            var summary = $"ELEMENT COUNT RESULTS\\n\\n";
            
            summary += $"Total Categories: {results.CategoryCounts.Count}\\n";
            summary += $"Total Elements: {results.CategoryCounts.Values.Sum()}\\n\\n";

            // Top categories by count
            var topCategories = results.CategoryCounts
                .OrderByDescending(c => c.Value)
                .Take(5)
                .ToList();

            if (topCategories.Any())
            {
                summary += "Top Categories:\\n";
                foreach (var category in topCategories)
                {
                    summary += $"• {category.Key}: {category.Value:N0} elements\\n";
                }
            }

            summary += $"\\nDetailed breakdown available in Excel report.";

            return summary;
        }
    }

    public class RevitElementCounter
    {
        public ElementCountResults CountElements(Document doc, CountingOptions options)
        {
            var results = new ElementCountResults
            {
                ProjectName = doc.Title,
                CountDate = DateTime.Now,
                Options = options
            };

            // Get all elements based on options
            var allElements = GetElementsToCount(doc, options);

            // Count by category
            results.CategoryCounts = CountByCategory(allElements, options);

            // Count by level if requested
            if (options.CountByLevel)
            {
                results.LevelCounts = CountByLevel(allElements, doc);
            }

            // Count by workset if requested
            if (options.CountByWorkset && doc.IsWorkshared)
            {
                results.WorksetCounts = CountByWorkset(allElements, doc);
            }

            // Count by type if requested
            if (options.CountByType)
            {
                results.TypeCounts = CountByType(allElements);
            }

            // Additional analysis
            if (options.IncludeAnalysis)
            {
                results.Analysis = PerformElementAnalysis(allElements, doc);
            }

            return results;
        }

        private List<Element> GetElementsToCount(Document doc, CountingOptions options)
        {
            var collector = new FilteredElementCollector(doc);
            
            if (options.CountOnlyModelElements)
            {
                collector = collector.WhereElementIsNotElementType();
            }

            var elements = collector.ToList();

            // Filter by view if requested
            if (options.CountInActiveViewOnly)
            {
                var activeView = doc.ActiveView;
                elements = elements.Where(e => activeView.CanUseTemporaryViewMode(TemporaryViewMode.TemporaryHideIsolate) 
                    && !activeView.IsElementVisibleInTemporaryViewMode(TemporaryViewMode.TemporaryHideIsolate, e.Id) == false).ToList();
            }

            // Filter by selection if requested
            if (options.CountSelectedOnly)
            {
                // This would need to be passed from the UI or handled differently in a real implementation
            }

            return elements;
        }

        private Dictionary<string, int> CountByCategory(List<Element> elements, CountingOptions options)
        {
            var categoryCounts = new Dictionary<string, int>();

            foreach (var element in elements)
            {
                var categoryName = GetCategoryName(element);
                
                if (!categoryCounts.ContainsKey(categoryName))
                    categoryCounts[categoryName] = 0;
                
                categoryCounts[categoryName]++;
            }

            return categoryCounts.OrderByDescending(c => c.Value).ToDictionary(c => c.Key, c => c.Value);
        }

        private Dictionary<string, int> CountByLevel(List<Element> elements, Document doc)
        {
            var levelCounts = new Dictionary<string, int>();

            foreach (var element in elements)
            {
                var levelName = GetElementLevel(element, doc);
                
                if (!levelCounts.ContainsKey(levelName))
                    levelCounts[levelName] = 0;
                
                levelCounts[levelName]++;
            }

            return levelCounts.OrderByDescending(l => l.Value).ToDictionary(l => l.Key, l => l.Value);
        }

        private Dictionary<string, int> CountByWorkset(List<Element> elements, Document doc)
        {
            var worksetCounts = new Dictionary<string, int>();

            foreach (var element in elements)
            {
                var worksetName = GetElementWorkset(element, doc);
                
                if (!worksetCounts.ContainsKey(worksetName))
                    worksetCounts[worksetName] = 0;
                
                worksetCounts[worksetName]++;
            }

            return worksetCounts.OrderByDescending(w => w.Value).ToDictionary(w => w.Key, w => w.Value);
        }

        private Dictionary<string, int> CountByType(List<Element> elements)
        {
            var typeCounts = new Dictionary<string, int>();

            var groupedByType = elements
                .Where(e => e.GetTypeId() != ElementId.InvalidElementId)
                .GroupBy(e => e.GetTypeId())
                .ToList();

            foreach (var group in groupedByType)
            {
                var typeElement = elements.FirstOrDefault()?.Document.GetElement(group.Key);
                var typeName = typeElement?.Name ?? "Unknown Type";
                var categoryName = GetCategoryName(group.First());
                var fullTypeName = $"{categoryName} - {typeName}";
                
                typeCounts[fullTypeName] = group.Count();
            }

            return typeCounts.OrderByDescending(t => t.Value).ToDictionary(t => t.Key, t => t.Value);
        }

        private ElementAnalysis PerformElementAnalysis(List<Element> elements, Document doc)
        {
            var analysis = new ElementAnalysis();

            // Calculate total area for area-bearing elements
            var wallElements = elements.OfType<Wall>().ToList();
            analysis.TotalWallArea = wallElements.Sum(w => w.get_Parameter(BuiltInParameter.HOST_AREA_COMPUTED)?.AsDouble() ?? 0);

            var floorElements = elements.OfType<Floor>().ToList();
            analysis.TotalFloorArea = floorElements.Sum(f => f.get_Parameter(BuiltInParameter.HOST_AREA_COMPUTED)?.AsDouble() ?? 0);

            var roofElements = elements.OfType<RoofBase>().ToList();
            analysis.TotalRoofArea = roofElements.Sum(r => r.get_Parameter(BuiltInParameter.HOST_AREA_COMPUTED)?.AsDouble() ?? 0);

            // Calculate total length for linear elements
            var wallLength = wallElements.Sum(w => w.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH)?.AsDouble() ?? 0);
            analysis.TotalWallLength = wallLength;

            // Count rooms and spaces
            analysis.RoomCount = elements.OfType<Room>().Count();
            analysis.SpaceCount = elements.OfType<Space>().Count();

            // Family instance analysis
            var familyInstances = elements.OfType<FamilyInstance>().ToList();
            analysis.FamilyInstanceCount = familyInstances.Count;
            analysis.UniqueFamily​Count = familyInstances.Select(f => f.Symbol.Family.Name).Distinct().Count();

            // MEP elements
            var mepElements = elements.Where(e => IsMEPElement(e)).ToList();
            analysis.MEPElementCount = mepElements.Count;

            return analysis;
        }

        private string GetCategoryName(Element element)
        {
            try
            {
                return element.Category?.Name ?? "Uncategorized";
            }
            catch
            {
                return "Unknown Category";
            }
        }

        private string GetElementLevel(Element element, Document doc)
        {
            try
            {
                var levelId = element.LevelId;
                if (levelId != ElementId.InvalidElementId)
                {
                    var level = doc.GetElement(levelId) as Level;
                    return level?.Name ?? "Unknown Level";
                }

                // Try to get level from location
                if (element.Location is LocationPoint locationPoint)
                {
                    var point = locationPoint.Point;
                    var levels = new FilteredElementCollector(doc)
                        .OfClass(typeof(Level))
                        .Cast<Level>()
                        .OrderBy(l => Math.Abs(l.Elevation - point.Z))
                        .FirstOrDefault();
                    
                    return levels?.Name ?? "No Level";
                }

                return "No Level";
            }
            catch
            {
                return "Unknown Level";
            }
        }

        private string GetElementWorkset(Element element, Document doc)
        {
            try
            {
                if (!doc.IsWorkshared)
                    return "Not Workshared";

                var worksetId = element.WorksetId;
                var workset = doc.GetWorksetTable().GetWorkset(worksetId);
                return workset.Name;
            }
            catch
            {
                return "Unknown Workset";
            }
        }

        private bool IsMEPElement(Element element)
        {
            if (element.Category == null) return false;

            var mepCategories = new[]
            {
                BuiltInCategory.OST_DuctCurves,
                BuiltInCategory.OST_DuctFitting,
                BuiltInCategory.OST_DuctTerminal,
                BuiltInCategory.OST_DuctAccessory,
                BuiltInCategory.OST_PipeCurves,
                BuiltInCategory.OST_PipeFitting,
                BuiltInCategory.OST_PipeAccessory,
                BuiltInCategory.OST_PlumbingFixtures,
                BuiltInCategory.OST_MechanicalEquipment,
                BuiltInCategory.OST_ElectricalEquipment,
                BuiltInCategory.OST_ElectricalFixtures,
                BuiltInCategory.OST_LightingFixtures,
                BuiltInCategory.OST_Conduit,
                BuiltInCategory.OST_ConduitFitting,
                BuiltInCategory.OST_CableTray,
                BuiltInCategory.OST_CableTrayFitting
            };

            return mepCategories.Contains((BuiltInCategory)element.Category.Id.IntegerValue);
        }
    }

    public class ElementCountResults
    {
        public string ProjectName { get; set; }
        public DateTime CountDate { get; set; }
        public CountingOptions Options { get; set; }
        public Dictionary<string, int> CategoryCounts { get; set; } = new Dictionary<string, int>();
        public Dictionary<string, int> LevelCounts { get; set; } = new Dictionary<string, int>();
        public Dictionary<string, int> WorksetCounts { get; set; } = new Dictionary<string, int>();
        public Dictionary<string, int> TypeCounts { get; set; } = new Dictionary<string, int>();
        public ElementAnalysis Analysis { get; set; }
    }

    public class ElementAnalysis
    {
        public double TotalWallArea { get; set; }
        public double TotalFloorArea { get; set; }
        public double TotalRoofArea { get; set; }
        public double TotalWallLength { get; set; }
        public int RoomCount { get; set; }
        public int SpaceCount { get; set; }
        public int FamilyInstanceCount { get; set; }
        public int UniqueFamilyCount { get; set; }
        public int MEPElementCount { get; set; }
    }

    public class CountingOptions
    {
        public bool CountOnlyModelElements { get; set; } = true;
        public bool CountInActiveViewOnly { get; set; } = false;
        public bool CountSelectedOnly { get; set; } = false;
        public bool CountByLevel { get; set; } = true;
        public bool CountByWorkset { get; set; } = true;
        public bool CountByType { get; set; } = false;
        public bool IncludeAnalysis { get; set; } = true;
        public bool ExcludeAnnotations { get; set; } = true;
        public bool ExcludeViews { get; set; } = true;
    }
}