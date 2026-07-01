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

/** Optional project metadata — omit, set null, or leave empty until real data is available. */
export interface ProjectMetadata {
  /** e.g. "2024" */
  year: string | null;
  /** City, country, or venue */
  location: LocalizedString | null;
  /** Trade fair or exhibition name */
  exhibition: LocalizedString | null;
  /** e.g. "120 m²" */
  standSize: LocalizedString | null;
  /** Creative Design services delivered on this project */
  servicesProvided: LocalizedString[] | null;
  /** e.g. "21–26 April 2026" */
  dates?: LocalizedString | null;
  /** e.g. "Pad 3 – C09" */
  booth?: LocalizedString | null;
  /** Overrides the default Exhibition label in the meta grid (e.g. Event) */
  metaExhibitionLabel?: LocalizedString | null;
  /** Optional override for the video section heading */
  videoSectionTitle?: LocalizedString | null;
  /** Optional note displayed above project videos */
  videoSectionNote?: LocalizedString | null;
  /** Fair or exhibition venue, when distinct from location */
  venue?: LocalizedString | null;
  /** Stand design credit */
  designBy?: LocalizedString | null;
  /** Stand build and installation credit */
  executionBy?: LocalizedString | null;
  /** Overrides case study overview for page metadata when set */
  seoDescription?: LocalizedString | null;
  /** Custom gallery alt text by display order (matches auto-discovered gallery) */
  galleryImageAlts?: LocalizedString[] | null;
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
  exhibition: LocalizedString | null;
  standSize: LocalizedString | null;
  servicesProvided: LocalizedString[] | null;
  dates?: LocalizedString | null;
  booth?: LocalizedString | null;
  metaExhibitionLabel?: LocalizedString | null;
  videoSectionTitle?: LocalizedString | null;
  videoSectionNote?: LocalizedString | null;
  venue?: LocalizedString | null;
  designBy?: LocalizedString | null;
  executionBy?: LocalizedString | null;
  seoDescription?: LocalizedString | null;
  galleryImageAlts?: LocalizedString[] | null;
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
  yearLabel: string | null;
  locationLabel: string | null;
  exhibitionLabel: string | null;
  standSizeLabel: string | null;
  datesLabel: string | null;
  boothLabel: string | null;
  metaExhibitionFieldLabel: string | null;
  videoSectionTitleLabel: string | null;
  videoSectionNoteLabel: string | null;
  venueLabel: string | null;
  designByLabel: string | null;
  executionByLabel: string | null;
  servicesProvidedLabels: string[];
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
 *
 * Optional metadata (year, location, exhibition, standSize, servicesProvided):
 * set to null or leave servicesProvided empty until real values are known.
 * The UI hides any field without data — never use placeholders.
 */
export const PROJECTS: Project[] = [
  {
    id: "sudeep-nutrition",
    slug: "sudeep-nutrition",
    mediaKey: "sudeep",
    title: "Sudeep Nutrition",
    client: "Sudeep Nutrition",
    category: { it: "Nutraceutica", en: "Nutraceuticals" },
    location: { it: "Barcellona, Spagna", en: "Barcelona, Spain" },
    year: null,
    exhibition: {
      it: "Vitafoods Europe",
      en: "Vitafoods Europe",
    },
    standSize: null,
    servicesProvided: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Produzione stand", en: "Stand Production" },
      { it: "Montaggio in sito", en: "On-site Installation" },
    ],
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
    id: "mindware",
    slug: "mindware",
    mediaKey: "mindware",
    title: "Mindware",
    client: "Mindware",
    category: { it: "Tecnologia", en: "Technology" },
    location: { it: "Barcellona, Spagna", en: "Barcelona, Spain" },
    year: null,
    exhibition: {
      it: "Smart City Expo World Congress",
      en: "Smart City Expo World Congress",
    },
    standSize: null,
    servicesProvided: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Produzione stand", en: "Stand Production" },
      { it: "Montaggio in sito", en: "On-site Installation" },
    ],
    coverImage: "",
    autoDiscoverCover: true,
    galleryImages: [],
    autoDiscoverGallery: true,
    videos: [],
    autoDiscoverVideos: true,
    caseStudy: caseStudyFor("mindware"),
    featured: true,
  },
  {
    id: "egypt-tourism",
    slug: "egypt-tourism",
    mediaKey: "egypt-tourism",
    title: "Egypt Tourism Pavilion",
    client: "Egypt Tourism",
    category: { it: "Turismo", en: "Tourism" },
    location: null,
    year: null,
    exhibition: null,
    standSize: null,
    servicesProvided: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Costruzione stand", en: "Stand Construction" },
      { it: "Allestimento interno", en: "Interior Fit-Out" },
      { it: "Integrazione branding", en: "Branding Integration" },
      { it: "Progettazione illuminotecnica", en: "Lighting Design" },
      { it: "Esperienza visitatore", en: "Visitor Experience" },
      { it: "Produzione grafica", en: "Graphic Production" },
      { it: "Installazione chiavi in mano", en: "Turnkey Installation" },
    ],
    coverImage: "",
    autoDiscoverCover: true,
    galleryImages: [],
    autoDiscoverGallery: true,
    videos: [],
    autoDiscoverVideos: true,
    caseStudy: caseStudyFor("egypt-tourism"),
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
    exhibition: null,
    standSize: null,
    servicesProvided: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Costruzione stand", en: "Stand Construction" },
      { it: "Sistemi espositivi retail", en: "Retail Display Systems" },
      { it: "Falegnameria su misura", en: "Custom Joinery" },
      { it: "Integrazione LED", en: "LED Integration" },
      { it: "Branding e grafica", en: "Branding & Graphics" },
      { it: "Progettazione illuminotecnica", en: "Lighting Design" },
      { it: "Gestione progetto", en: "Project Management" },
    ],
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
    category: {
      it: "Tappeti Artigianali di Lusso su Misura",
      en: "Luxury Custom Handmade Rugs",
    },
    location: {
      it: "Milano, Italia",
      en: "Milan, Italy",
    },
    year: "2023",
    exhibition: {
      it: "Salone del Mobile Milano 2023",
      en: "Salone del Mobile Milano 2023",
    },
    metaExhibitionLabel: { it: "Evento", en: "Event" },
    venue: {
      it: "Fiera Milano",
      en: "Fiera Milano",
    },
    designBy: {
      it: "Simone Utzeri",
      en: "Simone Utzeri",
    },
    executionBy: {
      it: "Creative Design",
      en: "Creative Design",
    },
    standSize: null,
    servicesProvided: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Costruzione stand", en: "Stand Construction" },
      { it: "Montaggio in sito", en: "On-site Installation" },
    ],
    seoDescription: {
      it: "Stand fieristico progettato e realizzato per Illulian al Salone del Mobile Milano 2023 a Milano, con un ambiente minimalista ispirato alla galleria per tappeti artigianali di lusso.",
      en: "Exhibition stand designed and built for Illulian at Salone del Mobile Milano 2023 in Milan, featuring a minimalist gallery-inspired environment for luxury handmade rugs.",
    },
    galleryImageAlts: [
      {
        it: "Ingresso dello stand Illulian al Salone del Mobile Milano 2023",
        en: "Illulian exhibition entrance at Salone del Mobile Milano 2023",
      },
      {
        it: "Interno in stile galleria con tappeti artigianali in esposizione",
        en: "Gallery-style interior displaying handcrafted rugs",
      },
      {
        it: "Pareti architettoniche curve con collezioni di tappeti di lusso",
        en: "Curved architectural walls showcasing luxury rug collections",
      },
      {
        it: "Illuminazione architettonica su tappeti premium in esposizione",
        en: "Architectural lighting highlighting premium rugs on display",
      },
      {
        it: "Grandi superfici tessili esposte nello stand minimalista",
        en: "Large-format textile displays within the minimalist stand",
      },
      {
        it: "Percorso aperto dei visitatori nello spazio espositivo",
        en: "Open visitor flow through the gallery-inspired exhibition space",
      },
      {
        it: "Atmosfera da museo con palette materiali bianca e pulita",
        en: "Museum-like exhibition atmosphere with a clean white material palette",
      },
    ],
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
    title: "ALPA Salotti",
    client: "ALPA Salotti",
    category: {
      it: "Esposizione Arredamento di Lusso",
      en: "Luxury Furniture Exhibition",
    },
    location: {
      it: "Rho Fiera Milano, Milano, Italia",
      en: "Rho Fiera Milano, Milan, Italy",
    },
    year: "2026",
    exhibition: {
      it: "Salone del Mobile Milano 2026",
      en: "Salone del Mobile Milano 2026",
    },
    metaExhibitionLabel: { it: "Evento", en: "Event" },
    dates: { it: "21–26 aprile 2026", en: "21–26 April 2026" },
    booth: { it: "Padiglione 3 – C09", en: "Pad 3 – C09" },
    standSize: null,
    servicesProvided: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Costruzione stand", en: "Stand Construction" },
      { it: "Montaggio in sito", en: "On-site Installation" },
    ],
    videoSectionTitle: {
      it: "Altri progetti ALPA Salotti",
      en: "More from ALPA Salotti",
    },
    videoSectionNote: {
      it: "Questo video presenta un'altra installazione fieristica realizzata per ALPA Salotti, a testimonianza della continuità della collaborazione tra diversi eventi.",
      en: "This video showcases another exhibition installation created for ALPA Salotti, highlighting the continuity of the collaboration across different events.",
    },
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

function resolveOptionalText(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function resolveOptionalLocalized(
  value: LocalizedString | null | undefined,
  lang: ProjectLanguage
): string | null {
  if (!value) return null;
  return resolveOptionalText(localize(value, lang));
}

function resolveServicesProvidedLabels(
  items: LocalizedString[] | null | undefined,
  lang: ProjectLanguage
): string[] {
  if (!items?.length) return [];
  return items
    .map((item) => resolveOptionalText(localize(item, lang)))
    .filter((item): item is string => Boolean(item));
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

export function resolveGalleryAltLabel(
  project: Project,
  index: number,
  lang: ProjectLanguage
): string {
  const custom = project.galleryImageAlts?.[index];
  if (custom) {
    return localize(custom, lang);
  }
  return `${project.title} — ${lang === "it" ? "Immagine" : "Image"} ${index + 1}`;
}

export function resolveGalleryImages(
  project: Project,
  lang: ProjectLanguage
): ResolvedGalleryImage[] {
  return project.galleryImages.map((src, index) => ({
    src,
    altLabel: resolveGalleryAltLabel(project, index, lang),
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
    yearLabel: resolveOptionalText(project.year),
    locationLabel: resolveOptionalLocalized(project.location, lang),
    exhibitionLabel: resolveOptionalLocalized(project.exhibition, lang),
    standSizeLabel: resolveOptionalLocalized(project.standSize, lang),
    datesLabel: resolveOptionalLocalized(project.dates, lang),
    boothLabel: resolveOptionalLocalized(project.booth, lang),
    metaExhibitionFieldLabel: resolveOptionalLocalized(project.metaExhibitionLabel, lang),
    videoSectionTitleLabel: resolveOptionalLocalized(project.videoSectionTitle, lang),
    videoSectionNoteLabel: resolveOptionalLocalized(project.videoSectionNote, lang),
    venueLabel: resolveOptionalLocalized(project.venue, lang),
    designByLabel: resolveOptionalLocalized(project.designBy, lang),
    executionByLabel: resolveOptionalLocalized(project.executionBy, lang),
    servicesProvidedLabels: resolveServicesProvidedLabels(project.servicesProvided, lang),
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
