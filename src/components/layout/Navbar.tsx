"use client";

import { useState, useEffect, useCallback, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const MOBILE_MENU_EASE = [0.22, 1, 0.36, 1] as const;

function ItalianFlag({ className = "w-full h-full object-cover" }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden>
      <path fill="#009246" d="M0 0h1v2H0z" />
      <path fill="#fff" d="M1 0h1v2H1z" />
      <path fill="#CE2B37" d="M2 0h1v2H2z" />
    </svg>
  );
}

function BritishFlag({ className = "w-full h-full object-cover" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden>
      <clipPath id="uk-flag-clip">
        <path d="M0 0v30h60v-30z" />
      </clipPath>
      <clipPath id="uk-flag-stripe">
        <path d="M30 15h30v15zv15h-30zh-30v-15zv-15h30z" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <path d="M0 0v30h60v-30z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30m0-30L0 30" clipPath="url(#uk-flag-stripe)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function ThemeIcon({ resolvedTheme }: { resolvedTheme: "dark" | "light" }) {
  return (
    <AnimatePresence mode="wait">
      {resolvedTheme === "dark" ? (
        <motion.svg
          key="moon"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      ) : (
        <motion.svg
          key="sun"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );
}

const mobileFocusRing =
  "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan/50 focus-visible:outline-offset-2";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuId = useId();
  const resolvedTheme = mounted ? theme : "dark";

  const handleLogoClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        event.preventDefault();
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [pathname]
  );

  const navLinks = [
    { label: t("Home", "Home"), href: "/#hero" },
    { label: t("Chi Siamo", "About"), href: "/#about" },
    { label: t("Servizi", "Services"), href: "/#services" },
    { label: t("Portfolio", "Portfolio"), href: "/#portfolio" },
    { label: t("Contatti", "Contact"), href: "/#contact" },
  ];

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => {
      hamburgerRef.current?.focus();
    });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((open) => !open);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobileMenu]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: MOBILE_MENU_EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-nav-bg backdrop-blur-xl border-b border-nav-border py-2 shadow-nav"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-14 flex items-center justify-between">
          {/* Logo — fades in on scroll */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className={`flex items-center group transition-all duration-700 ease-[0.22,1,0.36,1] ${
              scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Creative Design"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div
            className={`hidden md:flex items-center gap-9 transition-all duration-1000 ease-[0.22,1,0.36,1] ${
              !scrolled ? "w-full justify-center" : "ml-auto mr-8"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold text-nav-text-dim hover:text-cyan transition-colors uppercase tracking-[0.14em] nav-link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Utilities & CTA */}
          <div
            className={`hidden md:flex items-center gap-3.5 transition-all duration-1000 ${
              !scrolled ? "absolute right-8 lg:right-10" : ""
            }`}
          >
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-nav-border bg-nav-glass hover:bg-nav-border transition-all duration-300">
                <div className="w-[20px] h-[14px] rounded-[2px] overflow-hidden shadow-sm opacity-90">
                  {lang === "it" ? <ItalianFlag /> : <BritishFlag />}
                </div>
                <span className="text-xs font-bold text-nav-text uppercase tracking-widest">{lang}</span>
              </button>

              <div className="absolute top-full right-0 w-32 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="py-2 rounded-xl bg-nav-bg border border-nav-border backdrop-blur-xl shadow-nav flex flex-col">
                  <button
                    onClick={() => setLang("it")}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-medium hover:bg-nav-glass transition-colors ${lang === "it" ? "text-cyan" : "text-nav-text-dim hover:text-nav-text"}`}
                  >
                    <div className="w-[20px] h-[14px] rounded-[2px] overflow-hidden shadow-sm opacity-80 shrink-0">
                      <ItalianFlag />
                    </div>
                    <span className="uppercase tracking-wider font-bold text-[10px]">Italiano</span>
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-medium hover:bg-nav-glass transition-colors ${lang === "en" ? "text-cyan" : "text-nav-text-dim hover:text-nav-text"}`}
                  >
                    <div className="w-[20px] h-[14px] rounded-[2px] overflow-hidden shadow-sm opacity-80 shrink-0">
                      <BritishFlag />
                    </div>
                    <span className="uppercase tracking-wider font-bold text-[10px]">English</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-[38px] h-[38px] rounded-full border border-nav-border bg-nav-glass hover:bg-nav-border hover:border-cyan/25 text-nav-text-dim hover:text-cyan transition-all duration-300"
              aria-label="Toggle Theme"
            >
              <ThemeIcon resolvedTheme={resolvedTheme} />
            </button>

            {/* CTA Button — Restrained, no neon glow */}
            <Link
              href="/#contact"
              className="ml-0.5 premium-cta inline-flex items-center justify-center px-5 py-2 rounded-full border border-cyan/40 text-cyan font-semibold text-[10px] tracking-[0.18em] uppercase hover:bg-cyan hover:text-graphite transition-all duration-400"
            >
              {t("Inizia un Progetto", "Start a Project")}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={toggleMobileMenu}
            className={`md:hidden relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-transparent transition-colors duration-300 ${mobileFocusRing} ${
              !scrolled ? "absolute right-6" : ""
            } ${mobileOpen ? "border-nav-border bg-nav-glass" : ""}`}
            aria-label={
              mobileOpen
                ? t("Chiudi menu di navigazione", "Close navigation menu")
                : t("Apri menu di navigazione", "Open navigation menu")
            }
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
          >
            <span className="sr-only">
              {mobileOpen
                ? t("Chiudi menu di navigazione", "Close navigation menu")
                : t("Apri menu di navigazione", "Open navigation menu")}
            </span>
            <span className="relative flex h-4 w-6 flex-col items-center justify-center" aria-hidden>
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                className="absolute block h-[1.5px] w-6 bg-text origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="absolute block h-[1.5px] w-6 bg-text"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                className="absolute block h-[1.5px] w-6 bg-text origin-center"
              />
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu — md:hidden only */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={mobileMenuId}
            role="dialog"
            aria-modal="true"
            aria-label={t("Menu di navigazione", "Navigation menu")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: MOBILE_MENU_EASE }}
            className="fixed inset-0 z-40 flex md:hidden items-center justify-center bg-nav-bg/98 backdrop-blur-2xl px-8 py-24"
            onClick={closeMobileMenu}
          >
            <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 opacity-10">
              <Image
                src="/logo.png"
                alt=""
                width={120}
                height={120}
                className="h-28 w-28 object-contain opacity-[0.07]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.36, ease: MOBILE_MENU_EASE }}
              className="relative z-10 flex w-full max-w-sm flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <nav
                className="flex w-full max-w-sm flex-col items-center gap-2"
                aria-label={t("Navigazione principale", "Main navigation")}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      delay: 0.04 + index * 0.04,
                      duration: 0.34,
                      ease: MOBILE_MENU_EASE,
                    }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`flex min-h-11 w-full items-center justify-center px-4 text-2xl font-bold tracking-wider text-nav-text transition-colors duration-300 hover:text-cyan ${mobileFocusRing}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: 0.24, duration: 0.34, ease: MOBILE_MENU_EASE }}
                className="mt-8 flex w-full max-w-sm flex-col items-center gap-4"
              >
                <div
                  className="flex w-full items-center justify-center gap-3"
                  role="group"
                  aria-label={t("Lingua", "Language")}
                >
                  <button
                    type="button"
                    onClick={() => setLang("it")}
                    aria-pressed={lang === "it"}
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 rounded-full border px-4 transition-all duration-300 ${mobileFocusRing} ${
                      lang === "it"
                        ? "border-cyan/40 bg-nav-glass text-cyan"
                        : "border-nav-border bg-nav-glass text-nav-text-dim hover:text-nav-text"
                    }`}
                  >
                    <span className="h-[14px] w-[20px] overflow-hidden rounded-[2px] shadow-sm opacity-90">
                      <ItalianFlag />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">IT</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    aria-pressed={lang === "en"}
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 rounded-full border px-4 transition-all duration-300 ${mobileFocusRing} ${
                      lang === "en"
                        ? "border-cyan/40 bg-nav-glass text-cyan"
                        : "border-nav-border bg-nav-glass text-nav-text-dim hover:text-nav-text"
                    }`}
                  >
                    <span className="h-[14px] w-[20px] overflow-hidden rounded-[2px] shadow-sm opacity-90">
                      <BritishFlag />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">EN</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-nav-border bg-nav-glass text-nav-text-dim transition-all duration-300 hover:border-cyan/25 hover:text-cyan ${mobileFocusRing}`}
                  aria-label={t("Cambia tema", "Toggle theme")}
                >
                  <ThemeIcon resolvedTheme={resolvedTheme} />
                </button>

                <Link
                  href="/#contact"
                  onClick={closeMobileMenu}
                  className={`premium-cta inline-flex min-h-11 items-center justify-center rounded-full border border-cyan/40 px-10 text-sm font-bold uppercase tracking-[0.2em] text-cyan transition-all duration-400 hover:bg-cyan hover:text-graphite ${mobileFocusRing}`}
                >
                  {t("Inizia un Progetto", "Start a Project")}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
