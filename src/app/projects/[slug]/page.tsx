import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import StructuredData from "@/components/seo/StructuredData";
import { buildProjectJsonLd, buildProjectMetadata } from "@/lib/project-metadata";
import {
  getEnrichedProjectRaw,
  resolveProjectGalleryItems,
  resolveProjectVideoItems,
} from "@/lib/projects.server";
import { getProjectSlugs } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getEnrichedProjectRaw(slug);

  if (!project) {
    return {
      title: "Project Not Found | Creative Design",
    };
  }

  return buildProjectMetadata(project, slug);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getEnrichedProjectRaw(slug);

  if (!project) {
    notFound();
  }

  const galleryItems = resolveProjectGalleryItems(project, "en");
  const videoItems = resolveProjectVideoItems(project, "en");

  return (
    <>
      <StructuredData data={buildProjectJsonLd(project, slug)} />
      <ProjectDetail
        slug={slug}
        coverImage={project.coverImage}
        galleryItems={galleryItems}
        videoItems={videoItems}
      />
    </>
  );
}
