$root = Join-Path $PSScriptRoot ".." -Resolve
$docsPath = Join-Path $root "Docs"
$outputPath = Join-Path $root "wwwroot/docs/nav-structure.json"

function Get-DocStructure {
    param(
        [string]$Path,
        [string]$BaseUrl = ""
    )

    $result = New-Object System.Collections.ArrayList

    Get-ChildItem -Path $Path | ForEach-Object {
        $item = $_
        # Ignorer les fichiers cachés et spéciaux
        if ($item.Name.StartsWith(".") -or $item.Name.StartsWith("_")) { return }

        $node = @{
            Title = ($item.BaseName -replace '[-_]', ' ').Trim()
            Url = if ($item.Extension -eq ".md") { "/docs$BaseUrl/$($item.BaseName)".ToLower() } else { "" }
            IsFolder = $item.PSIsContainer
            Children = if ($item.PSIsContainer) { 
                Get-DocStructure -Path $item.FullName -BaseUrl "$BaseUrl/$($item.Name)" 
            } else { 
                New-Object System.Collections.ArrayList 
            }
        }

        $result.Add($node) > $null
    }

    # Trier dossiers avant fichiers
    $result = $result | Sort-Object { -[int]$_.IsFolder }, Title
    return $result
}

$structure = @{
    Title = "Docs"
    Url = "/docs"
    IsFolder = $true
    Children = Get-DocStructure -Path $docsPath
}

$structure | ConvertTo-Json -Depth 10 | Out-File $outputPath -Encoding UTF8
Write-Host "Structure de navigation générée avec succès !"