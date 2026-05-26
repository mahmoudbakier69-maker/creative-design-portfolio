"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function ProcessSection() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      title: t("Briefing", "Briefing"),
      description: t(
        "Ascoltiamo le vostre esigenze, analizziamo il brand e definiamo insieme gli obiettivi del progetto.",
        "We listen to your needs, analyze the brand, and define the project objectives together."
      ),
    },
    {
      number: "02",
      title: t("Concept", "Concept"),
      description: t(
        "Il nostro team sviluppa proposte progettuali uniche, in linea con la vostra identità aziendale.",
        "Our team develops unique design proposals, aligned with your corporate identity."
      ),
    },
    {
      number: "03",
      title: t("Render 3D", "3D Render"),
      description: t(
        "Visualizzazione fotorealistica per un'anteprima immersiva prima della produzione.",
        "Photorealistic visualization for an immersive preview before production begins."
      ),
    },
    {
      number: "04",
      title: t("Produzione", "Production"),
      description: t(
        "Realizzazione nei nostri laboratori con materiali premium e controllo qualità in ogni fase.",
        "Manufacturing in our workshops with premium materials and quality control at every stage."
      ),
    },
    {
      number: "05",
      title: t("Installazione", "Installation"),
      description: t(
        "Montaggio professionale on-site con il nostro team dedicato, ovunque in Europa.",
        "Professional on-site assembly with our dedicated team, anywhere in Europe."
      ),
    },
    {
      number: "06",
      title: t("Consegna", "Delivery"),
      description: t(
        "Assistenza durante l'evento e smontaggio al termine, con gestione logistica integrata.",
        "Assistance during the event and dismantling at the end, with integrated logistics management."
      ),
    },
  ];

  const borderColor = isLight ? "rgba(12,10,7,0.12)" : "rgba(255,255,255,0.05)";

  return (
    <section
      ref={sectionRef}
      className="relative section-padding"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-14">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-24 lg:mb-32"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="editorial-eyebrow-rule" />
              <span className="editorial-eyebrow">
                {t("Il Processo", "Our Process")}
              </span>
            </div>
            <h2 className="headline-display text-[clamp(52px,8vw,108px)] text-text">
              {t("Dal Concept", "From Concept")}
              <br />
              <span className="text-text-dim not-italic font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                {t("alla Realtà", "to Reality")}
              </span>
            </h2>
          </div>

          <p className={`leading-relaxed lg:text-right lg:pb-2 ${isLight ? "editorial-lead max-w-sm" : "text-sm max-w-xs text-text-dim"}`}>
            {t(
              "Un metodo collaudato che garantisce risultati eccellenti dalla prima idea alla consegna finale.",
              "A proven method that guarantees excellent results from the initial idea to final delivery."
            )}
          </p>
        </motion.div>

        {/* ── Steps — 3×2 Grid with Hairlines ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.10 * i, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderColor }}
              className={`group relative pt-10 pb-14 transition-colors duration-500 ${
                i % 3 !== 2 ? "lg:border-r lg:pr-10" : ""
              } ${
                i % 3 !== 0 ? "lg:pl-10" : ""
              } ${
                i < 3 ? "border-b" : ""
              } ${
                i < steps.length - 1 ? "max-lg:border-b" : ""
              }`}
            >
              {/* Hover accent line */}
              <div
                className="absolute top-0 left-0 h-px w-0 bg-cyan group-hover:w-12 transition-all duration-600"
              />

              {/* Large Number — Cormorant */}
              <div
                className={`mb-7 select-none leading-none transition-colors duration-500 ${
                  isLight
                    ? "text-[rgba(12,10,7,0.14)] group-hover:text-[rgba(20,84,84,0.32)]"
                    : "text-text-dim/[0.07] group-hover:text-cyan/[0.15]"
                }`}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(72px, 8vw, 108px)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                }}
              >
                {step.number}
              </div>

              {/* Title — Cormorant */}
              <h3
                className="text-[22px] lg:text-[26px] font-light mb-4 transition-colors duration-400 group-hover:text-cyan"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontWeight: isLight ? 400 : 300,
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                }}
              >
                {step.title}
              </h3>

              <p className={`leading-relaxed max-w-[22ch] ${isLight ? "editorial-body" : "text-[13px] text-text-dim"}`}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
