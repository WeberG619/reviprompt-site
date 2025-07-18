# ReviPrompt Lab - Master Prompt Template

## Prompt Structure Guidelines

### Effective Revit AI Prompt Formula:

```
[CONTEXT] + [SPECIFIC TASK] + [CONSTRAINTS] + [OUTPUT FORMAT] + [VERSION COMPATIBILITY]
```

### Example Template:

```
I need to [ACTION] in my Revit project:
1. [SPECIFIC STEP 1]
2. [SPECIFIC STEP 2]
3. [SPECIFIC STEP 3]
4. [VALIDATION/CHECK]
5. [OUTPUT/REPORT]

[CONSTRAINTS]:
- Revit version: 2024-2026
- Project size: [NUMBER] elements
- Performance requirement: [TIME]

Provide [Python script/Dynamo nodes/step-by-step] solution.
```

## Prompt Categories

### 1. Automation Prompts
- Start with clear problem statement
- List specific steps in order
- Include error handling
- Specify output format

### 2. Analysis Prompts
- Define what to analyze
- Set acceptance criteria  
- Request specific metrics
- Ask for visual output

### 3. Cleanup Prompts
- Identify what needs cleaning
- Set rules for cleanup
- Include safety checks
- Request undo capability

### 4. Export Prompts
- Specify formats needed
- Define naming conventions
- Set quality parameters
- Include validation steps

## Variables to Replace

Always use [BRACKETS] for user-specific values:
- [PROJECT_NAME]
- [DISCIPLINE]
- [NAMING_RULE]
- [DATE_RANGE]
- [TOLERANCE]
- [OUTPUT_PATH]

## Quality Checklist

Before releasing a prompt:
- [ ] Tests on 3 different project types
- [ ] Handles edge cases
- [ ] Clear variable placeholders
- [ ] Includes error handling
- [ ] Version compatibility noted
- [ ] Performance benchmarked