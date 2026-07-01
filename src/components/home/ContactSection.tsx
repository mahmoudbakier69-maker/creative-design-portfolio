"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { CONTACT } from "@/lib/contact";
import { useSectionReveal } from "@/lib/motion";
import ContactForm from "@/components/home/ContactForm";

export default function ContactSection() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const { ref: sectionRef, initial, animate, transition } = useSectionReveal();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact-section relative section-padding overflow-hidden ${isLight ? "contact-section--light" : ""}`}
    >
      <div className="contact-section__atmosphere" aria-hidden />
      <div className="gradient-line relative z-[1]" />

      <div className="max-w-7xl mx-auto px-8 lg:px-14 pt-20 lg:pt-28 relative z-[1]">
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition()}
          className="mb-14 lg:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="editorial-eyebrow-rule" />
            <span className="editorial-eyebrow">{t("Contatti", "Contact")}</span>
          </div>
          <h2
            className="contact-section__headline leading-[0.92] max-w-4xl text-text"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(48px, 7vw, 108px)",
              fontWeight: isLight ? 400 : 300,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
            }}
          >
            {t("Parliamo del", "Let's Talk About")}
            <br />
            <span className="not-italic text-text-dim">
              {t("Vostro Progetto", "Your Project")}
            </span>
          </h2>
          <p className="contact-section__lead mt-8 max-w-xl">
            {t(
              "Raccontateci la vostra visione. Il nostro team risponderà con cura e precisione.",
              "Share your vision. Our team will respond with care and precision."
            )}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition(0.12)}
            className="lg:col-span-7 xl:col-span-8"
          >
            <ContactForm />
          </motion.div>

          <motion.aside
            initial={initial}
            animate={animate}
            transition={transition(0.22)}
            className="lg:col-span-5 xl:col-span-4 motion-card-lift"
          >
            <div className="contact-aside">
              <div className="contact-aside__hairline" aria-hidden />
              <p className="contact-aside__eyebrow">{t("Contatti Diretti", "Direct Contact")}</p>

              <div className="contact-aside__block">
                <span className="contact-aside__label">{t("Email", "Email")}</span>
                <a href={`mailto:${CONTACT.email}`} className="contact-aside__value">
                  {CONTACT.email}
                </a>
              </div>

              <div className="contact-aside__block">
                <span className="contact-aside__label">{t("Telefono", "Phone")}</span>
                <a href={`tel:${CONTACT.phone}`} className="contact-aside__value">
                  {CONTACT.phoneDisplay}
                </a>
              </div>

              <div className="contact-aside__block">
                <span className="contact-aside__label">{t("Sede", "Studio")}</span>
                <a
                  href={CONTACT.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-aside__value"
                >
                  {t("Apri su Google Maps", "Open on Google Maps")}
                </a>
              </div>

              <p className="contact-aside__note">
                {t(
                  "Progettiamo stand fieristici e ambienti espositivi in tutta Europa.",
                  "We design exhibition stands and spatial environments across Europe."
                )}
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
