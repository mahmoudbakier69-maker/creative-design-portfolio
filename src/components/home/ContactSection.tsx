"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { CONTACT } from "@/lib/contact";

export default function ContactSection() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

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
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <div className="contact-form__shell">
              <form onSubmit={handleSubmit} className="contact-form">
              <div className="grid sm:grid-cols-2 gap-x-8">
                <div className="contact-form__field">
                  <label htmlFor="contact-name" className="contact-form__label">
                    {t("Nome *", "Name *")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="contact-form__input"
                    placeholder={t("Il vostro nome", "Your name")}
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="contact-email" className="contact-form__label">
                    {t("Email *", "Email *")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="contact-form__input"
                    placeholder="email@company.com"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8">
                <div className="contact-form__field">
                  <label htmlFor="contact-phone" className="contact-form__label">
                    {t("Telefono", "Phone")}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    className="contact-form__input"
                    placeholder={CONTACT.phoneDisplay}
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="contact-company" className="contact-form__label">
                    {t("Azienda", "Company")}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    className="contact-form__input"
                    placeholder={t("Nome azienda", "Company name")}
                  />
                </div>
              </div>
              <div className="contact-form__field">
                <label htmlFor="contact-message" className="contact-form__label">
                  {t("Messaggio *", "Message *")}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  className="contact-form__input contact-form__textarea"
                  placeholder={t("Raccontateci il vostro progetto…", "Tell us about your project…")}
                />
              </div>

              <button
                type="submit"
                className={`contact-submit ${submitted ? "contact-submit--sent" : ""}`}
              >
                <span className="contact-submit__frame" aria-hidden />
                <span className="contact-submit__inner">
                  <span className="contact-submit__text">
                    {submitted
                      ? t("Messaggio Inviato", "Message Sent")
                      : t("Invia Messaggio", "Send Message")}
                  </span>
                  <span className="contact-submit__track" aria-hidden>
                    <span className="contact-submit__fill" />
                  </span>
                </span>
              </button>
              </form>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 xl:col-span-4"
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
