"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { getProjects, type ProjectView } from "@/lib/projects";
import {
  MOTION_EASE,
  REVEAL_DURATION,
  useSectionReveal,
} from "@/lib/motion";

/* ── Single Project Item ── */
function ProjectItem({
  project,
  index,
  isInView,
  aspectClass = "aspect-[4/5]",
  delay = 0,
  large = false,
}: {
  project: ProjectView;
  index: number;
  isInView: boolean;
  aspectClass?: string;
  delay?: number;
  large?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: REVEAL_DURATION, delay, ease: MOTION_EASE }}
    >
      <Link href={`/projects/${project.slug}`} className="group block motion-card-lift">
      <div className={`relative ${aspectClass} overflow-hidden bg-card`}>
        {project.hasCoverImage ? (
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
          className="object-cover motion-image-zoom"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 50vw"
        />
        ) : (
        <div
          className="absolute inset-0"
          style={{
            background: isLight
              ? "linear-gradient(135deg, #e8e4dc 0%, #d4cfc4 100%)"
              : "linear-gradient(135deg, #1a1a1a 0%, #121212 100%)",
          }}
          aria-hidden
        />
        )}
        {/* Vignette — recedes on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-30"
          style={{
            background: isLight
              ? "linear-gradient(to top, rgba(26,23,20,0.48) 0%, transparent 48%)"
              : "linear-gradient(to top, rgba(10,10,10,0.60) 0%, transparent 48%)",
            opacity: isLight ? 0.55 : 0.65,
          }}
        />
      </div>

      {/* Metadata */}
      <div className="mt-6 flex min-w-0 flex-col gap-2.5 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="flex min-w-0 items-baseline gap-5">
          <span className={`text-[10px] tracking-[0.35em] font-semibold shrink-0 tabular-nums ${isLight ? "text-cyan" : "text-cyan/70"}`}>
            {num}
          </span>
          <div className="min-w-0 flex-1">
            <h3
              className={`font-display font-light tracking-tight leading-tight transition-colors duration-500 group-hover:text-cyan line-clamp-2 md:truncate ${
                large ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
              }`}
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
              }}
            >
              {project.title}
            </h3>
            {project.locationLabel && (
              <span className="text-[10px] tracking-[0.22em] text-text-dim/60 mt-1 block break-words">
                {project.locationLabel}
              </span>
            )}
          </div>
        </div>
        <div className="min-w-0 md:text-right md:shrink-0 md:max-w-[42%] pl-10 md:pl-0">
          <span className={`block text-[10px] tracking-[0.25em] uppercase font-semibold break-words ${isLight ? "text-text-muted" : "text-text-dim"}`}>
            {project.categoryLabel}
          </span>
          {project.yearLabel && (
          <span className={`block text-[10px] tracking-[0.15em] mt-0.5 break-words ${isLight ? "text-text-subtle" : "text-text-dim/45"}`}>
            {project.yearLabel}
          </span>
          )}
        </div>
      </div>
      </Link>
    </motion.article>
  );
}

export default function PortfolioSection({
  coverBySlug,
}: {
  coverBySlug: Record<string, string>;
}) {
  const { t, lang } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const { ref: sectionRef, show, initial, animate, transition } =
    useSectionReveal("-80px");

  const projects = getProjects(lang).map((project) => {
    const coverImage = coverBySlug[project.slug] ?? project.coverImage;

    return {
      ...project,
      coverImage,
      hasCoverImage: Boolean(coverImage),
    };
  });

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative section-padding"
    >
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-14 mb-24 lg:mb-32">
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition()}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="editorial-eyebrow-rule" />
              <span className="editorial-eyebrow">
                {t("Portfolio", "Portfolio")}
              </span>
            </div>
            <h2 className="headline-display text-[clamp(52px,8vw,108px)] text-text">
              {t("Lavori", "Selected")}
              <br />
              <span className="text-text-dim font-light not-italic" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                {t("Selezionati", "Work")}
              </span>
            </h2>
          </div>

          <p className={`leading-relaxed lg:text-right lg:pb-2 ${isLight ? "editorial-lead max-w-sm" : "text-sm max-w-xs text-text-dim"}`}>
            {t(
              "Una selezione dei nostri stand fieristici e installazioni corporate per brand internazionali.",
              "A selection of our exhibition stands and corporate installations for international brands."
            )}
          </p>
        </motion.div>
      </div>

      {/* ── Editorial Grid ──────────────────────────────────────────
          Row 1: Full-width panoramic
          Row 2: 58 / 42 — vertical offset
          Row 3: 42 / 58 — mirrored offset
          Row 4: Full-width panoramic
      ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-14 space-y-3 lg:space-y-4 min-w-0">

        {/* Row 1 — Full width */}
        <ProjectItem
          project={projects[0]}
          index={0}
          isInView={show}
          aspectClass="aspect-[16/8] lg:aspect-[21/9]"
          delay={0}
          large
        />

        {/* Row 2 — 58 / 42 */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 lg:gap-4 items-start">
          <div className="lg:col-span-6">
            <ProjectItem
              project={projects[1]}
              index={1}
              isInView={show}
              aspectClass="aspect-[4/5]"
              delay={0.06}
            />
          </div>
          <div className="lg:col-span-4 lg:mt-28">
            <ProjectItem
              project={projects[2]}
              index={2}
              isInView={show}
              aspectClass="aspect-[4/5]"
              delay={0.12}
            />
          </div>
        </div>

        {/* Row 3 — 42 / 58 mirrored */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 lg:gap-4 items-start">
          <div className="lg:col-span-4 lg:mt-28">
            <ProjectItem
              project={projects[3]}
              index={3}
              isInView={show}
              aspectClass="aspect-[4/5]"
              delay={0.06}
            />
          </div>
          <div className="lg:col-span-6">
            <ProjectItem
              project={projects[4]}
              index={4}
              isInView={show}
              aspectClass="aspect-[4/5]"
              delay={0.12}
            />
          </div>
        </div>

        {/* Row 4 — Full width */}
        <ProjectItem
          project={projects[5]}
          index={5}
          isInView={show}
          aspectClass="aspect-[16/8] lg:aspect-[21/9]"
          delay={0}
          large
        />
      </div>

      {/* ── Footer CTA ── */}
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition(0.5)}
        className="max-w-7xl mx-auto px-8 lg:px-14 mt-24 lg:mt-32 flex min-w-0 items-center gap-4 sm:gap-8"
      >
        <div className="flex-1 gradient-line" />
        <Link
          href="/#contact"
          className={`premium-cta group inline-flex min-w-0 items-center gap-4 sm:gap-6 shrink-0 transition-colors duration-500 ${
            isLight ? "text-text hover:text-cyan" : "text-text hover:text-cyan"
          }`}
        >
          <span className="text-[10px] font-semibold tracking-[0.38em] uppercase">
            {t("Inizia un Progetto", "Start a Project")}
          </span>
          <svg
            className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
