"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Guard: stabilise theme-driven rendering until after hydration
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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
                  {lang === "it" ? (
                    <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
                      <path fill="#009246" d="M0 0h1v2H0z"/>
                      <path fill="#fff" d="M1 0h1v2H1z"/>
                      <path fill="#CE2B37" d="M2 0h1v2H2z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
                      <clipPath id="s-flag-btn"><path d="M0 0v30h60v-30z"/></clipPath>
                      <clipPath id="t-flag-btn"><path d="M30 15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath>
                      <g clipPath="url(#s-flag-btn)">
                        <path d="M0 0v30h60v-30z" fill="#012169"/>
                        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
                        <path d="M0 0l60 30m0-30L0 30" clipPath="url(#t-flag-btn)" stroke="#C8102E" strokeWidth="4"/>
                        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
                      </g>
                    </svg>
                  )}
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
                      <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
                        <path fill="#009246" d="M0 0h1v2H0z"/>
                        <path fill="#fff" d="M1 0h1v2H1z"/>
                        <path fill="#CE2B37" d="M2 0h1v2H2z"/>
                      </svg>
                    </div>
                    <span className="uppercase tracking-wider font-bold text-[10px]">Italiano</span>
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-medium hover:bg-nav-glass transition-colors ${lang === "en" ? "text-cyan" : "text-nav-text-dim hover:text-nav-text"}`}
                  >
                    <div className="w-[20px] h-[14px] rounded-[2px] overflow-hidden shadow-sm opacity-80 shrink-0">
                      <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
                        <clipPath id="s2-flag"><path d="M0 0v30h60v-30z"/></clipPath>
                        <clipPath id="t2-flag"><path d="M30 15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath>
                        <g clipPath="url(#s2-flag)">
                          <path d="M0 0v30h60v-30z" fill="#012169"/>
                          <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
                          <path d="M0 0l60 30m0-30L0 30" clipPath="url(#t2-flag)" stroke="#C8102E" strokeWidth="4"/>
                          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
                        </g>
                      </svg>
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
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
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
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            {/* CTA Button — Restrained, no neon glow */}
            <Link
              href="/#contact"
              className="ml-0.5 inline-flex items-center justify-center px-5 py-2 rounded-full border border-cyan/40 text-cyan font-semibold text-[10px] tracking-[0.18em] uppercase hover:bg-cyan hover:text-graphite transition-all duration-400"
            >
              {t("Preventivo", "Get Quote")}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-60 ${
              !scrolled ? "absolute right-6" : ""
            }`}
            aria-label="Menu di navigazione"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-text origin-center transition-colors"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[1.5px] bg-text"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-text origin-center transition-colors"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-nav-bg backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
              <Image src="/logo.png" alt="" width={120} height={120} className="h-28 w-28 object-contain opacity-[0.07]" />
            </div>

            <nav className="flex flex-col items-center gap-10 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-bold tracking-wider text-nav-text hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 inline-block px-10 py-3 border border-cyan/40 text-cyan text-sm font-bold uppercase tracking-[0.2em] hover:bg-cyan hover:text-graphite transition-all duration-400"
                >
                  {t("Contattaci", "Contact Us")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
