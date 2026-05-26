"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import PremiumSocialIcons, { DOCK_SOCIAL_IDS } from "@/components/ui/PremiumSocialIcons";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SocialDock() {
  const { t } = useLanguage();
  const { mounted } = useTheme();
  const [dockVisible, setDockVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 80) {
        setDockVisible(false);
      } else if (delta > 6) {
        setDockVisible(false);
      } else if (delta < -6) {
        setDockVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.aside
      className="premium-dock"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: dockVisible ? 1 : 0,
        y: dockVisible ? 0 : 24,
        pointerEvents: dockVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.55, ease: EASE }}
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      aria-label={t("Contatti rapidi", "Quick contact")}
    >
      <div className="premium-dock__panel">
        <div className="premium-dock__hairline" aria-hidden />
        <PremiumSocialIcons
          ids={DOCK_SOCIAL_IDS}
          variant="dock"
          layout="horizontal"
          showLabels
          labelFor={t}
          ariaFor={t}
        />
      </div>
    </motion.aside>
  );
}
