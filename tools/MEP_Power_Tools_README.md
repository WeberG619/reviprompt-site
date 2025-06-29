# MEP Power Tools Pack
**Professional MEP System Analysis & Validation for Revit**

## Overview
The MEP Power Tools pack provides professional MEP engineers with essential tools for equipment tagging, load calculations, and system validation. Built specifically for Architecture, Engineering, and Construction (AEC) professionals working with Revit MEP systems.

## Included Tools

### 1. Equipment Tagger
**Professional MEP equipment tagging with smart positioning**
- Multi-category support (Mechanical, Electrical, Plumbing)
- Smart tag positioning to avoid overlaps
- Batch tagging capabilities
- Custom tag family support
- Level-based organization

**Use Cases:**
- Tag all HVAC equipment on multiple levels
- Electrical panel and device tagging
- Plumbing fixture identification
- Equipment schedules and documentation

### 2. Load Calculator
**NEC-compliant electrical load calculations**
- Comprehensive demand factor calculations
- Multiple load types (Lighting, Receptacles, Motors, HVAC)
- Diversity factor application
- Professional calculation reports
- Code compliance verification

**Use Cases:**
- Panel load calculations
- Service entrance sizing
- Load studies for electrical design
- Code compliance documentation
- Energy analysis support

### 3. System Validator
**MEP system connectivity validation**
- Mechanical system validation (HVAC, Ductwork)
- Electrical system integrity checks
- Plumbing system connectivity
- Orphaned component detection
- Comprehensive validation reports

**Use Cases:**
- Quality control before deliverables  
- System coordination verification
- Model health checks
- Clash detection preparation
- Construction documentation validation

## Installation Instructions

### System Requirements
- Autodesk Revit 2024, 2025, or 2026
- Windows 10/11
- .NET Framework 4.8
- Microsoft Excel (for reports)

### Installation Steps

1. **Download the MEP Power Tools pack**
   - Extract all files to a temporary folder
   - You should have 3 tool folders: EquipmentTagger, LoadCalculator, SystemValidator

2. **Install Each Tool**
   
   For **EquipmentTagger**:
   - Copy `EquipmentTagger.dll` to: `%AppData%\Autodesk\Revit\Addins\2024\`
   - Copy `EquipmentTagger.addin` to: `%AppData%\Autodesk\Revit\Addins\2024\`
   
   For **LoadCalculator**:
   - Copy `LoadCalculator.dll` to: `%AppData%\Autodesk\Revit\Addins\2024\`
   - Copy `LoadCalculator.addin` to: `%AppData%\Autodesk\Revit\Addins\2024\`
   
   For **SystemValidator**:
   - Copy `SystemValidator.dll` to: `%AppData%\Autodesk\Revit\Addins\2024\`
   - Copy `SystemValidator.addin` to: `%AppData%\Autodesk\Revit\Addins\2024\`

3. **For Revit 2025/2026**
   - Replace `2024` with `2025` or `2026` in the paths above
   - All tools are compatible across Revit versions

4. **Restart Revit**
   - The tools will appear in the Add-Ins ribbon tab
   - Look for "Equipment Tagger", "Load Calculator", and "System Validator"

### Verification
Open Revit and check the Add-Ins tab. You should see three new buttons:
- **Equipment Tagger** - Tag MEP equipment
- **Load Calculator** - Calculate electrical loads  
- **System Validator** - Validate MEP systems

## Quick Start Guide

### Equipment Tagger
1. Open a Revit model with MEP equipment
2. Click "Equipment Tagger" in the Add-Ins tab
3. Select equipment categories to tag
4. Choose tag positioning options
5. Click "Tag Equipment" to apply tags

### Load Calculator
1. Open a Revit model with electrical equipment
2. Click "Load Calculator" in the Add-Ins tab
3. Select equipment for load calculation
4. Configure demand factors and diversity
5. Generate NEC-compliant load report

### System Validator
1. Open a Revit MEP model
2. Click "System Validator" in the Add-Ins tab
3. Select MEP systems to validate
4. Choose validation checks to perform
5. Review detailed validation report

## Output and Reports

All tools generate professional Excel reports saved to your Desktop:
- **Equipment Tags**: Equipment inventory and tag placement summary
- **Load Calculations**: Detailed electrical load analysis with NEC references
- **System Validation**: Comprehensive MEP system health report with recommendations

## Support and Documentation

### Getting Help
- **Email**: support@revipromptlab.com
- **Documentation**: Full user guides included with download
- **Video Tutorials**: Available on our website

### Common Issues
- **Tool not appearing**: Verify .addin and .dll files are in correct Revit version folder
- **Excel reports not opening**: Ensure Microsoft Excel is installed
- **Performance**: Close unnecessary applications when processing large models

### Best Practices
- **Backup models** before running tools
- **Save work** before using auto-fix options
- **Review reports** for accuracy before using in deliverables
- **Regular validation** helps maintain model quality

## License and Usage

This software is licensed for professional use. Each license includes:
- Installation on single workstation
- All three MEP tools
- Excel report generation
- Email support
- Updates for current Revit versions

### Terms of Use
- Professional and educational use permitted
- No redistribution of software files
- Reports generated may be used in commercial projects
- Support provided via email during business hours

## Technical Specifications

**File Formats Supported:**
- Revit models (.rvt)
- Revit families (.rfa)
- Excel reports (.xlsx)

**Performance:**
- Optimized for models up to 100,000 elements
- Multi-threading for improved performance
- Memory efficient processing

**Compatibility:**
- Revit 2024, 2025, 2026
- Windows 10/11 (64-bit)
- .NET Framework 4.8

---

**MEP Power Tools Pack - Professional MEP Analysis for Revit**  
*Developed by ReviPrompt Lab - Your AI-Powered AEC Solutions Provider*

For the latest updates and additional tools, visit: [revipromptlab.com](https://revipromptlab.com)