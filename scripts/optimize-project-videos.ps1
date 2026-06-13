#Requires -Version 5.1
<#
.SYNOPSIS
  Re-encode project MP4s for broad browser compatibility.

.DESCRIPTION
  Converts every *.mp4 under public/projects/*/videos/ to:
    - H.264 (AVC1) video, yuv420p
    - AAC audio
    - Fast-start moov atom
    - Rotation/orientation metadata removed (orientation baked into pixels)

  FFmpeg autorotate is enabled (default): display-matrix / rotate metadata is
  applied to pixels during decode, then stripped from the output container.

.PARAMETER DryRun
  Print planned actions without running FFmpeg.

.PARAMETER Force
  Re-encode even when the file already matches the target profile.

.EXAMPLE
  .\scripts\optimize-project-videos.ps1

.EXAMPLE
  .\scripts\optimize-project-videos.ps1 -DryRun
#>
[CmdletBinding()]
param(
    [switch]$DryRun,
    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$VideosRoot = Join-Path $RepoRoot "public\projects"

function Assert-Tool([string]$Name) {
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "$Name is not installed or not on PATH. Install FFmpeg: https://ffmpeg.org/download.html"
    }
}

function Get-VideoRotation([string]$Path) {
    $tag = & ffprobe -v error -select_streams v:0 -show_entries stream_tags=rotate -of csv=p=0 "$Path" 2>$null
    if ($tag -and $tag.Trim() -ne "") {
        return [int]$tag.Trim()
    }

    $side = & ffprobe -v error -select_streams v:0 -show_entries stream_side_data=rotation -of csv=p=0 "$Path" 2>$null
    if ($side -and $side.Trim() -ne "") {
        return [int][double]$side.Trim()
    }

    return 0
}

function Test-AlreadyOptimized([string]$Path) {
    $video = & ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt,codec_tag_string -of csv=p=0 "$Path" 2>$null
    $audio = & ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$Path" 2>$null
    $rotation = Get-VideoRotation $Path

    if (-not $video) {
        return $false
    }

    $parts = $video -split ","
    $codec = $parts[0]
    $pixFmt = if ($parts.Length -gt 1) { $parts[1] } else { "" }
    $tag = if ($parts.Length -gt 2) { $parts[2] } else { "" }

    $videoOk = ($codec -eq "h264") -and ($pixFmt -eq "yuv420p") -and ($tag -match "^(avc1|avc3)$")
    $audioOk = (-not $audio) -or ($audio.Trim() -eq "aac")
    $rotationOk = ($rotation -eq 0)

    return ($videoOk -and $audioOk -and $rotationOk)
}

function Optimize-Video([string]$InputPath) {
    $rotation = Get-VideoRotation $InputPath
    $dir = Split-Path -Parent $InputPath
    $name = [System.IO.Path]::GetFileNameWithoutExtension($InputPath)
    $tempPath = Join-Path $dir "$name.optimized.tmp.mp4"

    Write-Host ""
    Write-Host "Input:     $InputPath"
    if ($rotation -ne 0) {
        Write-Host "Rotation:  $rotation° (will be baked into pixels, metadata removed)"
    }

    if ($DryRun) {
        Write-Host "Dry run:   would write $tempPath and replace source"
        return
    }

    if (Test-Path $tempPath) {
        Remove-Item -Force $tempPath
    }

    # Autorotate stays enabled (FFmpeg default) so display-matrix orientation
    # is applied before the format filter and permanently baked into pixels.
    $ffmpegArgs = @(
        "-hide_banner", "-loglevel", "error", "-stats",
        "-i", $InputPath,
        "-map", "0:v:0?",
        "-map", "0:a:0?",
        "-vf", "format=yuv420p",
        "-c:v", "libx264",
        "-profile:v", "high",
        "-level", "4.1",
        "-preset", "medium",
        "-crf", "23",
        "-pix_fmt", "yuv420p",
        "-tag:v", "avc1",
        "-c:a", "aac",
        "-b:a", "128k",
        "-ac", "2",
        "-ar", "48000",
        "-movflags", "+faststart",
        "-map_metadata", "-1",
        "-metadata:s:v:0", "rotate=0",
        "-y",
        $tempPath
    )

    & ffmpeg @ffmpegArgs
    if ($LASTEXITCODE -ne 0) {
        if (Test-Path $tempPath) {
            Remove-Item -Force $tempPath
        }
        throw "FFmpeg failed for $InputPath (exit $LASTEXITCODE)"
    }

    $outVideo = & ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt,codec_tag_string -of csv=p=0 "$tempPath"
    $outAudio = & ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$tempPath" 2>$null
    $outRotation = Get-VideoRotation $tempPath

    if (-not $outVideo) {
        Remove-Item -Force $tempPath
        throw "Output has no video stream: $tempPath"
    }

    if ($outRotation -ne 0) {
        Remove-Item -Force $tempPath
        throw "Output still has rotation metadata ($outRotation°): $tempPath"
    }

    Move-Item -Force $tempPath $InputPath
    Write-Host "Done:      $InputPath"
    Write-Host "Output:    $outVideo / audio=$outAudio"
}

Assert-Tool "ffmpeg"
Assert-Tool "ffprobe"

if (-not (Test-Path $VideosRoot)) {
    throw "Videos root not found: $VideosRoot"
}

$videos = Get-ChildItem -Path $VideosRoot -Recurse -Filter "*.mp4" -File |
    Where-Object { $_.DirectoryName -match "[\\/]videos$" } |
    Sort-Object FullName

if (-not $videos) {
    Write-Host "No MP4 files found under public/projects/*/videos/"
    exit 0
}

Write-Host "Found $($videos.Count) video(s) under public/projects/*/videos/"

$processed = 0
$skipped = 0

foreach ($video in $videos) {
    if (-not $Force -and (Test-AlreadyOptimized $video.FullName)) {
        Write-Host ""
        Write-Host "Skip:      $($video.FullName) (already web-safe)"
        $skipped++
        continue
    }

    Optimize-Video $video.FullName
    $processed++
}

Write-Host ""
Write-Host "Summary: processed=$processed skipped=$skipped total=$($videos.Count)"
