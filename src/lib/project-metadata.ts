import type { Metadata } from "next";
import {
  defaultSiteDescription,
  siteMetadataBase,
  siteName,
  siteUrl,
} from "./site";

export { siteMetadataBase as projectsMetadataBase };

export function projectOpenGraphImage(coverImage: string | undefined): string | undefined {
  if (!coverImage) return undefined;
  if (coverImage.startsWith("http")) return coverImage;
  return `${siteUrl}${coverImage.startsWith("/") ? coverImage : `/${coverImage}`}`;
}

export function buildProjectMetadata(
  project: {
    title: string;
    caseStudy: { overview: { it: string; en: string } };
    coverImage: string;
    seoDescription?: { it: string; en: string } | null;
  },
  slug: string
): Metadata {
  const title = `${project.title} | ${siteName}`;
  const description = project.seoDescription?.en ?? project.caseStudy.overview.en;
  const ogImage = projectOpenGraphImage(project.coverImage);
  const canonicalPath = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalPath,
      siteName,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: project.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description: defaultSiteDescription,
    email: "creative.design.teamm@gmail.com",
    telephone: "+393248244990",
    sameAs: [
      "https://www.instagram.com/creative_design_srl/",
      "https://www.facebook.com/creative.design.srl/",
    ],
  };
}

export function buildProjectJsonLd(project: {
  title: string;
  client: string;
  coverImage: string;
  caseStudy: { overview: { en: string } };
  seoDescription?: { en: string } | null;
}, slug: string) {
  const description = project.seoDescription?.en ?? project.caseStudy.overview.en;
  const image = projectOpenGraphImage(project.coverImage);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description,
    url: `${siteUrl}/projects/${slug}`,
    creator: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    about: {
      "@type": "Organization",
      name: project.client,
    },
    ...(image ? { image } : {}),
  };
}
