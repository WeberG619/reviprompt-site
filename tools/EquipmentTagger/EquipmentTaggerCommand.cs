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
using OfficeOpenXml;

namespace EquipmentTagger
{
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class EquipmentTaggerCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            try
            {
                UIApplication uiApp = commandData.Application;
                UIDocument uiDoc = uiApp.ActiveUIDocument;
                Document doc = uiDoc.Document;

                // Show dialog to select equipment types to tag
                var dialog = new EquipmentSelectionDialog();
                if (dialog.ShowDialog() != DialogResult.OK)
                    return Result.Cancelled;

                var selectedTypes = dialog.SelectedEquipmentTypes;
                var tagResults = new List<TagResult>();

                using (Transaction trans = new Transaction(doc, "Auto-Tag MEP Equipment"))
                {
                    trans.Start();

                    foreach (var equipmentType in selectedTypes)
                    {
                        var result = TagEquipmentByType(doc, equipmentType);
                        tagResults.Add(result);
                    }

                    trans.Commit();
                }

                // Generate and show results
                var reporter = new TagReporter();
                reporter.GenerateReport(tagResults, doc.Title);
                
                TaskDialog.Show("Equipment Tagger", 
                    $"Successfully tagged {tagResults.Sum(r => r.TaggedCount)} equipment items.\n" +
                    $"Report saved to desktop.");

                return Result.Succeeded;
            }
            catch (Exception ex)
            {
                message = ex.Message;
                return Result.Failed;
            }
        }

        private TagResult TagEquipmentByType(Document doc, EquipmentType equipmentType)
        {
            var result = new TagResult { EquipmentType = equipmentType };
            
            // Get all untagged equipment of this type
            var untaggedEquipment = GetUntaggedEquipment(doc, equipmentType);
            result.TotalCount = untaggedEquipment.Count;

            // Get appropriate tag type
            var tagTypeId = GetTagTypeForEquipment(doc, equipmentType);
            if (tagTypeId == ElementId.InvalidElementId)
            {
                result.ErrorMessage = $"No suitable tag type found for {equipmentType}";
                return result;
            }

            // Tag each piece of equipment
            foreach (var equipment in untaggedEquipment)
            {
                try
                {
                    CreateTag(doc, equipment, tagTypeId);
                    result.TaggedCount++;
                }
                catch (Exception ex)
                {
                    result.FailedItems.Add($"{equipment.Id}: {ex.Message}");
                }
            }

            return result;
        }

        private List<Element> GetUntaggedEquipment(Document doc, EquipmentType equipmentType)
        {
            FilteredElementCollector collector = new FilteredElementCollector(doc);
            
            switch (equipmentType)
            {
                case EquipmentType.MechanicalEquipment:
                    collector.OfCategory(BuiltInCategory.OST_MechanicalEquipment);
                    break;
                case EquipmentType.ElectricalEquipment:
                    collector.OfCategory(BuiltInCategory.OST_ElectricalEquipment);
                    break;
                case EquipmentType.PlumbingFixtures:
                    collector.OfCategory(BuiltInCategory.OST_PlumbingFixtures);
                    break;
                case EquipmentType.AirTerminals:
                    collector.OfCategory(BuiltInCategory.OST_DuctTerminal);
                    break;
                case EquipmentType.LightingFixtures:
                    collector.OfCategory(BuiltInCategory.OST_LightingFixtures);
                    break;
                default:
                    return new List<Element>();
            }

            var allEquipment = collector.WhereElementIsNotElementType().ToList();
            var untagged = new List<Element>();

            foreach (var equipment in allEquipment)
            {
                if (!IsElementTagged(doc, equipment))
                    untagged.Add(equipment);
            }

            return untagged;
        }

        private bool IsElementTagged(Document doc, Element element)
        {
            // Check if element has any tags
            var tags = new FilteredElementCollector(doc)
                .OfClass(typeof(IndependentTag))
                .Cast<IndependentTag>()
                .Where(tag => tag.TaggedLocalElementId == element.Id)
                .ToList();

            return tags.Any();
        }

        private ElementId GetTagTypeForEquipment(Document doc, EquipmentType equipmentType)
        {
            var collector = new FilteredElementCollector(doc)
                .OfClass(typeof(FamilySymbol))
                .OfCategory(BuiltInCategory.OST_MultiCategoryTags);

            var tagTypes = collector.Cast<FamilySymbol>().ToList();

            // Return first available tag type for now
            // In a production version, this would be more sophisticated
            return tagTypes.FirstOrDefault()?.Id ?? ElementId.InvalidElementId;
        }

        private void CreateTag(Document doc, Element element, ElementId tagTypeId)
        {
            // Get element location
            var location = GetElementCenter(element);
            if (location == null) return;

            // Create tag with smart positioning
            var reference = new Reference(element);
            var tagMode = TagMode.TM_ADDBY_CATEGORY;
            var tagOrientation = TagOrientation.Horizontal;

            // Offset tag position to avoid overlapping
            var tagLocation = new XYZ(location.X + 2, location.Y + 2, location.Z);

            IndependentTag.Create(doc, tagTypeId, doc.ActiveView.Id, 
                reference, false, tagOrientation, tagLocation);
        }

        private XYZ GetElementCenter(Element element)
        {
            var bbox = element.get_BoundingBox(null);
            if (bbox == null) return null;

            return (bbox.Min + bbox.Max) / 2;
        }
    }

    public enum EquipmentType
    {
        MechanicalEquipment,
        ElectricalEquipment,
        PlumbingFixtures,
        AirTerminals,
        LightingFixtures
    }

    public class TagResult
    {
        public EquipmentType EquipmentType { get; set; }
        public int TotalCount { get; set; }
        public int TaggedCount { get; set; }
        public List<string> FailedItems { get; set; } = new List<string>();
        public string ErrorMessage { get; set; }
    }
}