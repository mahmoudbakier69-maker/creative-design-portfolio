import { PROJECT_CASE_STUDIES } from "./project-content";

export type ProjectLanguage = "it" | "en";

export interface LocalizedString {
  it: string;
  en: string;
}

/** MP4 video entry — rendered after the image gallery on the project page */
export interface ProjectVideo {
  /** Path under public/, e.g. /projects/sudeep/videos/walkthrough.mp4 */
  src: string;
  /** Optional poster frame, e.g. /projects/sudeep/videos/walkthrough-poster.jpg */
  poster?: string;
  title?: LocalizedString;
}

export interface ProjectCaseStudy {
  overview: LocalizedString;
  designApproach: LocalizedString;
  keyFeatures: LocalizedString[];
  deliverables: LocalizedString[];
}

export interface Project {
  id: string;
  slug: string;
  /** Folder name under public/projects/ — must match on-disk media folder */
  mediaKey: string;
  title: string;
  client: string;
  category: LocalizedString;
  location: LocalizedString | null;
  year: string | null;
  /** Hero + portfolio card — auto-discovered from public/projects/{mediaKey}/ when autoDiscoverCover is true */
  coverImage: string;
  /** When true, coverImage is resolved from public/projects/{mediaKey}/ at build/request time */
  autoDiscoverCover?: boolean;
  /** Gallery images in display order — place files in public/projects/{mediaKey}/gallery/ */
  galleryImages: string[];
  /** When true, galleryImages are populated from public/projects/{mediaKey}/gallery/ at build time */
  autoDiscoverGallery?: boolean;
  /** Optional manual video entries — appended by auto-discovered files when autoDiscoverVideos is true */
  videos: ProjectVideo[];
  /** When true, videos are resolved from public/projects/{mediaKey}/videos/ at build/request time */
  autoDiscoverVideos?: boolean;
  caseStudy: ProjectCaseStudy;
  featured: boolean;
}

export interface ResolvedGalleryImage {
  src: string;
  altLabel: string;
}

export interface ResolvedVideo extends ProjectVideo {
  titleLabel: string;
}

export interface ResolvedCaseStudy {
  overviewLabel: string;
  designApproachLabel: string;
  keyFeatureLabels: string[];
  deliverableLabels: string[];
}

/** Resolved fields for UI rendering in the active language */
export interface ProjectView extends Project {
  categoryLabel: string;
  locationLabel: string | null;
  caseStudyLabels: ResolvedCaseStudy;
  hasCoverImage: boolean;
  galleryItems: ResolvedGalleryImage[];
  videoItems: ResolvedVideo[];
}

function caseStudyFor(slug: string): ProjectCaseStudy {
  return PROJECT_CASE_STUDIES[slug];
}

/**
 * PROJECT DATA
 * =============
 * Media lives under public/projects/{mediaKey}/.
 * Cover, gallery, and video files are auto-discovered on the server when enabled.
 * Case-study copy lives in src/lib/project-content.ts.
 */
export const PROJECTS: Project[] = [
  {
    id: "sudeep-nutrition",
    slug: "sudeep-nutrition",
    mediaKey: "sudeep",
    title: "Sudeep Nutrition",
    client: "Sudeep Nutrition",
    category: { it: "Nutrizione", en: "Nutrition" },
    location: null,
    year: null,
    coverImage: "",
    autoDiscoverCover: true,
    galleryImages: [],
    autoDiscoverGallery: true,
    videos: [],
    autoDiscoverVideos: true,
    caseStudy: caseStudyFor("sudeep-nutrition"),
    featured: true,
  },
  {
    id: "nvidia",
    slug: "nvidia",
    mediaKey: "nvidia",
    title: "NVIDIA",
    client: "NVIDIA",
    category: { it: "Tecnologia", en: "Technology" },
    location: null,
    year: null,
    coverImage: "",
    autoDiscoverCover: true,
    galleryImages: [],
    autoDiscoverGallery: true,
    videos: [],
    autoDiscoverVideos: true,
    caseStudy: caseStudyFor("nvidia"),
    featured: true,
  },
  {
    id: "egyptair",
    slug: "egyptair",
    mediaKey: "egyptair",
    title: "Egyptair",
    client: "Egyptair",
    category: { it: "Turismo", en: "Tourism" },
    location: null,
    year: null,
    coverImage: "",
    autoDiscoverCover: true,
    galleryImages: [],
    autoDiscoverGallery: true,
    videos: [],
    autoDiscoverVideos: true,
    caseStudy: caseStudyFor("egyptair"),
    featured: true,
  },
  {
    id: "amana-foods",
    slug: "amana-foods",
    mediaKey: "amana",
    title: "Amana Foods",
    client: "Amana Foods",
    category: { it: "Food & Beverage", en: "Food & Beverage" },
    location: null,
    year: null,
    coverImage: "",
    autoDiscoverCover: true,
    galleryImages: [],
    autoDiscoverGallery: true,
    videos: [],
    autoDiscoverVideos: true,
    caseStudy: caseStudyFor("amana-foods"),
    featured: true,
  },
  {
    id: "illulian",
    slug: "illulian",
    mediaKey: "illulian",
    title: "Illulian",
    client: "Illulian",
    category: { it: "Arredamento", en: "Interior Design" },
    location: null,
    year: null,
    coverImage: "",
    autoDiscoverCover: true,
    galleryImages: [],
    autoDiscoverGallery: true,
    videos: [],
    autoDiscoverVideos: true,
    caseStudy: caseStudyFor("illulian"),
    featured: true,
  },
  {
    id: "alpa70",
    slug: "alpa70",
    mediaKey: "alpa70",
    title: "ALPA70",
    client: "ALPA70",
    category: { it: "Arredamento", en: "Furniture Design" },
    location: null,
    year: null,
    coverImage: "",
    autoDiscoverCover: true,
    galleryImages: [],
    autoDiscoverGallery: true,
    videos: [],
    autoDiscoverVideos: true,
    caseStudy: caseStudyFor("alpa70"),
    featured: true,
  },
];

export function localize(value: LocalizedString, lang: ProjectLanguage): string {
  return lang === "it" ? value.it : value.en;
}

export function resolveCaseStudy(
  caseStudy: ProjectCaseStudy,
  lang: ProjectLanguage
): ResolvedCaseStudy {
  return {
    overviewLabel: localize(caseStudy.overview, lang),
    designApproachLabel: localize(caseStudy.designApproach, lang),
    keyFeatureLabels: caseStudy.keyFeatures.map((feature) => localize(feature, lang)),
    deliverableLabels: caseStudy.deliverables.map((item) => localize(item, lang)),
  };
}

export function resolveGalleryImages(
  project: Project,
  lang: ProjectLanguage
): ResolvedGalleryImage[] {
  return project.galleryImages.map((src, index) => ({
    src,
    altLabel: `${project.title} — ${lang === "it" ? "Immagine" : "Image"} ${index + 1}`,
  }));
}

export function resolveVideos(project: Project, lang: ProjectLanguage): ResolvedVideo[] {
  return project.videos.map((video, index) => ({
    ...video,
    titleLabel: video.title
      ? localize(video.title, lang)
      : `${project.title} — ${lang === "it" ? "Video" : "Video"} ${index + 1}`,
  }));
}

export function toProjectView(project: Project, lang: ProjectLanguage): ProjectView {
  return {
    ...project,
    categoryLabel: localize(project.category, lang),
    locationLabel: project.location ? localize(project.location, lang) : null,
    caseStudyLabels: resolveCaseStudy(project.caseStudy, lang),
    hasCoverImage: Boolean(project.coverImage),
    galleryItems: resolveGalleryImages(project, lang),
    videoItems: resolveVideos(project, lang),
  };
}

export function getProjects(lang: ProjectLanguage): ProjectView[] {
  return PROJECTS.map((project) => toProjectView(project, lang));
}

export function getFeaturedProjects(lang: ProjectLanguage): ProjectView[] {
  return getProjects(lang).filter((project) => project.featured);
}

export function getProjectRaw(slug: string): Project | undefined {
  return PROJECTS.find((entry) => entry.slug === slug);
}

export function getProjectBySlug(slug: string, lang: ProjectLanguage): ProjectView | undefined {
  const project = getProjectRaw(slug);
  return project ? toProjectView(project, lang) : undefined;
}

export function getProjectById(id: string, lang: ProjectLanguage): ProjectView | undefined {
  const project = PROJECTS.find((entry) => entry.id === id);
  return project ? toProjectView(project, lang) : undefined;
}

export function getProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}

export interface ProjectNavigation {
  prev: Project | null;
  next: Project | null;
  prevIndex: number;
  nextIndex: number;
}

export function getProjectNavigation(slug: string): ProjectNavigation {
  const index = PROJECTS.findIndex((entry) => entry.slug === slug);

  if (index === -1) {
    return { prev: null, next: null, prevIndex: -1, nextIndex: -1 };
  }

  return {
    prev: index > 0 ? PROJECTS[index - 1] : null,
    next: index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null,
    prevIndex: index - 1,
    nextIndex: index + 1,
  };
}

export function getMetadataDescription(project: Project, lang: ProjectLanguage = "en"): string {
  return localize(project.caseStudy.overview, lang);
}
