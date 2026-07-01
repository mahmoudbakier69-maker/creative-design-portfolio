"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { useSectionReveal } from "@/lib/motion";

type MotionRevealElement = "div" | "section" | "nav" | "article" | "aside";

type MotionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  margin?: string;
  as?: MotionRevealElement;
} & Pick<
  ComponentPropsWithoutRef<"div">,
  "aria-label" | "aria-labelledby" | "id"
>;

const motionMap = {
  div: motion.div,
  section: motion.section,
  nav: motion.nav,
  article: motion.article,
  aside: motion.aside,
};

export default function MotionReveal({
  children,
  className,
  delay = 0,
  margin,
  as = "div",
  ...rest
}: MotionRevealProps) {
  const { ref, initial, animate, transition } = useSectionReveal(margin);
  const Component = motionMap[as];

  return (
    <Component
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={transition(delay)}
      {...rest}
    >
      {children}
    </Component>
  );
}
