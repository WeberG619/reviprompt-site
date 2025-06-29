using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using OfficeOpenXml;

namespace EquipmentTagger
{
    public class TagReporter
    {
        public void GenerateReport(List<TagResult> results, string projectName)
        {
            try
            {
                // Set EPPlus license context for non-commercial use
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

                var desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
                var fileName = $"EquipmentTagReport_{projectName}_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx";
                var filePath = Path.Combine(desktopPath, fileName);

                using (var package = new ExcelPackage())
                {
                    // Summary worksheet
                    var summarySheet = package.Workbook.Worksheets.Add("Summary");
                    CreateSummarySheet(summarySheet, results, projectName);

                    // Detailed results worksheet
                    var detailSheet = package.Workbook.Worksheets.Add("Detailed Results");
                    CreateDetailSheet(detailSheet, results);

                    // Failed items worksheet (if any failures)
                    var failedItems = results.Where(r => r.FailedItems.Any()).ToList();
                    if (failedItems.Any())
                    {
                        var failedSheet = package.Workbook.Worksheets.Add("Failed Items");
                        CreateFailedItemsSheet(failedSheet, failedItems);
                    }

                    package.SaveAs(new FileInfo(filePath));
                }

                System.Diagnostics.Process.Start(filePath);
            }
            catch (Exception ex)
            {
                System.Windows.Forms.MessageBox.Show(
                    $"Error generating report: {ex.Message}", 
                    "Report Error", 
                    System.Windows.Forms.MessageBoxButtons.OK, 
                    System.Windows.Forms.MessageBoxIcon.Error);
            }
        }

        private void CreateSummarySheet(ExcelWorksheet sheet, List<TagResult> results, string projectName)
        {
            sheet.Cells[1, 1].Value = "Equipment Tagging Report";
            sheet.Cells[1, 1].Style.Font.Size = 16;
            sheet.Cells[1, 1].Style.Font.Bold = true;

            sheet.Cells[2, 1].Value = $"Project: {projectName}";
            sheet.Cells[3, 1].Value = $"Generated: {DateTime.Now:yyyy-MM-dd HH:mm:ss}";
            sheet.Cells[4, 1].Value = $"By: ReviPrompt Lab Equipment Tagger";

            // Summary statistics
            var totalEquipment = results.Sum(r => r.TotalCount);
            var totalTagged = results.Sum(r => r.TaggedCount);
            var totalFailed = results.Sum(r => r.FailedItems.Count);

            sheet.Cells[6, 1].Value = "SUMMARY";
            sheet.Cells[6, 1].Style.Font.Bold = true;

            sheet.Cells[7, 1].Value = "Total Equipment Found:";
            sheet.Cells[7, 2].Value = totalEquipment;

            sheet.Cells[8, 1].Value = "Successfully Tagged:";
            sheet.Cells[8, 2].Value = totalTagged;

            sheet.Cells[9, 1].Value = "Failed to Tag:";
            sheet.Cells[9, 2].Value = totalFailed;

            sheet.Cells[10, 1].Value = "Success Rate:";
            sheet.Cells[10, 2].Value = totalEquipment > 0 ? 
                $"{(double)totalTagged / totalEquipment * 100:F1}%" : "N/A";

            // Equipment type breakdown
            sheet.Cells[12, 1].Value = "BY EQUIPMENT TYPE";
            sheet.Cells[12, 1].Style.Font.Bold = true;

            sheet.Cells[13, 1].Value = "Equipment Type";
            sheet.Cells[13, 2].Value = "Found";
            sheet.Cells[13, 3].Value = "Tagged";
            sheet.Cells[13, 4].Value = "Failed";
            sheet.Cells[13, 5].Value = "Success Rate";

            for (int i = 0; i < 5; i++)
            {
                sheet.Cells[13, i + 1].Style.Font.Bold = true;
            }

            int row = 14;
            foreach (var result in results)
            {
                sheet.Cells[row, 1].Value = result.EquipmentType.ToString();
                sheet.Cells[row, 2].Value = result.TotalCount;
                sheet.Cells[row, 3].Value = result.TaggedCount;
                sheet.Cells[row, 4].Value = result.FailedItems.Count;
                sheet.Cells[row, 5].Value = result.TotalCount > 0 ?
                    $"{(double)result.TaggedCount / result.TotalCount * 100:F1}%" : "N/A";
                row++;
            }

            // Auto-fit columns
            sheet.Cells[sheet.Dimension.Address].AutoFitColumns();
        }

        private void CreateDetailSheet(ExcelWorksheet sheet, List<TagResult> results)
        {
            sheet.Cells[1, 1].Value = "Detailed Tagging Results";
            sheet.Cells[1, 1].Style.Font.Size = 14;
            sheet.Cells[1, 1].Style.Font.Bold = true;

            // Headers
            sheet.Cells[3, 1].Value = "Equipment Type";
            sheet.Cells[3, 2].Value = "Total Found";
            sheet.Cells[3, 3].Value = "Successfully Tagged";
            sheet.Cells[3, 4].Value = "Failed Count";
            sheet.Cells[3, 5].Value = "Success Rate";
            sheet.Cells[3, 6].Value = "Notes";

            for (int i = 0; i < 6; i++)
            {
                sheet.Cells[3, i + 1].Style.Font.Bold = true;
            }

            int row = 4;
            foreach (var result in results)
            {
                sheet.Cells[row, 1].Value = result.EquipmentType.ToString();
                sheet.Cells[row, 2].Value = result.TotalCount;
                sheet.Cells[row, 3].Value = result.TaggedCount;
                sheet.Cells[row, 4].Value = result.FailedItems.Count;
                sheet.Cells[row, 5].Value = result.TotalCount > 0 ?
                    $"{(double)result.TaggedCount / result.TotalCount * 100:F1}%" : "N/A";
                sheet.Cells[row, 6].Value = string.IsNullOrEmpty(result.ErrorMessage) ? 
                    "Completed" : result.ErrorMessage;
                row++;
            }

            sheet.Cells[sheet.Dimension.Address].AutoFitColumns();
        }

        private void CreateFailedItemsSheet(ExcelWorksheet sheet, List<TagResult> failedResults)
        {
            sheet.Cells[1, 1].Value = "Failed Items Details";
            sheet.Cells[1, 1].Style.Font.Size = 14;
            sheet.Cells[1, 1].Style.Font.Bold = true;

            // Headers
            sheet.Cells[3, 1].Value = "Equipment Type";
            sheet.Cells[3, 2].Value = "Element ID";
            sheet.Cells[3, 3].Value = "Error Message";

            for (int i = 0; i < 3; i++)
            {
                sheet.Cells[3, i + 1].Style.Font.Bold = true;
            }

            int row = 4;
            foreach (var result in failedResults)
            {
                foreach (var failedItem in result.FailedItems)
                {
                    sheet.Cells[row, 1].Value = result.EquipmentType.ToString();
                    
                    var parts = failedItem.Split(':');
                    if (parts.Length >= 2)
                    {
                        sheet.Cells[row, 2].Value = parts[0].Trim();
                        sheet.Cells[row, 3].Value = string.Join(":", parts.Skip(1)).Trim();
                    }
                    else
                    {
                        sheet.Cells[row, 2].Value = "Unknown";
                        sheet.Cells[row, 3].Value = failedItem;
                    }
                    row++;
                }
            }

            sheet.Cells[sheet.Dimension.Address].AutoFitColumns();
        }
    }
}