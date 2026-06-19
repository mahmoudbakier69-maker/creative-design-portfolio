"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { label: t("Home", "Home"), href: "/#hero" },
    { label: t("Chi Siamo", "About"), href: "/#about" },
    { label: t("Servizi", "Services"), href: "/#services" },
    { label: t("Portfolio", "Portfolio"), href: "/#portfolio" },
    { label: t("Contatti", "Contact"), href: "/#contact" },
  ];

  return (
    <footer className={`site-footer ${isLight ? "site-footer--light" : ""}`}>
      <div className="site-footer__atmosphere" aria-hidden />

      <div className="max-w-7xl mx-auto px-8 lg:px-14 relative z-[1]">
        <div className="site-footer__grid pt-20 lg:pt-24 pb-14 lg:pb-16">
          <div className="site-footer__brand">
            <Image
              src="/logo.png"
              alt="Creative Design"
              width={88}
              height={88}
              className="site-footer__logo"
              sizes="88px"
            />
            <p className="site-footer__statement">
              {t(
                "Spazi che raccontano brand attraverso architettura, luce e materia.",
                "Spaces that communicate brands through architecture, light and matter."
              )}
            </p>
            <p className="site-footer__meta">
              {t(
                "Studio italiano di progettazione fieristica dal 1994.",
                "Italian exhibition design studio since 1994."
              )}
            </p>
          </div>

          <nav className="site-footer__nav" aria-label={t("Navigazione", "Navigation")}>
            <h4 className="site-footer__column-title">
              {t("Navigazione", "Navigation")}
            </h4>
            <ul className="site-footer__nav-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bar">
          <p className="site-footer__copyright">
            © {currentYear ?? ""} Creative Design S.r.l. —{" "}
            {t("Tutti i diritti riservati", "All rights reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
