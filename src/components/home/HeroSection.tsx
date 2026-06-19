"use client";

import { motion, type Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import HeroLogoVideo from "@/components/home/HeroLogoVideo";

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden">
      {/* Video layer — no overlays */}
      <HeroLogoVideo className="absolute inset-0 z-0 h-full w-full" />

      {/* Content layer */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.85 }}
          className="pointer-events-auto absolute bottom-6 right-6 flex flex-col items-center gap-2 sm:bottom-8 sm:right-8 lg:right-12"
        >
          <div
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
