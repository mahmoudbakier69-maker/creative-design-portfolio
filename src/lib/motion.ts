"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
export const REVEAL_Y = 24;
export const REVEAL_DURATION = 0.85;
export const STAGGER_STEP = 0.08;
export const SECTION_MARGIN = "-100px";

const HIDDEN_REVEAL = { opacity: 0, y: REVEAL_Y };
const VISIBLE_REVEAL = { opacity: 1, y: 0 };

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
}

function revealAnimate(mounted: boolean, visible: boolean) {
  if (!mounted || !visible) {
    return HIDDEN_REVEAL;
  }

  return VISIBLE_REVEAL;
}

function revealTransition(mounted: boolean, reduced: boolean, delay = 0) {
  if (!mounted || reduced) {
    return { duration: 0 };
  }

  return { duration: REVEAL_DURATION, delay, ease: MOTION_EASE };
}

export function useSectionReveal(margin: string = SECTION_MARGIN) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: margin as `${number}px`,
  });
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const reducedMotion = Boolean(reduced);
  const visible = reducedMotion || isInView;
  const show = mounted && visible;

  return {
    ref,
    show,
    mounted,
    reduced: reducedMotion,
    initial: HIDDEN_REVEAL,
    animate: revealAnimate(mounted, visible),
    transition: (delay = 0) => revealTransition(mounted, reducedMotion, delay),
    staggerDelay: (index: number, base = 0) => base + index * STAGGER_STEP,
  };
}

/** Hero / above-the-fold reveal — animates on mount without scroll intersection. */
export function useMountReveal(delay = 0) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const reducedMotion = Boolean(reduced);

  return {
    initial: HIDDEN_REVEAL,
    animate: revealAnimate(mounted, mounted),
    transition: revealTransition(mounted, reducedMotion, delay),
  };
}
