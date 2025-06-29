# LoadCalculator - MEP Power Tools

Professional electrical load calculations with NEC-compliant demand factors and comprehensive Excel reporting.

## Features

✅ **NEC-Compliant Calculations:**
- Follows National Electrical Code 2023 standards
- Automatic demand factor application (NEC 220.42, 220.44, 220.50)
- Building type-specific load calculations
- Service sizing with spare capacity requirements

✅ **Multi-Equipment Support:**
- Lighting fixtures with electrical parameters
- Electrical equipment and panels
- HVAC equipment electrical loads
- Receptacles and electrical devices
- Custom equipment with user-defined loads

✅ **Professional Reporting:**
- Executive summary with key findings
- Detailed equipment list with electrical data
- Circuit-level analysis and load distribution
- Panel schedule summaries
- Code references and calculation methodology

✅ **Smart Data Collection:**
- Automatically extracts electrical parameters from Revit families
- Handles multiple parameter naming conventions
- Calculates missing values from available data
- Validates data quality and completeness

## Installation

### Requirements
- Autodesk Revit 2024, 2025, or 2026
- .NET Framework 4.8 or higher
- Microsoft Excel for viewing reports
- Electrical families with proper parameters

### Installation Steps

1. **Extract Files:**
   - Extract all files to a folder (e.g., `C:\ReviPrompt\LoadCalculator\`)

2. **Install Add-in:**
   - Copy `LoadCalculator.addin` to your Revit add-ins folder:
     - `%APPDATA%\Autodesk\Revit\Addins\2024\` (for Revit 2024)
     - `%APPDATA%\Autodesk\Revit\Addins\2025\` (for Revit 2025)
     - `%APPDATA%\Autodesk\Revit\Addins\2026\` (for Revit 2026)

3. **Copy DLL:**
   - Copy `LoadCalculator.dll` to the same folder as the .addin file

4. **Restart Revit**

## Usage

### Basic Operation

1. **Prepare Model:**
   - Ensure electrical equipment has proper parameters
   - Verify equipment families include electrical data
   - Check that circuits and panels are properly assigned

2. **Run Load Calculator:**
   - In Revit ribbon, look for "Load Calculator" command
   - Or search for "Load Calculator" in the command search

3. **Configure Options:**
   - Select building type (affects demand factors)
   - Choose system voltage (120V, 208V, 240V, 277V, 480V)
   - Select code edition (NEC 2023, 2020, 2017)
   - Enable/disable receptacle calculations
   - Choose demand factor application method

4. **Review Results:**
   - View calculation summary in dialog
   - Open detailed Excel report for full analysis
   - Use results for electrical design and code compliance

### Electrical Parameters Setup

For accurate calculations, ensure your electrical families include these parameters:

#### Required Parameters
- **Electrical - Watts** or **Watts**: Connected load in watts
- **Electrical - Voltage** or **Voltage**: Operating voltage
- **Electrical - Current** or **Current**: Full load current (optional if watts provided)

#### Optional Parameters
- **Electrical - Power Factor**: Power factor (defaults to 0.85)
- **Load Classification**: "Continuous" or "Non-Continuous"
- **Circuit Number**: Circuit identifier for circuit analysis
- **Panel Name**: Electrical panel name for panel summaries

### Calculation Options

#### Building Types
- **Office**: Standard commercial office buildings
- **Retail**: Retail stores and shopping centers
- **Restaurant**: Food service establishments
- **Hotel**: Hotels and motels
- **Residential**: Multi-family residential buildings
- **Industrial**: Manufacturing and industrial facilities
- **Healthcare**: Hospitals and medical facilities
- **Educational**: Schools and universities

#### Demand Factor Methods

**NEC Standard Factors (Recommended):**
- Lighting: 100% first 3000 VA, 35% remainder (NEC 220.42)
- Receptacles: 100% first 10 kVA, 50% remainder (NEC 220.44)
- HVAC: Building type specific factors (NEC 220.50)
- Equipment: 100% unless specific provisions apply

**Custom Factors:**
- User-defined demand factors for each load type
- Range: 0.1 to 1.5 (10% to 150%)
- Use for special applications or local code requirements

## Understanding the Report

### Executive Summary
- **Connected Loads:** Total nameplate loads by category
- **Demand Loads:** Calculated loads with demand factors applied
- **Service Requirements:** Recommended service size and load density
- **Key Metrics:** Load density, diversity factor, code compliance notes

### Equipment List
- Detailed listing of all electrical equipment
- Electrical parameters for each item
- Circuit and panel assignments
- Load classifications and locations

### Circuit Analysis
- Load calculations by circuit number
- Equipment count and load types per circuit
- Panel assignments and circuit utilization

### Panel Schedule
- Summary of loads feeding each electrical panel
- Connected vs. demand loads with demand factors
- Circuit count and equipment summary per panel

### Calculation Details
- Methodology and code standards applied
- Demand factor calculations and references
- Service sizing calculations and assumptions

### Code References
- Relevant NEC articles and applications
- Important notes and compliance requirements
- Recommendations for design verification

## Advanced Features

### Multi-Voltage System Support
- Automatic handling of 120V, 208V, 240V, 277V, 480V systems
- Three-phase and single-phase load calculations
- Proper current calculations for different voltage levels

### Load Classification
- Continuous vs. non-continuous load identification
- Automatic application of 125% factor for continuous loads
- Motor load calculations per NEC 430.24

### Service Sizing
- Calculated load with 25% spare capacity
- Standard service sizes (100A to 2000A)
- Voltage drop considerations for service sizing

### Building Type Optimization
- Demand factors optimized for building type
- HVAC load calculations per occupancy type
- Receptacle load estimates based on building use

## Integration with Other Tools

### Works with ReviPrompt Lab Tools:
- **EquipmentTagger:** Tag equipment before load calculations
- **SystemValidator:** Verify electrical connections and systems
- **ModelAuditor:** Check model quality before calculations

### AI Prompt Integration:
- "Electrical Load Review" prompts for result analysis
- "Code Compliance Check" prompts for NEC verification
- "Service Design" prompts for electrical system design

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No equipment found | Check that families have electrical parameters |
| Missing electrical data | Verify parameter names and values |
| Incorrect calculations | Check equipment electrical parameters |
| Report won't open | Ensure Excel is installed and file permissions |
| Zero loads calculated | Verify equipment is visible in active view |

## Sample Calculation Output

```
ELECTRICAL LOAD SUMMARY
Project: Office Building - Phase 2
Code: NEC 2023

CONNECTED LOADS:
Lighting:           85,000 W
Receptacles:        45,000 W
HVAC Equipment:     180,000 W
Other Equipment:    25,000 W
Total Connected:    335,000 W

DEMAND LOADS:
Lighting (220.42):  31,700 W
Receptacles (220.44): 35,000 W
HVAC (220.50):      180,000 W
Other:              25,000 W
Total Demand:       271,700 W

SERVICE REQUIREMENTS:
Calculated Load:    271,700 VA
System Voltage:     208V, 3-Phase
Recommended Service: 1200A
Load Density:       5.4 W/sq ft
```

## Support & Updates

- **Email:** support@revipromptlab.com
- **Documentation:** Complete installation and usage guide
- **Video Tutorial:** Included with MEP Power Tools pack
- **Updates:** Free updates for pack owners
- **Custom Calculations:** Available through consulting services

---

**Part of ReviPrompt Lab MEP Power Tools Pack**  
*Professional electrical load calculations for MEP engineers*