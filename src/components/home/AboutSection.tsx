"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2200;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  const stats = [
    { value: 30, suffix: "+", label: t("Anni di Esperienza", "Years of Experience") },
    { value: 500, suffix: "+", label: t("Progetti Realizzati", "Projects Completed") },
    { value: 200, suffix: "+", label: t("Clienti Internazionali", "International Clients") },
    { value: 45, suffix: "", label: t("Professionisti", "Professionals") },
  ];

  const tags = [
    t("Produzione Interna", "In-house Production"),
    t("Progetti Europei", "European Projects"),
    t("Chiavi in Mano", "Turnkey Solutions"),
    t("Progettazione 3D", "3D Design"),
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      <div className="gradient-line" />

      <div className="max-w-7xl mx-auto px-8 lg:px-14 pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">

          {/* ── Left — Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/hero-interior.png"
                alt={t("Studio di progettazione Creative Design", "Creative Design studio")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Minimal vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background: isLight
                    ? "linear-gradient(to top, rgba(12,10,7,0.32) 0%, transparent 38%, transparent 62%, rgba(12,10,7,0.06) 100%)"
                    : "linear-gradient(to top, rgba(10,10,10,0.35) 0%, transparent 42%)",
                }}
              />

              {/* Year stamp — integrated within image frame */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute inset-0 pointer-events-none overflow-hidden"
                aria-hidden
              >
                <span
                  className="absolute bottom-3 left-4 lg:bottom-5 lg:left-5 select-none leading-none"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(48px, 6.5vw, 76px)",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    color: isLight
                      ? "rgba(20, 84, 84, 0.16)"
                      : "rgba(232, 230, 225, 0.06)",
                  }}
                >
                  1994
                </span>
              </motion.div>
            </div>

            {/* Decorative accent */}
            <div
              className="absolute -left-3 top-1/4 w-px h-24"
              style={{
                background: isLight
                  ? "linear-gradient(to bottom, rgba(20,84,84,0.55), transparent)"
                  : "linear-gradient(to bottom, rgba(126,200,200,0.45), transparent)",
              }}
            />
          </motion.div>

          {/* ── Right — Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:pt-10"
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="editorial-eyebrow-rule" />
              <span className="editorial-eyebrow">
                {t("Chi Siamo", "About Us")}
              </span>
            </div>

            {/* Headline — Cormorant Garamond */}
            <h2
              className={`mb-10 leading-[0.90] ${isLight ? "text-text" : ""}`}
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(42px, 6vw, 76px)",
                fontWeight: isLight ? 400 : 300,
                fontStyle: "italic",
                letterSpacing: "-0.02em",
              }}
            >
              {t("Eccellenza Italiana", "Italian Excellence")}
              <br />
              <span style={{ fontStyle: "normal", color: "var(--text-dim)" }}>
                {t("nel Design", "in Spatial")}
              </span>
              <span className="text-cyan"> {t("Spaziale", "Design")}</span>
            </h2>

            <p className={`mb-5 ${isLight ? "editorial-lead" : "text-[15px] leading-relaxed text-text-dim"}`}>
              {t(
                "Da oltre trent'anni, Creative Design è il punto di riferimento italiano per la progettazione e realizzazione di stand fieristici, ambienti espositivi e installazioni corporate. Progettiamo spazi che comunicano brand attraverso architettura, luce e materia.",
                "For over thirty years, Creative Design has been the Italian benchmark in the design and construction of exhibition stands, trade show environments and corporate installations. We design spaces that communicate brands through architecture, light and matter."
              )}
            </p>
            <p className={`mb-12 ${isLight ? "editorial-body" : "text-[13px] leading-relaxed text-text-dim/75"}`}>
              {t(
                "Ogni progetto nasce da un'analisi profonda dell'identità del brand, si sviluppa attraverso una progettazione tridimensionale rigorosa e prende forma nei nostri laboratori interni.",
                "Every project begins with a deep analysis of the brand identity, develops through rigorous 3D spatial design, and takes shape in our in-house workshops."
              )}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-16">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase border transition-colors duration-300 ${
                    isLight
                      ? "border-[rgba(12,10,7,0.16)] text-text-muted hover:border-[rgba(20,84,84,0.45)] hover:text-cyan"
                      : "border-glass-border text-text-dim hover:border-cyan/22 hover:text-cyan"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats — Cormorant numbers */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-0 border-t pt-10 ${
                isLight ? "border-[rgba(12,10,7,0.12)]" : "border-[rgba(255,255,255,0.05)]"
              }`}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
                  className={`pr-4 ${
                    i !== 0
                      ? isLight
                        ? "border-l border-[rgba(12,10,7,0.10)] pl-4"
                        : "border-l border-[rgba(255,255,255,0.05)] pl-4"
                      : ""
                  } ${i >= 2 ? "mt-8 sm:mt-0" : ""}`}
                >
                  <div
                    className="mb-1 text-text"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(28px, 4vw, 44px)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className={isLight ? "editorial-stat-label leading-snug" : "text-[10px] tracking-[0.20em] uppercase font-medium leading-snug text-text-dim"}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
