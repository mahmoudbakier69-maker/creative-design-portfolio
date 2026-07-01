"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HeroLogoVideo from "@/components/home/HeroLogoVideo";
import { MOTION_EASE } from "@/lib/motion";

export default function HeroSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduced
        ? { duration: 0 }
        : { duration: 1, ease: MOTION_EASE, delay: 1.85 },
    },
  };

  return (    <section id="hero" className="relative h-[100svh] w-full overflow-hidden">
      {/* Video layer — no overlays */}
      <HeroLogoVideo className="absolute inset-0 z-0 h-full w-full" />

      {/* Content layer */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className="pointer-events-auto absolute bottom-6 right-6 flex flex-col items-center gap-2 sm:bottom-8 sm:right-8 lg:right-12"
        >          <div
            className="relative h-10 w-px overflow-hidden sm:h-12"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(126,200,200,0.4), transparent)",
            }}
          >
            <div
              className="absolute left-0 top-0 h-1/2 w-full bg-cyan motion-reduce:animate-none"
              style={{ animation: "slide-down 2.4s ease-in-out infinite" }}
            />
          </div>
          <span className="text-[7px] uppercase tracking-[0.36em] text-[#9ECACA]/60 sm:text-[8px]">
            {t("Scorri", "Scroll")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
