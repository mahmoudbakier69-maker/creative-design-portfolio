"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function ServicesSection() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      title: t("Progettazione Stand", "Stand Design"),
      description: t(
        "Concept architettonici pensati per fiere internazionali e trade show. Ogni stand nasce da un'identità spaziale forte, che comunica il brand attraverso geometrie, luce e materiali.",
        "Architectural concepts designed for international trade shows. Every stand is built from a strong spatial identity that communicates the brand through geometry, light and materials."
      ),
      tag: t("Concept · Trade Show · Brand", "Concept · Trade Show · Brand"),
    },
    {
      title: t("Costruzione Stand", "Stand Construction"),
      description: t(
        "Realizzazione con materiali tecnici e finiture premium. La produzione interna garantisce controllo totale su qualità, tempi e puntualità in ogni appuntamento fieristico.",
        "Construction with technical materials and premium finishes. In-house production guarantees total control over quality, timing and punctuality at every trade show."
      ),
      tag: t("Produzione Interna · Premium", "In-House · Premium"),
    },
    {
      title: t("Ambienti Corporate", "Corporate Environments"),
      description: t(
        "Installazioni permanenti per uffici direzionali, flagship showroom e spazi di brand experience. Architettura d'interni che costruisce identità e trasmette la cultura aziendale.",
        "Permanent installations for executive offices, flagship showrooms and brand experience spaces. Interior architecture that builds identity and communicates company culture."
      ),
      tag: t("Corporate · Showroom · Installazioni", "Corporate · Showroom · Installations"),
    },
    {
      title: t("Spazi Espositivi", "Exhibition Spaces"),
      description: t(
        "Ambienti che trasformano la presentazione del prodotto in un'esperienza immersiva. Illuminazione architettonica, materiali tecnici e percorsi spaziali studiati per ogni progetto.",
        "Environments that transform product presentation into an immersive experience. Architectural lighting, technical materials and spatial pathways designed for each project."
      ),
      tag: t("Illuminazione · Materiali · Spazio", "Lighting · Materials · Space"),
    },
    {
      title: t("Allestimenti Evento", "Event Architecture"),
      description: t(
        "Strutture temporanee per lanci di prodotto, eventi corporate e conferenze internazionali. Installazioni scenografiche ad alto impatto visivo con montaggio e smontaggio integrati.",
        "Temporary structures for product launches, corporate events and international conferences. High visual-impact scenographic installations with integrated assembly and dismantling."
      ),
      tag: t("Corporate · Launch · Conference", "Corporate · Launch · Conference"),
    },
    {
      title: t("Soluzioni Chiavi in Mano", "Turnkey Solutions"),
      description: t(
        "Un unico interlocutore dal concept alla consegna. Gestione completa di progettazione, produzione, logistica, trasporto, montaggio e smontaggio in ogni sede fieristica europea.",
        "A single point of contact from concept to delivery. Complete management of design, production, logistics, transport, assembly and dismantling at every European trade show venue."
      ),
      tag: t("Europa · Logistica · Full Service", "Europe · Logistics · Full Service"),
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
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
              "Qualità e cura del dettaglio dalla visione alla consegna. Made in Italy, distribuito in Europa.",
              "Quality and attention to detail from vision to delivery. Made in Italy, delivered across Europe."
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
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
              className={`group flex items-start gap-8 lg:gap-20 py-10 lg:py-12 -mx-4 px-4 transition-colors duration-500 cursor-default ${
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
