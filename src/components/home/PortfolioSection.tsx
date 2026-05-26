"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface Project {
  image: string;
  title: string;
  category: string;
  year: string;
  location?: string;
}

/* ── Single Project Item ── */
function ProjectItem({
  project,
  index,
  isInView,
  aspectClass = "aspect-[4/5]",
  delay = 0,
  large = false,
}: {
  project: Project;
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
      initial={{ opacity: 0, y: 56 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      {/* Image — sharp, no radius */}
      <div className={`relative ${aspectClass} overflow-hidden bg-card`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-[1800ms] ease-[0.22,1,0.36,1] group-hover:scale-[1.035]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 50vw"
        />
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
      <div className="mt-6 flex items-start justify-between gap-8">
        <div className="flex items-baseline gap-5 min-w-0">
          <span className={`text-[10px] tracking-[0.35em] font-semibold shrink-0 tabular-nums ${isLight ? "text-cyan" : "text-cyan/70"}`}>
            {num}
          </span>
          <div className="min-w-0">
            <h3
              className={`font-display font-light tracking-tight leading-tight transition-colors duration-500 group-hover:text-cyan truncate ${
                large ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
              }`}
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
              }}
            >
              {project.title}
            </h3>
            {project.location && (
              <span className="text-[10px] tracking-[0.22em] text-text-dim/60 mt-1 block">
                {project.location}
              </span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className={`block text-[10px] tracking-[0.25em] uppercase font-semibold ${isLight ? "text-text-muted" : "text-text-dim"}`}>
            {project.category}
          </span>
          <span className={`block text-[10px] tracking-[0.15em] mt-0.5 ${isLight ? "text-text-subtle" : "text-text-dim/45"}`}>
            {project.year}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function PortfolioSection() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const projects: Project[] = [
    {
      image: "/images/portfolio-auto.png",
      title: t("BMW — Salone di Ginevra", "BMW — Geneva Motor Show"),
      category: t("Automotive", "Automotive"),
      year: "2024",
      location: t("Ginevra, CH", "Geneva, CH"),
    },
    {
      image: "/images/portfolio-fashion.png",
      title: t("L'Oréal — Cosmoprof Bologna", "L'Oréal — Cosmoprof Bologna"),
      category: t("Beauty & Wellness", "Beauty & Wellness"),
      year: "2024",
      location: t("Bologna, IT", "Bologna, IT"),
    },
    {
      image: "/images/portfolio-tech.png",
      title: t("Siemens — CES Las Vegas", "Siemens — CES Las Vegas"),
      category: t("Tecnologia", "Technology"),
      year: "2023",
      location: t("Las Vegas, US", "Las Vegas, US"),
    },
    {
      image: "/images/portfolio-showroom.png",
      title: t("DE NORA — Hannover Messe", "DE NORA — Hannover Messe"),
      category: t("Energia & Industria", "Energy & Industry"),
      year: "2023",
      location: t("Hannover, DE", "Hanover, DE"),
    },
    {
      image: "/images/hero-exhibition.png",
      title: t("Ferrero — Anuga Colonia", "Ferrero — Anuga Cologne"),
      category: t("Food & Beverage", "Food & Beverage"),
      year: "2022",
      location: t("Colonia, DE", "Cologne, DE"),
    },
    {
      image: "/images/hero-interior.png",
      title: t("Pirelli — Salone di Parigi", "Pirelli — Paris Motor Show"),
      category: t("Automotive", "Automotive"),
      year: "2022",
      location: t("Parigi, FR", "Paris, FR"),
    },
  ];

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative section-padding"
    >
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-14 mb-24 lg:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
      <div className="max-w-7xl mx-auto px-8 lg:px-14 space-y-3 lg:space-y-4">

        {/* Row 1 — Full width */}
        <ProjectItem
          project={projects[0]}
          index={0}
          isInView={isInView}
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
              isInView={isInView}
              aspectClass="aspect-[4/5]"
              delay={0.06}
            />
          </div>
          <div className="lg:col-span-4 lg:mt-28">
            <ProjectItem
              project={projects[2]}
              index={2}
              isInView={isInView}
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
              isInView={isInView}
              aspectClass="aspect-[4/5]"
              delay={0.06}
            />
          </div>
          <div className="lg:col-span-6">
            <ProjectItem
              project={projects[4]}
              index={4}
              isInView={isInView}
              aspectClass="aspect-[4/5]"
              delay={0.12}
            />
          </div>
        </div>

        {/* Row 4 — Full width */}
        <ProjectItem
          project={projects[5]}
          index={5}
          isInView={isInView}
          aspectClass="aspect-[16/8] lg:aspect-[21/9]"
          delay={0}
          large
        />
      </div>

      {/* ── Footer CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto px-8 lg:px-14 mt-24 lg:mt-32 flex items-center gap-8"
      >
        <div className="flex-1 gradient-line" />
        <a
          href="#contact"
          className={`group inline-flex items-center gap-6 shrink-0 transition-colors duration-500 ${
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
        </a>
      </motion.div>
    </section>
  );
}
