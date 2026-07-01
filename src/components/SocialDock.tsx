"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import GlobeFabIcon from "@/components/ui/GlobeFabIcon";
import PremiumSocialIcons, {
  DOCK_SOCIAL_IDS,
  getSocialLinksByIds,
  MOBILE_DOCK_SOCIAL_IDS,
  PremiumSocialIconLink,
} from "@/components/ui/PremiumSocialIcons";

const EASE = [0.22, 1, 0.36, 1] as const;
const ARC_SPRING = { type: "spring" as const, stiffness: 400, damping: 36, mass: 0.84 };
const FAB_SPRING = { type: "spring" as const, stiffness: 360, damping: 34, mass: 0.9 };
const ARC_STAGGER_S = 0.07;
const FAB_SIZE = 52;
const CHILD_BASE = 40;
const VIEWPORT_MARGIN = 12;
const FAB_INSET = 24;
const ARC_START_DEG = 180;
const ARC_END_DEG = 90;
const ARC_COMPACT_FACTOR = 0.85;
const GLOBE_OPEN_DELAY_MS = 80;
const ARC_REVEAL_DELAY_MS = 140;
const MENU_CLOSE_DELAY_MS = 400;
const BACKDROP_TRANSITION_S = 0.34;

function useDockScrollVisibility() {
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

  return dockVisible;
}

function useMobileFabScrollVisibility(open: boolean) {
  const [scrollVisible, setScrollVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (open) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 80) {
        setScrollVisible(false);
      } else if (delta > 2) {
        setScrollVisible(false);
      } else if (delta < -2) {
        setScrollVisible(true);
      }

      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return scrollVisible;
}

function useFooterLift() {
  const [footerLift, setFooterLift] = useState(0);

  useEffect(() => {
    const updateLift = () => {
      const footer = document.querySelector(".site-footer");
      if (!footer) {
        setFooterLift(0);
        return;
      }

      const rect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top >= viewportHeight) {
        setFooterLift(0);
        return;
      }

      const clearance = 16;
      setFooterLift(Math.max(0, viewportHeight - rect.top + clearance));
    };

    updateLift();
    window.addEventListener("scroll", updateLift, { passive: true });
    window.addEventListener("resize", updateLift);
    return () => {
      window.removeEventListener("scroll", updateLift);
      window.removeEventListener("resize", updateLift);
    };
  }, []);

  return footerLift;
}

function getChildSize(index: number) {
  return CHILD_BASE - index;
}

function getOrbitRadius(viewportWidth: number) {
  const legacyExpansion = (viewportWidth <= 360 ? 175 : 200) - FAB_SIZE / 2;
  const compactExpansion = legacyExpansion * ARC_COMPACT_FACTOR;
  const targetOrbit = FAB_SIZE / 2 + compactExpansion;
  const fabCenterX = viewportWidth - FAB_INSET - FAB_SIZE / 2;
  const maxOrbit = fabCenterX - VIEWPORT_MARGIN - getChildSize(0) / 2;

  return Math.min(targetOrbit, maxOrbit);
}

function getArcOffset(
  index: number,
  total: number,
  orbitRadius: number,
  startDeg: number,
  endDeg: number
) {
  const t = total === 1 ? 0.5 : index / (total - 1);
  const angleDeg = startDeg + t * (endDeg - startDeg);
  const angleRad = (angleDeg * Math.PI) / 180;

  return {
    x: Math.cos(angleRad) * orbitRadius,
    y: -Math.sin(angleRad) * orbitRadius,
  };
}

function getFabEdgeOffset(offset: { x: number; y: number }, orbitRadius: number) {
  const edgeRadius = FAB_SIZE / 2;
  const scale = edgeRadius / orbitRadius;

  return {
    x: offset.x * scale,
    y: offset.y * scale,
  };
}

function SocialDockDesktop() {
  const { t } = useLanguage();
  const dockVisible = useDockScrollVisibility();

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

function SocialDockMobile() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [arcVisible, setArcVisible] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(375);
  const [rippleKey, setRippleKey] = useState(0);
  const [idlePulse, setIdlePulse] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const arcTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const arcId = useId();
  const socialItems = useMemo(() => getSocialLinksByIds(MOBILE_DOCK_SOCIAL_IDS), []);
  const scrollVisible = useMobileFabScrollVisibility(open);
  const footerLift = useFooterLift();
  const showFab = open || scrollVisible;

  const orbitRadius = useMemo(() => getOrbitRadius(viewportWidth), [viewportWidth]);

  const clearMenuTimers = useCallback(() => {
    if (menuTimerRef.current) {
      clearTimeout(menuTimerRef.current);
      menuTimerRef.current = null;
    }
    if (arcTimerRef.current) {
      clearTimeout(arcTimerRef.current);
      arcTimerRef.current = null;
    }
  }, []);

  const closeArc = useCallback(() => {
    clearMenuTimers();
    setArcVisible(false);
    menuTimerRef.current = setTimeout(() => {
      setOpen(false);
      requestAnimationFrame(() => {
        fabRef.current?.focus();
      });
    }, MENU_CLOSE_DELAY_MS);
  }, [clearMenuTimers]);

  const openArc = useCallback(() => {
    clearMenuTimers();
    setRippleKey((key) => key + 1);
    setIdlePulse(false);
    setArcVisible(false);
    setOpen(false);

    menuTimerRef.current = setTimeout(() => {
      setOpen(true);
      arcTimerRef.current = setTimeout(() => {
        setArcVisible(true);
      }, ARC_REVEAL_DELAY_MS);
    }, GLOBE_OPEN_DELAY_MS);
  }, [clearMenuTimers]);

  const toggleArc = useCallback(() => {
    if (open || arcVisible) {
      closeArc();
      return;
    }
    openArc();
  }, [arcVisible, closeArc, open, openArc]);

  useEffect(() => {
    return () => {
      clearMenuTimers();
    };
  }, [clearMenuTimers]);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeArc();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeArc]);

  useEffect(() => {
    if (open || !showFab) {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      return;
    }

    const scheduleIdle = () => {
      const delay = 8000 + Math.random() * 2000;
      idleTimerRef.current = setTimeout(() => {
        setIdlePulse(true);
        idleTimerRef.current = setTimeout(() => {
          setIdlePulse(false);
          scheduleIdle();
        }, 1400);
      }, delay);
    };

    scheduleIdle();

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };
  }, [open, showFab]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: BACKDROP_TRANSITION_S, ease: EASE }}
            className="premium-dock-mobile__backdrop"
            aria-label={t("Chiudi contatti rapidi", "Close quick contact")}
            onClick={closeArc}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="premium-dock-mobile"
        animate={{
          opacity: showFab ? 1 : 0,
          y: showFab ? 0 : 18,
          scale: showFab ? 1 : 0.94,
          pointerEvents: showFab ? "auto" : "none",
        }}
        transition={{ duration: 0.52, ease: EASE }}
        style={{
          bottom: `calc(max(${FAB_INSET}px, env(safe-area-inset-bottom)) + ${footerLift}px)`,
          right: `max(${FAB_INSET}px, env(safe-area-inset-right))`,
        }}
      >
        <div className="premium-dock-mobile__stage">
          <div
            id={arcId}
            className="premium-dock-mobile__arc"
            role="list"
            aria-label={t("Contatti rapidi", "Quick contact")}
          >
            <AnimatePresence>
              {arcVisible &&
                socialItems.map((item, index) => {
                  const offset = getArcOffset(
                    index,
                    socialItems.length,
                    orbitRadius,
                    ARC_START_DEG,
                    ARC_END_DEG
                  );
                  const edgeOffset = getFabEdgeOffset(offset, orbitRadius);
                  const childSize = getChildSize(index);

                  return (
                    <motion.div
                      key={item.id}
                      className="premium-dock-mobile__arc-slot"
                      style={{ willChange: "transform, opacity" }}
                      initial={{
                        opacity: 0,
                        scale: 0.56,
                        x: edgeOffset.x,
                        y: edgeOffset.y,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: offset.x,
                        y: offset.y,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.56,
                        x: edgeOffset.x,
                        y: edgeOffset.y,
                        transition: {
                          ...ARC_SPRING,
                          delay: (socialItems.length - 1 - index) * ARC_STAGGER_S,
                        },
                      }}
                      transition={{
                        ...ARC_SPRING,
                        delay: index * ARC_STAGGER_S,
                      }}
                    >
                      <PremiumSocialIconLink
                        item={item}
                        ariaLabel={t(item.ariaIt, item.ariaEn)}
                        onLinkClick={closeArc}
                        className="premium-dock-mobile__arc-link"
                        style={{ width: childSize, height: childSize }}
                        mobileTapFeedback
                      />
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>

          <motion.button
            ref={fabRef}
            type="button"
            className="premium-dock-mobile__fab"
            aria-label={
              open
                ? t("Chiudi contatti rapidi", "Close quick contact")
                : t("Apri contatti rapidi", "Open quick contact")
            }
            aria-expanded={open}
            aria-controls={arcId}
            onClick={toggleArc}
            animate={{
              scale: idlePulse && !open ? [1, 1.03, 1] : 1,
            }}
            transition={
              idlePulse && !open
                ? { duration: 1.35, ease: EASE }
                : FAB_SPRING
            }
            whileTap={{ scale: 0.96 }}
          >
            <AnimatePresence>
              {rippleKey > 0 && !open && (
                <motion.span
                  key={rippleKey}
                  className="premium-dock-mobile__ripple"
                  initial={{ opacity: 0.12, scale: 0.88 }}
                  animate={{ opacity: 0, scale: 1.22 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.48, ease: EASE }}
                  aria-hidden
                />
              )}
            </AnimatePresence>
            <span className="premium-dock-mobile__fab-icon" aria-hidden>
              <motion.span
                className="premium-dock-mobile__fab-symbol premium-dock-mobile__fab-symbol--globe"
                animate={{
                  opacity: open ? 0 : 1,
                  rotate: open ? 90 : 0,
                  scale: open ? 0.62 : 1,
                }}
                transition={FAB_SPRING}
              >
                <GlobeFabIcon className="premium-dock-mobile__fab-glyph" />
              </motion.span>
              <motion.span
                className="premium-dock-mobile__fab-symbol premium-dock-mobile__fab-symbol--close"
                animate={{
                  opacity: open ? 1 : 0,
                  rotate: open ? 0 : -90,
                  scale: open ? 1 : 0.62,
                }}
                transition={FAB_SPRING}
              >
                <X strokeWidth={1.5} className="premium-dock-mobile__fab-glyph" />
              </motion.span>
            </span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

export default function SocialDock() {
  const { mounted } = useTheme();

  if (!mounted) return null;

  return (
    <>
      <SocialDockDesktop />
      <SocialDockMobile />
    </>
  );
}
