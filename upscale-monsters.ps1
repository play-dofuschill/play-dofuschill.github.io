# upscale-monsters.ps1
# Upscale monster images x4 using Real-ESRGAN (AI, GPU-accelerated via Vulkan)
# Output: images/monsters_upscaled/

$ProjectRoot  = $PSScriptRoot
$InputDir     = Join-Path $ProjectRoot "images\monsters"
$OutputDir    = Join-Path $ProjectRoot "images\monsters_upscaled"
$ToolDir      = Join-Path $ProjectRoot "tools\realesrgan"
$Exe          = Join-Path $ToolDir "realesrgan-ncnn-vulkan.exe"

# ── 1. Download Real-ESRGAN if not present ───────────────────────────────────
if (-not (Test-Path $Exe)) {
    Write-Host "Downloading Real-ESRGAN..." -ForegroundColor Cyan

    $downloadUrl = "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-windows.zip"
    $zipPath     = Join-Path $env:TEMP "realesrgan-windows.zip"
    Write-Host "  -> realesrgan-ncnn-vulkan-20220424-windows.zip"
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath -UseBasicParsing

    New-Item -ItemType Directory -Force -Path $ToolDir | Out-Null
    Expand-Archive -Path $zipPath -DestinationPath $ToolDir -Force
    Remove-Item $zipPath

    if (-not (Test-Path $Exe)) {
        Write-Host "ERROR: Executable not found after extraction. Check $ToolDir" -ForegroundColor Red
        exit 1
    }
    Write-Host "  Real-ESRGAN ready." -ForegroundColor Green
} else {
    Write-Host "Real-ESRGAN already present." -ForegroundColor Green
}

# ── 2. Prepare output directory ──────────────────────────────────────────────
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

# ── 3. Count images ──────────────────────────────────────────────────────────
$images = Get-ChildItem -Path $InputDir -Filter "*.png" -File
$total  = $images.Count
Write-Host "`nFound $total images to upscale (model: realesrgan-x4plus, scale: x4)" -ForegroundColor Cyan
Write-Host "Output: $OutputDir`n"

# ── 4. Batch upscale ─────────────────────────────────────────────────────────
$done  = 0
$start = Get-Date

foreach ($img in $images) {
    $outFile = Join-Path $OutputDir $img.Name
    if (Test-Path $outFile) {
        $done++
        continue   # resume if interrupted
    }

    & $Exe -i $img.FullName -o $outFile -n realesrgan-x4plus -s 4 -f png 2>$null

    $done++
    if ($done % 50 -eq 0 -or $done -eq $total) {
        $elapsed = (Get-Date) - $start
        $perImg  = if ($done -gt 0) { $elapsed.TotalSeconds / $done } else { 0 }
        $eta     = [TimeSpan]::FromSeconds(($total - $done) * $perImg)
        Write-Host ("  {0}/{1}  ETA: {2:mm\:ss}" -f $done, $total, $eta)
    }
}

$elapsed = (Get-Date) - $start
Write-Host ("`nDone! {0} images in {1:mm\:ss}" -f $total, $elapsed) -ForegroundColor Green
Write-Host "Output folder: $OutputDir"
