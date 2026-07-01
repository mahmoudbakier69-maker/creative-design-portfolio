import {
  discoverCoverImage,
  discoverGalleryImages,
  discoverVideoPoster,
  discoverVideos,
} from "./project-media.server";
import type {
  Project,
  ProjectLanguage,
  ProjectVideo,
  ResolvedGalleryImage,
  ResolvedVideo,
} from "./projects";
import { localize, PROJECTS, resolveGalleryAltLabel } from "./projects";

export function resolveProjectCoverImage(project: Project): string {
  if (project.autoDiscoverCover !== false) {
    return discoverCoverImage(project.mediaKey) ?? project.coverImage;
  }

  return project.coverImage;
}

export function enrichProject(project: Project): Project {
  return {
    ...project,
    coverImage: resolveProjectCoverImage(project),
  };
}

export function getEnrichedProjectRaw(slug: string): Project | undefined {
  const project = PROJECTS.find((entry) => entry.slug === slug);
  return project ? enrichProject(project) : undefined;
}

export function getCoverImagesBySlug(): Record<string, string> {
  return Object.fromEntries(
    PROJECTS.map((project) => {
      const coverImage = resolveProjectCoverImage(project);
      return [project.slug, coverImage];
    }).filter(([, coverImage]) => Boolean(coverImage))
  );
}

export function getProjectGalleryImages(project: Project): string[] {
  if (project.autoDiscoverGallery) {
    return discoverGalleryImages(project.mediaKey);
  }

  return project.galleryImages;
}

export function resolveProjectGalleryItems(
  project: Project,
  lang: ProjectLanguage
): ResolvedGalleryImage[] {
  return getProjectGalleryImages(project).map((src, index) => ({
    src,
    altLabel: resolveGalleryAltLabel(project, index, lang),
  }));
}

/** Manual entries first, then auto-discovered videos not already listed. */
export function getProjectVideos(project: Project): ProjectVideo[] {
  const manual = project.videos;

  if (!project.autoDiscoverVideos) {
    return manual;
  }

  const discovered = discoverVideos(project.mediaKey).map((src) => ({ src }));
  const manualSources = new Set(manual.map((video) => video.src));

  return [...manual, ...discovered.filter((video) => !manualSources.has(video.src))];
}

export function resolveProjectVideoItems(
  project: Project,
  lang: ProjectLanguage
): ResolvedVideo[] {
  const defaultPoster = discoverVideoPoster(project.mediaKey) ?? undefined;

  return getProjectVideos(project).map((video, index) => ({
    ...video,
    poster: video.poster ?? defaultPoster,
    titleLabel: video.title
      ? localize(video.title, lang)
      : `${project.title} — ${lang === "it" ? "Video" : "Video"} ${index + 1}`,
  }));
}
