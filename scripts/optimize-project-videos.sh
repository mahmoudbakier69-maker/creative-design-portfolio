#!/usr/bin/env bash
# Re-encode project MP4s for broad browser compatibility.
#
# Converts every *.mp4 under public/projects/*/videos/ to:
#   - H.264 (AVC1) video, yuv420p
#   - AAC audio
#   - Fast-start moov atom
#   - Rotation/orientation metadata removed (orientation baked into pixels)
#
# FFmpeg autorotate is enabled (default): display-matrix / rotate metadata is
# applied to pixels during decode, then stripped from the output container.
#
# Usage:
#   ./scripts/optimize-project-videos.sh
#   ./scripts/optimize-project-videos.sh --dry-run
#   ./scripts/optimize-project-videos.sh --force

set -euo pipefail

DRY_RUN=0
FORCE=0

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --force) FORCE=1 ;;
    -h|--help)
      sed -n '2,16p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      exit 1
      ;;
  esac
done

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VIDEOS_ROOT="$ROOT/public/projects"

require_tool() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: $1 is not installed or not on PATH." >&2
    echo "Install FFmpeg: https://ffmpeg.org/download.html" >&2
    exit 1
  fi
}

get_video_rotation() {
  local path="$1"
  local tag side

  tag="$(ffprobe -v error -select_streams v:0 -show_entries stream_tags=rotate -of csv=p=0 "$path" 2>/dev/null || true)"
  if [[ -n "$tag" ]]; then
    echo "$tag"
    return
  fi

  side="$(ffprobe -v error -select_streams v:0 -show_entries stream_side_data=rotation -of csv=p=0 "$path" 2>/dev/null || true)"
  if [[ -n "$side" ]]; then
    printf '%.0f\n' "$side"
    return
  fi

  echo 0
}

is_already_optimized() {
  local path="$1"
  local video audio rotation codec pix tag

  video="$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt,codec_tag_string -of csv=p=0 "$path" 2>/dev/null || true)"
  audio="$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$path" 2>/dev/null || true)"
  rotation="$(get_video_rotation "$path")"

  [[ -n "$video" ]] || return 1

  IFS=',' read -r codec pix tag <<<"$video"
  [[ "$codec" == "h264" && "$pix" == "yuv420p" && "$tag" =~ ^(avc1|avc3)$ ]] || return 1
  [[ -z "$audio" || "$audio" == "aac" ]] || return 1
  [[ "$rotation" == "0" ]] || return 1
  return 0
}

optimize_video() {
  local input="$1"
  local dir name temp rotation

  rotation="$(get_video_rotation "$input")"
  dir="$(dirname "$input")"
  name="$(basename "$input" .mp4)"
  temp="$dir/$name.optimized.tmp.mp4"

  echo
  echo "Input:     $input"
  if [[ "$rotation" != "0" ]]; then
    echo "Rotation:  ${rotation}° (will be baked into pixels, metadata removed)"
  fi

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "Dry run:   would write $temp and replace source"
    return 0
  fi

  rm -f "$temp"

  # Autorotate stays enabled (FFmpeg default) so display-matrix orientation
  # is applied before the format filter and permanently baked into pixels.
  ffmpeg -hide_banner -loglevel error -stats \
    -i "$input" \
    -map 0:v:0? \
    -map 0:a:0? \
    -vf "format=yuv420p" \
    -c:v libx264 \
    -profile:v high \
    -level 4.1 \
    -preset medium \
    -crf 23 \
    -pix_fmt yuv420p \
    -tag:v avc1 \
    -c:a aac \
    -b:a 128k \
    -ac 2 \
    -ar 48000 \
    -movflags +faststart \
    -map_metadata -1 \
    -metadata:s:v:0 rotate=0 \
    -y "$temp"

  local out_video out_audio out_rotation
  out_video="$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt,codec_tag_string -of csv=p=0 "$temp")"
  out_audio="$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$temp" 2>/dev/null || true)"
  out_rotation="$(get_video_rotation "$temp")"

  if [[ -z "$out_video" ]]; then
    rm -f "$temp"
    echo "Error: output has no video stream: $temp" >&2
    exit 1
  fi

  if [[ "$out_rotation" != "0" ]]; then
    rm -f "$temp"
    echo "Error: output still has rotation metadata (${out_rotation}°): $temp" >&2
    exit 1
  fi

  mv -f "$temp" "$input"
  echo "Done:      $input"
  echo "Output:    $out_video / audio=${out_audio:-none}"
}

require_tool ffmpeg
require_tool ffprobe

if [[ ! -d "$VIDEOS_ROOT" ]]; then
  echo "Error: videos root not found: $VIDEOS_ROOT" >&2
  exit 1
fi

mapfile -t videos < <(find "$VIDEOS_ROOT" -type f -path "*/videos/*.mp4" | sort)

if [[ "${#videos[@]}" -eq 0 ]]; then
  echo "No MP4 files found under public/projects/*/videos/"
  exit 0
fi

echo "Found ${#videos[@]} video(s) under public/projects/*/videos/"

processed=0
skipped=0

for video in "${videos[@]}"; do
  if [[ "$FORCE" -eq 0 ]] && is_already_optimized "$video"; then
    echo
    echo "Skip:      $video (already web-safe)"
    skipped=$((skipped + 1))
    continue
  fi

  optimize_video "$video"
  processed=$((processed + 1))
done

echo
echo "Summary: processed=$processed skipped=$skipped total=${#videos[@]}"
