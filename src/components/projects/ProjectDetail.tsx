"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  getProjectBySlug,
  getProjectNavigation,
  type ResolvedGalleryImage,
  type ResolvedVideo,
} from "@/lib/projects";
import ProjectGallery from "./ProjectGallery";
import ProjectVideos from "./ProjectVideos";
import ProjectClosingCta from "./ProjectClosingCta";
import MotionReveal from "@/components/motion/MotionReveal";
import { useMountReveal } from "@/lib/motion";
import styles from "./ProjectDetail.module.css";

interface ProjectDetailProps {
  slug: string;
  coverImage?: string;
  galleryItems?: ResolvedGalleryImage[];
  videoItems?: ResolvedVideo[];
}

export default function ProjectDetail({
  slug,
  coverImage: coverImageProp,
  galleryItems: galleryItemsProp,
  videoItems: videoItemsProp,
}: ProjectDetailProps) {
  const { t, lang } = useLanguage();
  const heroReveal = useMountReveal(0.12);
  const project = getProjectBySlug(slug, lang);
  const navigation = getProjectNavigation(slug);

  if (!project) {
    return null;
  }

  const { caseStudyLabels } = project;
  const hasYear = Boolean(project.year);
  const hasLocation = Boolean(project.locationLabel);
  const galleryItems = galleryItemsProp ?? project.galleryItems;
  const videoItems = videoItemsProp ?? project.videoItems;
  const coverImage = coverImageProp ?? project.coverImage;
  const hasCoverImage = Boolean(coverImage);
  const hasGallery = galleryItems.length > 0;
  const hasVideos = videoItems.length > 0;

  const metaItems = [
    { label: t("Cliente", "Client"), value: project.client },
    { label: t("Categoria", "Category"), value: project.categoryLabel },
    ...(hasYear ? [{ label: t("Anno", "Year"), value: project.year! }] : []),
    ...(hasLocation
      ? [{ label: t("Luogo", "Location"), value: project.locationLabel! }]
      : []),
  ];

  return (
    <article className={styles.project}>
      <header className={styles.hero}>
        {hasCoverImage ? (
          <div className={styles.heroImageWrap}>
            <Image
              src={coverImage}
              alt={project.title}
              fill
              priority
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              className={styles.heroImage}
              sizes="100vw"
            />
            <div className={styles.heroOverlay} />
          </div>
        ) : (
          <div className={styles.heroFallback} aria-hidden />
        )}

        <div className={styles.heroContent}>
          <motion.div className={styles.heroInner} {...heroReveal}>
            <div className={styles.heroMetaTop}>
              <span className={styles.heroCategory}>{project.categoryLabel}</span>
              {hasYear && <span className={styles.heroYear}>{project.year}</span>}
            </div>
            <h1 className={styles.heroTitle}>{project.title}</h1>
            <p className={styles.heroClient}>{project.client}</p>
            {hasLocation && (
              <p className={styles.heroLocation}>{project.locationLabel}</p>
            )}
          </motion.div>
        </div>
      </header>

      <div className={styles.body}>
        <MotionReveal>
          <Link href="/#portfolio" className={styles.backLink}>
            <span className={styles.backLinkLine} aria-hidden />
            <span>{t("Torna al Portfolio", "Back to Portfolio")}</span>
          </Link>
        </MotionReveal>

        <MotionReveal delay={0.08}>
        <dl
          className={styles.metaGrid}
          data-count={metaItems.length}
          style={{ "--meta-count": metaItems.length } as React.CSSProperties}
        >
          {metaItems.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        </MotionReveal>

        <div className={styles.content}>
          <MotionReveal delay={0.1}>
          <section className={styles.section} aria-labelledby="project-overview">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionRule} aria-hidden />
              <h2 id="project-overview" className={styles.sectionEyebrow}>
                {t("Panoramica", "Overview")}
              </h2>
            </div>
            <p className={styles.prose}>{caseStudyLabels.overviewLabel}</p>
          </section>
          </MotionReveal>

          <MotionReveal delay={0.14}>
          <section className={styles.section} aria-labelledby="project-approach">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionRule} aria-hidden />
              <h2 id="project-approach" className={styles.sectionEyebrow}>
                {t("Approccio Progettuale", "Design Approach")}
              </h2>
            </div>
            <p className={styles.prose}>{caseStudyLabels.designApproachLabel}</p>
          </section>
          </MotionReveal>

          <MotionReveal delay={0.18}>
          <section className={styles.section} aria-labelledby="project-features">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionRule} aria-hidden />
              <h2 id="project-features" className={styles.sectionEyebrow}>
                {t("Caratteristiche", "Key Features")}
              </h2>
            </div>
            <ul className={styles.featureList}>
              {caseStudyLabels.keyFeatureLabels.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          </MotionReveal>

          <MotionReveal delay={0.22}>
          <section className={styles.section} aria-labelledby="project-deliverables">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionRule} aria-hidden />
              <h2 id="project-deliverables" className={styles.sectionEyebrow}>
                {t("Deliverable", "Deliverables")}
              </h2>
            </div>
            <ul className={styles.deliverableList}>
              {caseStudyLabels.deliverableLabels.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          </MotionReveal>
        </div>

        {hasGallery && (
          <MotionReveal
            as="section"
            className={`${styles.section} ${styles.gallerySection}`}
            delay={0.1}
            aria-labelledby="project-gallery"
          >
            <div className={styles.galleryIntro}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionRule} aria-hidden />
                <h2 id="project-gallery" className={styles.sectionEyebrow}>
                  {t("Galleria", "Gallery")}
                </h2>
              </div>
              <p className={styles.galleryLead}>
                {t(
                  "Una selezione di immagini dell'allestimento e dell'ambiente espositivo.",
                  "A selection of images from the installation and exhibition environment."
                )}
              </p>
            </div>
            <ProjectGallery items={galleryItems} projectTitle={project.title} />
          </MotionReveal>
        )}

        {hasVideos && (
          <MotionReveal as="section" className={styles.section} delay={0.12} aria-labelledby="project-videos">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionRule} aria-hidden />
              <h2 id="project-videos" className={styles.sectionEyebrow}>
                {t("Video", "Video")}
              </h2>
            </div>
            <ProjectVideos items={videoItems} />
          </MotionReveal>
        )}

        <MotionReveal
          as="nav"
          className={styles.projectNav}
          delay={0.08}
          aria-label={t("Navigazione progetti", "Project navigation")}
        >
          {navigation.prev ? (
            <Link
              href={`/projects/${navigation.prev.slug}`}
              className={`${styles.projectNavLink} motion-card-lift`}
            >
              <span className={styles.projectNavLabel}>
                {t("Progetto Precedente", "Previous Project")}
              </span>
              <span className={styles.projectNavTitle}>{navigation.prev.title}</span>
            </Link>
          ) : (
            <span className={styles.projectNavPlaceholder} />
          )}

          {navigation.next ? (
            <Link
              href={`/projects/${navigation.next.slug}`}
              className={`${styles.projectNavLink} ${styles.projectNavLinkNext} motion-card-lift`}
            >
              <span className={styles.projectNavLabel}>
                {t("Progetto Successivo", "Next Project")}
              </span>
              <span className={styles.projectNavTitle}>{navigation.next.title}</span>
            </Link>
          ) : (
            <span className={styles.projectNavPlaceholder} />
          )}
        </MotionReveal>

        <ProjectClosingCta />
      </div>
    </article>
  );
}
