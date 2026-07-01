"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useSectionReveal } from "@/lib/motion";

export default function ServicesSection() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const { ref: sectionRef, show, initial, animate, transition, staggerDelay } =
    useSectionReveal();

  const services = [
    {
      title: t("Progettazione Stand", "Stand Design"),
      description: t(
        "Progettazione di stand per fiere nazionali e internazionali. Layout, volumi, materiali e grafica coordinati, con render 3D e documentazione per l'organizzatore.",
        "Stand design for national and international trade shows. Layout, structure, materials and graphics coordinated, with 3D renders and documentation for organisers."
      ),
      tag: t("Layout · 3D · Fiere", "Layout · 3D · Trade Shows"),
    },
    {
      title: t("Costruzione Stand", "Stand Construction"),
      description: t(
        "Realizzazione in carpenteria leggera e rivestimenti tecnici. Produzione interna, finiture curate e controllo qualità prima della spedizione in fiera.",
        "Built in lightweight joinery and technical cladding. In-house production, finished surfaces and quality checks before shipping to the venue."
      ),
      tag: t("Carpenteria · Finiture · Interno", "Joinery · Finishes · In-House"),
    },
    {
      title: t("Ambienti Corporate", "Corporate Environments"),
      description: t(
        "Showroom aziendali e spazi espositivi permanenti per presentare prodotti, campionature e collezioni durante tutto l'anno.",
        "Corporate showrooms and permanent display spaces for presenting products, samples and collections year-round."
      ),
      tag: t("Showroom · Corporate · Permanente", "Showroom · Corporate · Permanent"),
    },
    {
      title: t("Spazi Espositivi", "Exhibition Spaces"),
      description: t(
        "Allestimenti per esporre prodotti con illuminazione dedicata, pedane, pannelli e arredi su misura per ogni settore.",
        "Display setups with dedicated lighting, platforms, panels and custom furniture suited to each product category."
      ),
      tag: t("Illuminazione · Pedane · Prodotti", "Lighting · Platforms · Products"),
    },
    {
      title: t("Allestimenti Evento", "Event Installations"),
      description: t(
        "Strutture per presentazioni, conferenze e lanci prodotto. Montaggio, gestione in sito e smontaggio a fine evento.",
        "Structures for presentations, conferences and product launches. On-site setup, support during the event and dismantling when finished."
      ),
      tag: t("Eventi · Montaggio · Temporaneo", "Events · Setup · Temporary"),
    },
    {
      title: t("Soluzioni Chiavi in Mano", "Turnkey Solutions"),
      description: t(
        "Progetto, produzione, logistica, trasporto e montaggio con un unico referente, nelle principali sedi fieristiche europee.",
        "Design, production, logistics, transport and assembly with a single point of contact at major European trade show venues."
      ),
      tag: t("Logistica · Montaggio · Europa", "Logistics · Assembly · Europe"),
    },
  ];

  return (
    <section
      id="services"
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
                {t("Servizi", "Services")}
              </span>
            </div>
            <h2 className="headline-display text-[clamp(52px,8vw,108px)] text-text">
              {t("Soluzioni", "Tailored")}
              <br />
              <span className="text-text-dim not-italic font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                {t("su Misura", "Solutions")}
              </span>
            </h2>
          </div>

          <p className={`leading-relaxed lg:text-right lg:pb-2 ${isLight ? "editorial-lead max-w-sm" : "text-sm max-w-xs text-text-dim"}`}>
            {t(
              "Progettazione e costruzione stand con produzione interna, dalla prima bozza al montaggio in fiera.",
              "Stand design and build with in-house production, from first draft to on-site assembly."
            )}
          </p>
        </motion.div>

        {/* ── Services List — Typographic ── */}
        <div
          className={`divide-y ${
            isLight ? "divide-[rgba(12,10,7,0.10)]" : "divide-[rgba(255,255,255,0.05)]"
          }`}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={initial}
              animate={show ? animate : { opacity: 0, y: 24 }}
              transition={transition(staggerDelay(i))}
              className={`motion-card-lift group flex items-start gap-8 lg:gap-20 py-10 lg:py-12 -mx-4 px-4 transition-colors duration-500 cursor-default ${
                isLight
                  ? "services-editorial-row"
                  : "hover:bg-[rgba(126,200,200,0.025)]"
              }`}
            >
              {/* Number */}
              <span
                className={`text-[10px] font-semibold tracking-[0.35em] tabular-nums pt-1.5 shrink-0 transition-colors duration-500 ${
                  isLight
                    ? "w-9 text-cyan group-hover:text-cyan-dim"
                    : "text-cyan/40 group-hover:text-cyan/70"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between lg:gap-12 mb-3.5">
                  <h3
                    className="text-2xl lg:text-[30px] tracking-tight transition-colors duration-400 group-hover:text-cyan"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                      fontWeight: isLight ? 400 : 300,
                      color: "var(--text)",
                      letterSpacing: isLight ? "-0.015em" : undefined,
                    }}
                  >
                    {service.title}
                  </h3>
                  <span
                    className={`mt-1.5 lg:mt-0 shrink-0 transition-colors duration-500 ${
                      isLight
                        ? "editorial-meta group-hover:text-cyan"
                        : "text-[10px] tracking-[0.25em] uppercase font-medium text-cyan/35 group-hover:text-cyan/60"
                    }`}
                  >
                    {service.tag}
                  </span>
                </div>
                <p className={`leading-relaxed max-w-2xl ${isLight ? "editorial-lead" : "text-sm lg:text-[13px] text-text-dim"}`}>
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <div className={`hidden lg:flex items-center pt-1.5 shrink-0 text-cyan transition-all duration-500 translate-x-[-6px] group-hover:translate-x-0 ${
                isLight ? "opacity-30 group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
