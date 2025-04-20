$root = Join-Path $PSScriptRoot ".." -Resolve
$docsPath = Join-Path $root "./Docs"
$outputPath = Join-Path $root "wwwroot/nav-structure.json"

function Get-NavStructure {
    param(
        [string]$Path,
        [string]$BasePath = ""
    )

    $result = @{}
    $items = Get-ChildItem -Path $Path
    
    foreach ($item in $items) {
        if ($item.Name -match "^_") { continue }
        
        $relativePath = "/Docs$BasePath/$($item.Name)".Replace("\", "/")
        $node = @{
            Title = $item.BaseName -replace "[-_]", " "
            Path = $relativePath -replace "\.md$", ""
            IsDirectory = $item.PSIsContainer
        }
        
        if ($item.PSIsContainer) {
            $node["Children"] = Get-NavStructure -Path $item.FullName -BasePath "$BasePath/$($item.Name)"
        }
        
        $result[$item.Name] = $node
    }
    
    return $result.Values | Sort-Object Title
}

$navStructure = @{
    Title = "Docs"
    Path = "/Docs"
    IsDirectory = $true
    Children = Get-NavStructure -Path $docsPath
}

$navStructure | ConvertTo-Json -Depth 10 | Out-File $outputPath -Encoding UTF8
Write-Host "Navigation structure generated successfully!"



