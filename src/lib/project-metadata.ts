import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://creativedesign.it";

export const projectsMetadataBase = new URL(siteUrl);

export function projectOpenGraphImage(coverImage: string | undefined): string | undefined {
  if (!coverImage) return undefined;
  if (coverImage.startsWith("http")) return coverImage;
  return `${siteUrl}${coverImage.startsWith("/") ? coverImage : `/${coverImage}`}`;
}

export function buildProjectMetadata(project: {
  title: string;
  caseStudy: { overview: { it: string; en: string } };
  coverImage: string;
}): Metadata {
  const description = project.caseStudy.overview.en;
  const ogImage = projectOpenGraphImage(project.coverImage);

  return {
    title: `${project.title} | Creative Design`,
    description,
    openGraph: {
      title: `${project.title} | Creative Design`,
      description,
      type: "article",
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
      title: `${project.title} | Creative Design`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
