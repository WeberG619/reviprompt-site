# Video Script: Sheet Setup Starter Walkthrough
**Duration: 8 minutes**
**Target: Architects, project managers, BIM coordinators**

## Video Structure

### Intro (0:00 - 0:30)
**[Screen: Messy Revit project with poorly named sheets]**

"Here's a real problem every architect faces: You inherit a project with sheets named 'Sheet 1', 'Sheet 2', 'Copy of Floor Plan'... Sound familiar?"

**[Screen: Time counter showing 4+ hours]**

"Manually renaming and organizing 100+ sheets takes 4-6 hours of tedious work. What if I told you we could do this in under 5 minutes?"

**[Screen: ReviPrompt Lab Sheet Setup tool]**

"Today I'll show you our Sheet Setup Starter tool that transforms this nightmare into a quick, automated process using Excel."

### The Problem (0:30 - 1:15)
**[Screen: Typical project with disorganized sheets]**

"Let me show you what most projects look like. We have:
- Sheets with generic names like 'Sheet 1', 'Sheet 2'
- Inconsistent numbering systems
- Missing discipline prefixes
- No logical organization"

**[Screen: Sheet browser showing the mess]**

"In the sheet browser, it's impossible to find what you need. Project coordination becomes a nightmare."

**[Screen: Manual renaming process]**

"The traditional approach: Right-click each sheet, rename manually, hope you don't make mistakes. For 100 sheets, this takes hours."

### The Solution Overview (1:15 - 2:00)
**[Screen: ReviPrompt Lab tool interface]**

"Our Sheet Setup Starter changes everything. Here's the workflow:
1. Export current sheet list to Excel
2. Edit names and numbers in Excel with formulas
3. Import back to Revit with validation
4. Done in minutes, not hours"

**[Screen: Excel with sheet data]**

"Using Excel means you can use formulas, copy-paste, and bulk operations. Much faster than clicking each sheet individually."

### Step 1: Export Sheet List (2:00 - 3:00)
**[Screen: Revit Add-ins tab]**

"First, open the ReviPrompt Lab tools from the Add-ins tab."

**[Screen: Sheet Setup Starter interface]**

"Click 'Sheet Setup Starter' to open our tool."

**[Screen: Export dialog]**

"Click 'Export Sheet List'. This reads all sheets in your project and creates an Excel file."

**[Screen: Excel file opening]**

"The Excel file opens automatically with all your current sheet information:
- Sheet numbers
- Sheet names  
- Discipline
- Current status"

### Step 2: Excel Magic (3:00 - 5:00)
**[Screen: Excel spreadsheet with sheet data]**

"Now for the magic. In Excel, we can quickly organize everything."

**[Screen: Creating formula for sheet numbers]**

"I'll create a formula to generate proper sheet numbers. For architectural plans:
=A1&\"-\"&TEXT(ROW()-1,\"00\")
This creates A-01, A-02, A-03 automatically."

**[Screen: Copying formula down]**

"Copy this formula down for all sheets. Instantly, we have consistent numbering."

**[Screen: Updating sheet names]**

"For names, I'll use another formula to create standard titles:
=\"Floor Plan - Level \"&B1
This creates 'Floor Plan - Level 1', 'Floor Plan - Level 2', etc."

**[Screen: Different disciplines]**

"For other disciplines:
- Structural: S-01, S-02
- MEP: M-01, M-02, E-01, E-02, P-01, P-02
- Site: C-01, C-02"

**[Screen: Final organized Excel sheet]**

"In 2 minutes, we've organized 100+ sheets with consistent naming and numbering."

### Step 3: Import Back to Revit (5:00 - 6:30)
**[Screen: Saving Excel file]**

"Save your Excel file and go back to the ReviPrompt Lab tool."

**[Screen: Import dialog]**

"Click 'Import Sheet Changes'. Select your updated Excel file."

**[Screen: Validation screen]**

"Our tool validates everything:
- Checks for duplicate numbers
- Verifies name lengths
- Ensures Revit compatibility
- Shows a preview of all changes"

**[Screen: Validation results]**

"Green means good to go. Yellow warnings show potential issues. Red means we need to fix something first."

**[Screen: Applying changes]**

"Click 'Apply Changes' and watch the magic happen."

**[Screen: Progress bar]**

"The tool processes each sheet automatically. For 100 sheets, this takes about 30 seconds."

### Step 4: Verify Results (6:30 - 7:30)
**[Screen: Updated sheet browser]**

"Look at the sheet browser now. Everything is beautifully organized:
- Consistent numbering
- Professional naming
- Logical grouping by discipline"

**[Screen: Before/after comparison]**

"Before: Chaos. After: Professional organization. Same project, 5 minutes of work."

**[Screen: Project browser organization]**

"Notice how the sheets now group logically in the project browser. Finding drawings is instant."

### Advanced Tips (7:30 - 8:00)
**[Screen: Excel tips overlay]**

"Pro tips for Excel power users:
- Use VLOOKUP for complex naming schemes
- Conditional formatting to highlight issues
- Sort and filter to organize by discipline
- Use templates for consistent project setup"

### Benefits Summary (8:00 - 8:15)
**[Screen: Time savings graphic]**

"What we just accomplished:
- 100+ sheets renamed and renumbered
- Professional, consistent organization
- Time saved: 4 hours → 5 minutes
- Reduced errors from manual entry
- Happier project teams"

### Outro (8:15 - 8:30)
**[Screen: Call to action]**

"Ready to stop wasting time on manual sheet management? Get Sheet Setup Starter at revipromptlab.com. Subscribe for more Revit automation tutorials!"

**[Screen: Next video preview]**

"Next week: Watch how our MEP Power Tools automate equipment tagging across your entire project!"

## Key Demonstrations:
- Real project with messy sheets
- Excel formulas for automation
- Validation and error checking
- Before/after dramatic improvement
- Time-lapse of the entire process

## SEO Keywords:
- Revit sheet management
- Revit sheet renaming
- Revit automation
- Architecture productivity
- BIM coordination tools
- Excel Revit integration