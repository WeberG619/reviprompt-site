# Dynamo Graph Implementation Guide

## Overview
This guide provides step-by-step instructions for implementing the ReviPrompt Lab Dynamo graph library to maximize automation efficiency in your Revit workflows.

## Quick Start (15 minutes)

### 1. Installation
1. Copy the entire Dynamo folder to your local drive
2. Open Revit and launch Dynamo
3. Set Dynamo folder path: Settings > Manage Node and Package Paths
4. Add the ReviPrompt Lab folders to your paths

### 2. First Graph to Run
Start with **SheetSetupMaster.dyn** for immediate impact:
1. Create an Excel file with columns: Sheet Number | Sheet Name | Discipline
2. Open the graph in Dynamo
3. Set the Excel file path input
4. Select your titleblock type
5. Click Run - watch sheets create automatically!

## Top 10 High-Impact Graphs

### 1. Sheet Management
**SheetSetupMaster.dyn**
- Time saved: 2 hours per project
- Creates sheets from Excel list
- Applies titleblocks automatically
- Sets all sheet parameters

**SheetRenumberingTool.dyn**
- Time saved: 30 minutes per renumbering
- Renumbers sheets based on rules
- Updates all references
- Maintains drawing index

### 2. Parameter Management
**ParameterValuePropagator.dyn**
- Time saved: 1 hour per update
- Copies values between elements
- Works across categories
- Includes filtering options

**ProjectParameterCreator.dyn**
- Time saved: 45 minutes per setup
- Creates parameters from Excel
- Sets categories automatically
- Includes data type validation

### 3. View Creation
**FloorPlanGenerator.dyn**
- Time saved: 1.5 hours per project
- Creates plans for all levels
- Applies view templates
- Sets crop regions

**ElevationCreatorByRoom.dyn**
- Time saved: 2 hours per project
- Creates interior elevations
- Optimizes view placement
- Names views automatically

### 4. Documentation
**DimensionAutomation.dyn**
- Time saved: 3 hours per floor
- Dimensions walls automatically
- Includes doors and windows
- Follows office standards

**RoomTagPlacement.dyn**
- Time saved: 1 hour per floor
- Places tags optimally
- Avoids overlaps
- Updates automatically

### 5. Quality Control
**ModelHealthChecker.dyn**
- Time saved: 2 hours per check
- Comprehensive analysis
- Exports report to Excel
- Prioritizes issues

**DuplicateElementFinder.dyn**
- Time saved: 1 hour per audit
- Finds duplicate elements
- Highlights in views
- Suggests resolution

## Common Workflows

### Weekly Model Maintenance
1. Run **ModelHealthChecker.dyn** - identify issues
2. Run **DuplicateElementFinder.dyn** - clean duplicates
3. Run **UnusedElementsPurger.dyn** - remove unused
4. Run **WorksetAuditor.dyn** - fix workset issues

### Project Setup
1. Run **ProjectParameterCreator.dyn** - setup parameters
2. Run **SheetSetupMaster.dyn** - create sheets
3. Run **FloorPlanGenerator.dyn** - create views
4. Run **ViewTemplateApplicator.dyn** - apply standards

### Documentation Phase
1. Run **DimensionAutomation.dyn** - add dimensions
2. Run **RoomTagPlacement.dyn** - place tags
3. Run **DetailComponentPlacer.dyn** - add details
4. Run **TextNoteStandardizer.dyn** - fix text

### Project Delivery
1. Run **SheetIndexGenerator.dyn** - update index
2. Run **ScheduleDataValidator.dyn** - check data
3. Run **SheetExportAutomation.dyn** - export PDFs
4. Run **ModelComparisonTool.dyn** - verify changes

## Best Practices

### 1. Data Preparation
- Always backup your model before running graphs
- Prepare Excel templates for data-driven graphs
- Test on small selections before full runs
- Save graph presets for repeated use

### 2. Performance Tips
- Close unnecessary views before running
- Run resource-intensive graphs during breaks
- Use filtering to process in batches
- Monitor Revit performance metrics

### 3. Customization
- Modify input parameters for your standards
- Save company-specific versions
- Create custom nodes for repeated tasks
- Document your modifications

### 4. Troubleshooting
- Check Revit version compatibility
- Verify all required packages installed
- Review error messages in Dynamo
- Test with simplified inputs

## Integration with AI Prompts

### Example Workflow
1. Use AI prompt to generate custom logic
2. Copy generated Python code
3. Paste into Python node in Dynamo
4. Connect to existing graph structure
5. Test and refine

### Common AI Enhancements
- Custom filtering criteria
- Complex parameter formulas
- Conditional logic rules
- Error handling routines
- Progress reporting

## Training Resources

### Video Tutorials (Coming Soon)
1. Getting Started (20 min)
2. Sheet Automation (15 min)
3. Parameter Management (15 min)
4. View Creation (20 min)
5. Quality Control (25 min)

### Sample Files
- Excel templates for each graph
- Sample Revit models
- Custom node library
- Python code snippets

## Support

### Common Issues
1. **Graph won't run**: Check Revit/Dynamo version
2. **No output**: Verify input parameters
3. **Errors**: Review node connections
4. **Performance**: Reduce selection size

### Getting Help
- Email: support@revipromptlab.com
- Discord: ReviPrompt Lab Community
- Documentation: This guide + node documentation
- Video tutorials: YouTube channel

## ROI Tracking

### Time Tracking Template
| Task | Manual Time | Automated Time | Time Saved |
|------|------------|----------------|------------|
| Sheet Setup | 2 hours | 5 minutes | 1:55 |
| Parameter Updates | 1 hour | 10 minutes | 0:50 |
| View Creation | 1.5 hours | 15 minutes | 1:15 |
| Dimensioning | 3 hours | 20 minutes | 2:40 |

### Monthly Calculation
- Average time saved: 60-80 hours
- Hourly rate: $150
- Monthly value: $9,000-12,000
- Annual value: $108,000-144,000

## Next Steps

1. **Week 1**: Master the Foundation 5
2. **Week 2**: Implement full workflow
3. **Week 3**: Customize for your standards
4. **Week 4**: Train your team

Remember: Start small, validate results, then scale up!