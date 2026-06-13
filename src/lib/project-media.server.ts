import { existsSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { projectCoverPath, projectGalleryPath, projectVideoPath } from "./project-media";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"]);

const POSTER_CANDIDATES = ["poster.jpg", "poster.jpeg", "poster.webp"] as const;

const COVER_CANDIDATES = ["cover.jpg", "cover.jpeg", "cover.png"] as const;

const COVER_FALLBACK_PATTERN = /^cover.+\.(jpe?g|png)$/i;

/**
 * Detects the cover image in public/projects/{mediaKey}/.
 * Checks cover.jpg, cover.jpeg, cover.png, then any cover*.{jpg,jpeg,png}.
 */
export function discoverCoverImage(mediaKey: string): string | null {
  const projectDir = join(process.cwd(), "public", "projects", mediaKey);

  if (!existsSync(projectDir)) {
    return null;
  }

  for (const filename of COVER_CANDIDATES) {
    if (existsSync(join(projectDir, filename))) {
      return projectCoverPath(mediaKey, filename);
    }
  }

  const fallback = readdirSync(projectDir)
    .filter((filename) => COVER_FALLBACK_PATTERN.test(filename))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))[0];

  if (fallback) {
    return projectCoverPath(mediaKey, fallback);
  }

  return null;
}

export function discoverCoverFilename(mediaKey: string): string | null {
  const projectDir = join(process.cwd(), "public", "projects", mediaKey);

  if (!existsSync(projectDir)) {
    return null;
  }

  for (const filename of COVER_CANDIDATES) {
    if (existsSync(join(projectDir, filename))) {
      return filename;
    }
  }

  return (
    readdirSync(projectDir)
      .filter((filename) => COVER_FALLBACK_PATTERN.test(filename))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))[0] ??
    null
  );
}

/**
 * Reads public/projects/{mediaKey}/gallery/ and returns sorted public URL paths.
 * Used at build/request time on the server — not for client bundles.
 */
export function discoverGalleryImages(mediaKey: string): string[] {
  const galleryDir = join(process.cwd(), "public", "projects", mediaKey, "gallery");

  if (!existsSync(galleryDir)) {
    return [];
  }

  return readdirSync(galleryDir)
    .filter((filename) => IMAGE_EXTENSIONS.has(extname(filename).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((filename) => projectGalleryPath(mediaKey, filename));
}

/**
 * Reads public/projects/{mediaKey}/videos/ and returns sorted public URL paths.
 * Used at build/request time on the server — not for client bundles.
 */
export function discoverVideos(mediaKey: string): string[] {
  const videosDir = join(process.cwd(), "public", "projects", mediaKey, "videos");

  if (!existsSync(videosDir)) {
    return [];
  }

  return readdirSync(videosDir)
    .filter((filename) => VIDEO_EXTENSIONS.has(extname(filename).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((filename) => projectVideoPath(mediaKey, filename));
}

/**
 * Detects a shared poster in public/projects/{mediaKey}/videos/.
 * Checks poster.jpg, poster.jpeg, poster.webp.
 */
export function discoverVideoPoster(mediaKey: string): string | null {
  const videosDir = join(process.cwd(), "public", "projects", mediaKey, "videos");

  if (!existsSync(videosDir)) {
    return null;
  }

  for (const filename of POSTER_CANDIDATES) {
    if (existsSync(join(videosDir, filename))) {
      return projectVideoPath(mediaKey, filename);
    }
  }

  return null;
}
