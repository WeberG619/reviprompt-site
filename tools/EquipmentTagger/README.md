# EquipmentTagger - MEP Power Tools

Auto-tag untagged MEP equipment across all disciplines with smart positioning and comprehensive reporting.

## Features

✅ **Multi-Discipline Support:**
- Mechanical Equipment (HVAC units, pumps, etc.)
- Electrical Equipment (Panels, transformers, etc.)
- Plumbing Fixtures (Sinks, toilets, water heaters, etc.)
- Air Terminals (Diffusers, grilles, registers)
- Lighting Fixtures

✅ **Smart Tagging:**
- Automatic detection of untagged equipment
- Intelligent tag positioning to avoid overlaps
- Uses appropriate tag types for each category
- Processes only current view for focused results

✅ **Professional Reporting:**
- Detailed Excel report with statistics
- Summary by equipment type
- Failed items list with error details
- Automatic report generation to desktop

## Installation

### Requirements
- Autodesk Revit 2024, 2025, or 2026
- .NET Framework 4.8 or higher
- Microsoft Excel (for viewing reports)

### Installation Steps

1. **Extract Files:**
   - Extract all files to a folder (e.g., `C:\ReviPrompt\EquipmentTagger\`)

2. **Install Add-in:**
   - Copy `EquipmentTagger.addin` to your Revit add-ins folder:
     - `%APPDATA%\Autodesk\Revit\Addins\2024\` (for Revit 2024)
     - `%APPDATA%\Autodesk\Revit\Addins\2025\` (for Revit 2025)
     - `%APPDATA%\Autodesk\Revit\Addins\2026\` (for Revit 2026)

3. **Copy DLL:**
   - Copy `EquipmentTagger.dll` to the same folder as the .addin file

4. **Restart Revit**

## Usage

### Basic Operation

1. **Open Your Model:**
   - Open the Revit model containing MEP equipment
   - Navigate to the view where you want to tag equipment

2. **Run Equipment Tagger:**
   - In Revit ribbon, look for "Equipment Tagger" command
   - Or type "Equipment Tagger" in the search box

3. **Select Equipment Types:**
   - Choose which types of equipment to tag
   - Common selections are pre-checked for convenience
   - Use "Select All" or "Clear All" for quick selection

4. **Review Results:**
   - Tool will automatically tag untagged equipment
   - Success summary appears when complete
   - Detailed Excel report opens automatically

### Pro Tips

🎯 **Best Results:**
- Work in plan views for most equipment types
- Use 3D views for complex MEP coordination
- Run on individual floors/zones for large projects
- Tag mechanical and electrical separately for better organization

⚡ **Performance:**
- Tool processes current view only for speed
- Large models: work section by section
- Tool automatically skips already-tagged equipment

🔧 **Troubleshooting:**
- If tags overlap, manually adjust position after tagging
- Missing tag types: load appropriate tag families first
- Failed items are listed in the Excel report with reasons

## Understanding the Report

### Summary Tab
- **Total Equipment Found:** All untagged equipment in current view
- **Successfully Tagged:** Equipment that was tagged successfully
- **Success Rate:** Percentage of successful tagging operations
- **By Equipment Type:** Breakdown showing results for each category

### Detailed Results Tab
- Equipment-specific results with counts and success rates
- Notes column shows any issues encountered

### Failed Items Tab (if applicable)
- Lists specific elements that couldn't be tagged
- Includes Element ID and error reason
- Use for troubleshooting and manual review

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| No tag types found | Load appropriate tag families for equipment categories |
| Tags overlapping | Manually adjust tag positions after auto-tagging |
| Some equipment not found | Check if equipment is visible in current view |
| Report won't open | Ensure Microsoft Excel is installed |
| Tool not appearing | Check .addin file is in correct Revit version folder |

## Integration with AI Prompts

This tool works perfectly with ReviPrompt Lab AI prompts:

- **Pre-Tagging:** Use "MEP Equipment Preparation" prompts to organize equipment before tagging
- **Post-Tagging:** Use "Equipment Schedule Generation" prompts to create schedules from tagged equipment
- **Quality Control:** Use "MEP Coordination Check" prompts to validate tagging results

## Support

- **Email:** support@revipromptlab.com
- **Documentation:** Full video tutorials included with Professional Pack
- **Updates:** Free updates for 6 months (Foundation Pack) or 1 year (Professional Pack)

---

**Part of ReviPrompt Lab MEP Power Tools Pack**  
*Professional automation solutions for MEP engineers*