# LoadCalculator - MEP Power Tools

Automatically calculate electrical loads from Revit equipment schedules and export results to Excel for further analysis.

## Features

✅ **Electrical Load Calculations:**
- Automatic extraction of equipment electrical parameters
- Connected load and demand load calculations
- Load factor and diversity factor applications
- Circuit-level and panel-level summaries

✅ **Multi-Equipment Support:**
- Lighting fixtures with wattage data
- Electrical equipment with connected loads
- HVAC equipment electrical requirements
- Custom equipment with user-defined loads

✅ **Professional Output:**
- Detailed Excel report with calculations
- Load summary by circuit and panel
- Load factor calculations and recommendations
- Code compliance notes and references

## Dynamo Script Details

### Input Requirements
- Revit model with electrical equipment
- Equipment families with electrical parameters:
  - `Electrical - Watts` parameter
  - `Electrical - Current` parameter  
  - `Electrical - Voltage` parameter
  - `Load Classification` parameter (optional)

### Calculation Methods
1. **Connected Load:** Sum of all equipment nameplate ratings
2. **Demand Load:** Connected load × demand factor (per NEC guidelines)
3. **Circuit Load:** Equipment groups by electrical circuit
4. **Panel Load:** Summary of all circuits feeding each panel

### Output Format
Excel workbook with tabs:
- **Summary:** Overall load calculations and code compliance
- **Equipment List:** Individual equipment with electrical data
- **Circuit Analysis:** Load calculations by circuit
- **Panel Schedule:** Demand load summary by panel
- **Code References:** NEC article references and notes

## Installation & Usage

### Requirements
- Dynamo 2.17+ (included with Revit 2024+)
- Microsoft Excel for viewing reports
- Revit electrical families with proper parameters

### Usage Steps

1. **Prepare Model:**
   - Ensure electrical equipment has proper electrical parameters
   - Verify equipment is placed and connected to circuits
   - Check that electrical systems are properly configured

2. **Run Script:**
   - Open Dynamo in Revit
   - Open `LoadCalculator.dyn` script
   - Click "Run" to execute

3. **Review Inputs:**
   - Script will prompt for building type (affects demand factors)
   - Select calculation method (NEC 220.40, 220.42, etc.)
   - Choose output file location

4. **Analyze Results:**
   - Excel report opens automatically
   - Review load calculations for accuracy
   - Use for electrical design and permit applications

## Electrical Parameters Setup

### Required Family Parameters

For accurate calculations, ensure your electrical families include:

```
Parameter Name          | Type    | Usage
------------------------|---------|----------------------------------
Electrical - Watts      | Number  | Connected load in watts
Electrical - Current    | Number  | Full load current in amps  
Electrical - Voltage    | Number  | Operating voltage
Electrical - Power Factor | Number | Power factor (0.8 default)
Load Classification    | Text    | Continuous/Non-continuous
Circuit Number         | Text    | Circuit identifier
Panel Name            | Text    | Electrical panel name
```

### Family Setup Tips

🔌 **Lighting Fixtures:**
- Use manufacturer catalog data for wattage
- Include ballast/driver losses
- Set appropriate load classification

⚡ **Equipment:**
- Use nameplate data when available
- Include startup/inrush considerations
- Verify voltage matches building systems

🏢 **HVAC Equipment:**
- Include compressor, fan, and auxiliary loads
- Consider demand factors per NEC 220.50
- Account for motor starting requirements

## Load Calculation Standards

### NEC Compliance
- Follows National Electrical Code (NEC) 2023
- Article 220: Branch Circuit, Feeder and Service Calculations
- Standard demand factors and load classifications

### Demand Factors Applied
- **Lighting:** 100% first 3000VA, 35% remainder (NEC 220.42)
- **Receptacles:** 100% first 10kVA, 50% remainder (NEC 220.44)
- **HVAC:** 100% largest load, 75% additional loads (NEC 220.50)
- **Motors:** 125% largest, 100% others (NEC 430.24)

## Integration with Other Tools

### Works with ReviPrompt Lab Tools:
- **EquipmentTagger:** Tag equipment before load calculations
- **SystemValidator:** Verify electrical connections
- **ModelAuditor:** Check electrical system integrity

### AI Prompt Integration:
- Use "Electrical Load Analysis" prompts for detailed review
- "Code Compliance Check" prompts for NEC verification
- "Panel Schedule Generation" prompts for final documentation

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Missing electrical data | Check family parameters and values |
| Incorrect calculations | Verify equipment electrical parameters |
| Script errors | Ensure Dynamo version compatibility |
| Excel won't open | Check file permissions and Excel installation |
| Missing equipment | Verify equipment is in active view |

## Advanced Features

### Custom Demand Factors
- Edit script to apply project-specific demand factors
- Support for local code requirements
- Integration with engineering judgment factors

### Multi-Voltage Systems
- Automatic handling of 120V, 208V, 240V, 480V systems
- Three-phase and single-phase calculations
- Voltage drop considerations (future enhancement)

### Load Growth Calculations
- Built-in spare capacity recommendations
- Future load expansion planning
- Code-required spare capacity (25% minimum)

## Output Sample

```
ELECTRICAL LOAD SUMMARY
Project: Office Building Renovation
Date: 2024-12-29

CONNECTED LOADS:
Lighting:           45,000 W
Receptacles:        28,000 W  
HVAC Equipment:     125,000 W
Other Equipment:    15,000 W
Total Connected:    213,000 W

DEMAND LOADS (NEC 220):
Lighting (220.42):  23,100 W
Receptacles (220.44): 19,000 W
HVAC (220.50):      125,000 W  
Other:              15,000 W
Total Demand:       182,100 W

SERVICE SIZE REQUIRED: 800A @ 208V/3Φ
```

## Support & Updates

- **Email:** support@revipromptlab.com
- **Video Tutorial:** Included with MEP Power Tools pack
- **Script Updates:** Free updates for pack owners
- **Custom Modifications:** Available through consulting services

---

**Part of ReviPrompt Lab MEP Power Tools Pack**  
*Professional electrical calculations for MEP engineers*