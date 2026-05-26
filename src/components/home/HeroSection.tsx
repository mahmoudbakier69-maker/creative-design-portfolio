"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const [current, setCurrent] = useState(0);
  const isLight = mounted && theme === "light";

  const slides = [
    {
      image: "/images/hero-exhibition.png",
      tagline: t("Progettazione\nFieristica", "Exhibition\nDesign"),
      sub: t("Milano · Hannover · Barcellona", "Milan · Hannover · Barcelona"),
    },
    {
      image: "/images/hero-interior.png",
      tagline: t("Architettura\ndello Spazio", "Spatial\nArchitecture"),
      sub: t("Ambienti Corporate e Fieristici", "Corporate & Exhibition Environments"),
    },
    {
      image: "/images/portfolio-auto.png",
      tagline: t("Spazi\nAutomotive", "Automotive\nSpaces"),
      sub: t("Ginevra · Francoforte · Parigi", "Geneva · Frankfurt · Paris"),
    },
    {
      image: "/images/portfolio-showroom.png",
      tagline: t("Brand\nExperience", "Brand\nExperience"),
      sub: t("Identità Spaziale · Installazioni Corporate", "Spatial Identity · Corporate Installations"),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSlide = (i: number) => setCurrent(i);

  /* ── Overlays — minimal, image-first ── */
  const overlayBase = isLight
    ? "linear-gradient(to bottom, rgba(229,223,210,0.04) 0%, transparent 25%, transparent 52%, rgba(12,10,7,0.62) 100%)"
    : "linear-gradient(to bottom, rgba(10,10,10,0.30) 0%, transparent 25%, transparent 52%, rgba(10,10,10,0.88) 100%)";

  const overlaySide = isLight
    ? "linear-gradient(to right, rgba(229,223,210,0.48) 0%, rgba(229,223,210,0.14) 34%, transparent 62%)"
    : "linear-gradient(to right, rgba(10,10,10,0.70) 0%, rgba(10,10,10,0.24) 42%, transparent 70%)";

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center"
    >
      {/* ── Background Slides ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[3500ms] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.tagline.replace("\n", " ")}
            fill
            className={`object-cover transition-transform duration-[10000ms] ease-out ${
              i === current ? "scale-[1.05]" : "scale-[1.00]"
            }`}
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: overlayBase }} />
          <div className="absolute inset-0" style={{ background: overlaySide }} />
        </div>
      ))}

      {/* ── Hero Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-14 pb-24">

        {/* Studio Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          className="flex items-center gap-5 mb-16"
        >
          <div
            className={`h-px ${isLight ? "w-10 bg-cyan opacity-70" : "w-10"}`}
            style={isLight ? undefined : { background: "rgba(126,200,200,0.45)" }}
          />
          <span className={`text-[10px] font-semibold tracking-[0.55em] uppercase ${isLight ? "editorial-eyebrow" : "text-cyan opacity-80"}`}>
            Creative Design
          </span>
        </motion.div>

        {/* ── Main Tagline — Cormorant Garamond ── */}
        <div
          className="relative mb-12"
          style={{ minHeight: "clamp(100px, 18vw, 240px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="headline-display text-[clamp(64px,10vw,148px)] whitespace-pre-line text-text"
            >
              {slides[current].tagline}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Sub-label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex items-center gap-6 mb-14"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[11px] tracking-[0.32em] uppercase font-medium text-text-dim"
            >
              {slides[current].sub}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-7 text-text"
          >
            <span className="text-[10px] font-semibold tracking-[0.38em] uppercase">
              {t("Progetti Selezionati", "Selected Projects")}
            </span>
            <div className="h-px w-10 bg-cyan/50 group-hover:w-20 transition-all duration-700 ease-[0.22,1,0.36,1]" />
          </a>
        </motion.div>
      </div>

      {/* ── Slide Indicators — Bottom Left ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-8 lg:left-14 flex items-center gap-3"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleSlide(i)}
            className={`h-px transition-all duration-700 ${
              i === current
                ? "w-12 bg-cyan"
                : "w-4 bg-white/15 hover:bg-white/30"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
        <span className="ml-2 text-[9px] tracking-[0.40em] uppercase text-text-dim/60 tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </motion.div>

      {/* ── Scroll Indicator — Bottom Right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 right-8 lg:right-14 flex flex-col items-center gap-3"
      >
        <div
          className="w-px h-16 relative overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(126,200,200,0.30), transparent)",
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-cyan"
            style={{ animation: "slide-down 2.4s ease-in-out infinite" }}
          />
        </div>
        <span className="text-[9px] tracking-[0.4em] uppercase text-text-dim/50">
          {t("Scorri", "Scroll")}
        </span>
      </motion.div>
    </section>
  );
}
