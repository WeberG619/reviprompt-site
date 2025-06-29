# MEP Power Tools - Build Instructions

## Building on Windows

The MEP Power Tools are designed to be built on Windows with Visual Studio or .NET SDK.

### Prerequisites
- Windows 10/11
- Visual Studio 2022 or .NET 6+ SDK
- Autodesk Revit 2024/2025/2026 (for Revit API references)

### Build Steps

1. **Clone or download the source code**
2. **Open PowerShell as Administrator**
3. **Navigate to the tools directory**
4. **Run the build script:**

```powershell
# Build for Revit 2024 and create distribution package
.\Build_MEP_Tools.ps1 -PackageForDistribution

# Build for specific Revit version
.\Build_MEP_Tools.ps1 -RevitVersion "2025" -PackageForDistribution
```

### Manual Build (Alternative)

If the PowerShell script doesn't work, build each tool manually:

```powershell
# Build EquipmentTagger
cd EquipmentTagger
dotnet build --configuration Release

# Build LoadCalculator  
cd ..\LoadCalculator
dotnet build --configuration Release

# Build SystemValidator
cd ..\SystemValidator
dotnet build --configuration Release
```

### Package Structure

After building, the distribution package should contain:

```
MEP_Power_Tools/
├── EquipmentTagger/
│   ├── EquipmentTagger.dll
│   ├── EquipmentTagger.addin
│   └── EPPlus.dll
├── LoadCalculator/
│   ├── LoadCalculator.dll
│   ├── LoadCalculator.addin
│   └── EPPlus.dll
├── SystemValidator/
│   ├── SystemValidator.dll
│   ├── SystemValidator.addin
│   └── EPPlus.dll
├── MEP_Power_Tools_README.md
└── Install_MEP_Tools.bat
```

### Testing

1. **Install tools** using Install_MEP_Tools.bat
2. **Open Revit** and verify tools appear in Add-Ins tab
3. **Test each tool** with sample MEP models
4. **Verify Excel reports** generate correctly

### Distribution

- The tools can be distributed as a ZIP file
- Include licensing information
- Provide installation support documentation
- Test on clean Windows systems before release

## Current Status

✅ **Source Code Complete**
- All C# classes implemented
- .addin files created
- Documentation written
- Build scripts prepared

⚠️ **Windows Build Required**
- Source is Linux-compatible but requires Windows for final build
- Revit API dependencies need Windows environment
- Excel integration tested on Windows only

### Next Steps for Production

1. **Move to Windows development environment**
2. **Install Revit and Visual Studio**
3. **Build and test all tools**
4. **Create installer package**
5. **Upload to distribution platform (Ko-fi, etc.)**

---

**Ready for Windows build and distribution!**