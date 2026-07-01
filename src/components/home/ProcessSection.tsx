"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useSectionReveal } from "@/lib/motion";

export default function ProcessSection() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const { ref: sectionRef, show, initial, animate, transition, staggerDelay } =
    useSectionReveal();

  const steps = [
    {
      number: "01",
      title: t("Discover", "Discover"),
      description: t(
        "Brief, planimetria della fiera e requisiti dello stand definiti insieme.",
        "Brief, fair floor plan, and stand requirements defined together."
      ),
    },
    {
      number: "02",
      title: t("Design", "Design"),
      description: t(
        "Layout, render 3D e disegni tecnici pronti per approvazione e produzione.",
        "Layout, 3D renders, and technical drawings prepared for approval and production."
      ),
    },
    {
      number: "03",
      title: t("Build", "Build"),
      description: t(
        "Elementi prodotti e finiti in laboratorio prima della spedizione in fiera.",
        "Components built and finished in our workshop before shipping to the venue."
      ),
    },
    {
      number: "04",
      title: t("Deliver", "Deliver"),
      description: t(
        "Montaggio in sede, assistenza durante la fiera e smontaggio a fine evento.",
        "On-site assembly, support during the fair, and dismantling when the event closes."
      ),
    },
  ];

  const lineColor = isLight ? "rgba(12,10,7,0.12)" : "rgba(255,255,255,0.08)";

  return (
    <section
      ref={sectionRef}
      className="relative section-padding"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-14">

        {/* ── Section Header ── */}
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition()}
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
              "Quattro fasi dal primo incontro al montaggio in fiera.",
              "Four stages from first conversation to the fair floor."
            )}
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          <div
            className="hidden lg:block absolute top-[11px] left-0 right-0 h-px"
            style={{ background: lineColor }}
            aria-hidden
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={initial}
                animate={show ? animate : { opacity: 0, y: 24 }}
                transition={transition(staggerDelay(i))}
                className="motion-card-lift group relative list-none"
              >
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <span
                    className={`text-[10px] font-semibold tracking-[0.35em] tabular-nums shrink-0 transition-colors duration-500 ${
                      isLight
                        ? "text-cyan group-hover:text-cyan-dim"
                        : "text-cyan/50 group-hover:text-cyan/80"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className="hidden lg:block flex-1 h-px transition-colors duration-500 group-hover:bg-cyan/30"
                    style={{ background: lineColor }}
                    aria-hidden
                  />
                </div>

                <h3
                  className="text-[22px] lg:text-[26px] font-light mb-3 transition-colors duration-400 group-hover:text-cyan"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontWeight: isLight ? 400 : 300,
                    letterSpacing: "-0.01em",
                    color: "var(--text)",
                  }}
                >
                  {step.title}
                </h3>

                <p className={`leading-relaxed max-w-[28ch] ${isLight ? "editorial-body" : "text-[13px] text-text-dim"}`}>
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
