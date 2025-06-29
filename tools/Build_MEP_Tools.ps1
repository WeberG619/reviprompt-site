# MEP Power Tools Build Script
# Builds all three MEP tools for Revit 2024, 2025, 2026

param(
    [string]$Configuration = "Release",
    [string]$RevitVersion = "2024",
    [switch]$PackageForDistribution
)

Write-Host "Building MEP Power Tools for Revit $RevitVersion" -ForegroundColor Green

# Set paths
$toolsPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$outputPath = Join-Path $toolsPath "dist\MEP_Power_Tools_$RevitVersion"

# Clean output directory
if (Test-Path $outputPath) {
    Remove-Item $outputPath -Recurse -Force
}
New-Item -ItemType Directory -Path $outputPath -Force | Out-Null

# Tools to build
$tools = @(
    @{Name="EquipmentTagger"; DisplayName="Equipment Tagger"},
    @{Name="LoadCalculator"; DisplayName="Load Calculator"}, 
    @{Name="SystemValidator"; DisplayName="System Validator"}
)

# Build each tool
foreach ($tool in $tools) {
    Write-Host "Building $($tool.DisplayName)..." -ForegroundColor Yellow
    
    $projectPath = Join-Path $toolsPath $tool.Name
    $csprojFile = Join-Path $projectPath "$($tool.Name).csproj"
    
    if (!(Test-Path $csprojFile)) {
        Write-Error "Project file not found: $csprojFile"
        continue
    }
    
    # Update Revit version references if needed
    if ($RevitVersion -ne "2024") {
        Write-Host "Updating Revit references for version $RevitVersion..."
        
        $csprojContent = Get-Content $csprojFile -Raw
        $csprojContent = $csprojContent -replace "Revit 2024", "Revit $RevitVersion"
        Set-Content $csprojFile $csprojContent
    }
    
    # Build the project
    $buildResult = dotnet build $csprojFile --configuration $Configuration --verbosity minimal
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed for $($tool.DisplayName)"
        continue
    }
    
    # Copy outputs
    $toolOutputPath = Join-Path $outputPath $tool.Name
    New-Item -ItemType Directory -Path $toolOutputPath -Force | Out-Null
    
    $binPath = Join-Path $projectPath "bin\$Configuration"
    $dllFile = Join-Path $binPath "$($tool.Name).dll"
    $addinFile = Join-Path $projectPath "$($tool.Name).addin"
    
    if (Test-Path $dllFile) {
        Copy-Item $dllFile $toolOutputPath
        Write-Host "  ✓ Copied $($tool.Name).dll" -ForegroundColor Green
    }
    
    if (Test-Path $addinFile) {
        Copy-Item $addinFile $toolOutputPath
        Write-Host "  ✓ Copied $($tool.Name).addin" -ForegroundColor Green
    }
    
    # Copy dependencies
    $dependencies = @("EPPlus.dll", "EPPlus.Interfaces.dll", "EPPlus.System.Drawing.dll")
    foreach ($dep in $dependencies) {
        $depFile = Join-Path $binPath $dep
        if (Test-Path $depFile) {
            Copy-Item $depFile $toolOutputPath
            Write-Host "  ✓ Copied $dep" -ForegroundColor Green
        }
    }
}

# Copy documentation
Copy-Item (Join-Path $toolsPath "MEP_Power_Tools_README.md") $outputPath
Write-Host "✓ Copied documentation" -ForegroundColor Green

# Create installation batch file
$installScript = @"
@echo off
echo Installing MEP Power Tools for Revit $RevitVersion...

set REVIT_ADDINS=%APPDATA%\Autodesk\Revit\Addins\$RevitVersion

if not exist "%REVIT_ADDINS%" (
    echo Creating Revit addins directory...
    mkdir "%REVIT_ADDINS%"
)

echo Copying EquipmentTagger...
copy /Y "EquipmentTagger\*.*" "%REVIT_ADDINS%\"

echo Copying LoadCalculator...
copy /Y "LoadCalculator\*.*" "%REVIT_ADDINS%\"

echo Copying SystemValidator...
copy /Y "SystemValidator\*.*" "%REVIT_ADDINS%\"

echo.
echo Installation complete!
echo Restart Revit to see the MEP Power Tools in the Add-Ins tab.
echo.
pause
"@

Set-Content (Join-Path $outputPath "Install_MEP_Tools.bat") $installScript
Write-Host "✓ Created installation script" -ForegroundColor Green

# Package for distribution if requested
if ($PackageForDistribution) {
    Write-Host "Creating distribution package..." -ForegroundColor Yellow
    
    $zipPath = Join-Path $toolsPath "MEP_Power_Tools_Revit_$RevitVersion.zip"
    
    # Remove old zip if exists
    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }
    
    # Create zip file
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::CreateFromDirectory($outputPath, $zipPath)
    
    Write-Host "✓ Created distribution package: $zipPath" -ForegroundColor Green
    
    # Show package contents
    Write-Host "`nPackage Contents:" -ForegroundColor Cyan
    Get-ChildItem $outputPath -Recurse | ForEach-Object {
        $relativePath = $_.FullName.Substring($outputPath.Length + 1)
        Write-Host "  $relativePath"
    }
}

Write-Host "`nBuild Complete!" -ForegroundColor Green
Write-Host "Output location: $outputPath" -ForegroundColor Cyan

if ($PackageForDistribution) {
    Write-Host "Distribution package: MEP_Power_Tools_Revit_$RevitVersion.zip" -ForegroundColor Cyan
}

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Test tools in Revit $RevitVersion"
Write-Host "2. Run Install_MEP_Tools.bat for easy installation"
Write-Host "3. Share with customers or upload to distribution platform"