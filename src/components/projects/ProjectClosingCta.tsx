"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSectionReveal } from "@/lib/motion";
import styles from "./ProjectDetail.module.css";

export default function ProjectClosingCta() {
  const { t } = useLanguage();
  const { ref: sectionRef, initial, animate, transition } = useSectionReveal();

  return (
    <section
      ref={sectionRef}
      className={styles.projectCta}
      aria-labelledby="project-closing-cta"
    >
      <motion.div
        className={`${styles.projectCtaInner} motion-card-lift`}
        initial={initial}
        animate={animate}
        transition={transition()}
      >
        <div className={styles.projectCtaEyebrow}>
          <div className="editorial-eyebrow-rule" aria-hidden />
          <span className="editorial-eyebrow">
            {t("Prossimo Progetto", "Next Project")}
          </span>
        </div>

        <h2 id="project-closing-cta" className={styles.projectCtaTitle}>
          {t(
            "Realizziamo il vostro prossimo stand.",
            "Let's build your next exhibition stand."
          )}
        </h2>

        <p className={styles.projectCtaLead}>
          {t(
            "Dal concept alla realizzazione, progettiamo e realizziamo stand fieristici su misura per aziende che vogliono distinguersi nelle fiere internazionali.",
            "From concept to installation, we design and build bespoke exhibition stands for companies exhibiting across Europe."
          )}
        </p>

        <Link href="/#contact" className={`${styles.projectCtaButton} premium-cta`}>
          {t("Inizia il Tuo Progetto", "Start Your Project")}
        </Link>
      </motion.div>
    </section>
  );
}
