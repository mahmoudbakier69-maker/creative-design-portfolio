/**
 * Project media paths
 * ===================
 *
 * All project assets live under `public/projects/{mediaKey}/`.
 *
 * Folder layout (create these on disk before referencing paths in projects.ts):
 *
 *   public/projects/{mediaKey}/
 *   ├── cover.jpg | cover.jpeg | cover.png   Hero + portfolio card
 *   ├── gallery/
 *   │   ├── 01.jpg             Gallery images in display order
 *   │   ├── 02.jpg
 *   │   └── ...
 *   └── videos/
 *       ├── walkthrough.mp4    MP4 only; shown after the image gallery
 *       └── walkthrough-poster.jpg   Optional poster frame for the video
 *
 * After adding files, cover, gallery, and video paths are auto-discovered on the server.
 *
 * Existing media folders: sudeep, mindware, egypt-tourism, amana, illulian, alpa70 (see public/projects/).
 */

/** Base URL path for a project's media folder (served from public/) */
export function projectMediaDir(mediaKey: string): string {
  return `/projects/${mediaKey}`;
}

export function projectCoverPath(mediaKey: string, filename: string): string {
  return `${projectMediaDir(mediaKey)}/${filename}`;
}

export function projectGalleryPath(mediaKey: string, filename: string): string {
  return `${projectMediaDir(mediaKey)}/gallery/${filename}`;
}

export function projectVideoPath(mediaKey: string, filename: string): string {
  return `${projectMediaDir(mediaKey)}/videos/${filename}`;
}

export function projectVideoPosterPath(mediaKey: string, filename: string): string {
  return `${projectMediaDir(mediaKey)}/videos/${filename}`;
}
