# ReviPrompt Lab - Lite Pack ($9)

## 5 High-Impact Revit AI Prompts + 5 Dynamo Graphs

### 1. Sheet Setup Master
**Problem:** Title blocks wrong size, viewports misaligned, sheet numbers chaotic
**Solution:** Smart sheet reorganization with automatic viewport alignment

**AI PROMPT:**
```
I need to standardize all sheets in my Revit project:
1. Replace all title blocks with [TB_SIZE] while preserving sheet data
2. Renumber sheets sequentially starting from [START_NUMBER]
3. Align all viewports to consistent grid positions
4. Update sheet names to match [NAMING_CONVENTION]
5. Generate sheet index on cover sheet

Provide step-by-step instructions using Revit API or Dynamo.
```

**DYNAMO GRAPH:** `SheetSetupMaster.dyn`

---

### 2. Smart Annotation Fixer
**Problem:** Missing tags, duplicate annotations, incorrect tag types
**Solution:** Intelligent tag management and cleanup

**AI PROMPT:**
```
Analyze my Revit views and fix annotation issues:
1. Find all untagged doors, windows, and rooms
2. Apply appropriate tags based on view type and scale
3. Remove duplicate tags within [TOLERANCE] distance
4. Align tags to avoid overlaps
5. Update tag styles to match view template

Generate Python script for Dynamo or direct API approach.
```

**DYNAMO GRAPH:** `SmartAnnotationFixer.dyn`

---

### 3. Regex Sheet Name Auditor
**Problem:** Inconsistent sheet naming causing export errors
**Solution:** Pattern-based sheet name validation and correction

**AI PROMPT:**
```
Audit and fix sheet names in my project:
1. Check all sheet names against pattern: [DISCIPLINE]-[LEVEL]-[TYPE]-[NUMBER]
2. Flag non-compliant sheets with specific issues
3. Auto-correct common mistakes (spaces, special characters)
4. Generate compliance report
5. Update browser organization to match

Provide implementation for Revit 2024-2026.
```

**DYNAMO GRAPH:** `RegexSheetAuditor.dyn`

---

### 4. Batch Export Commander
**Problem:** Manual PDF/DWG export takes hours
**Solution:** One-click multi-format export with naming rules

**AI PROMPT:**
```
Create batch export system for my sheets:
1. Export selected sheets to PDF with [NAMING_RULE]
2. Simultaneously export to DWG with layer mapping
3. Create separate folders by discipline
4. Include revision clouds in PDF, exclude from DWG
5. Generate export log with timestamps

Handle large projects (500+ sheets) efficiently.
```

**DYNAMO GRAPH:** `BatchExportCommander.dyn`

---

### 5. ADA Clearance Scanner
**Problem:** Door clearances violating ADA requirements
**Solution:** Automated compliance checking with visual reports

**AI PROMPT:**
```
Scan all doors for ADA compliance:
1. Check 18" strike-side clearance (pull side)
2. Check 12" strike-side clearance (push side)
3. Verify 32" clear width when open 90°
4. Flag violations with specific measurements
5. Color-code doors in 3D view by compliance status

Generate fix list sorted by severity.
```

**DYNAMO GRAPH:** `ADAclearanceScanner.dyn`

---

## Installation Instructions

### For AI Prompts:
1. Copy prompt text
2. Paste into Claude/ChatGPT/Copilot
3. Replace [BRACKETS] with your values
4. Run generated code in Dynamo or pyRevit

### For Dynamo Graphs:
1. Open Dynamo Player in Revit
2. Browse to graph location
3. Set input parameters
4. Click Run

## Support
- Email: support@revipromptlab.com
- Discord: discord.gg/revipromptlab
- Emergency Help: Book 30-min call ($95)