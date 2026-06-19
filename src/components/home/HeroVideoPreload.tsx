import { HERO_LOGO_VIDEO, HERO_LOGO_VIDEO_TYPE } from "@/lib/hero-media";

/** High-priority preload for the homepage hero logo animation (hoisted to document head). */
export default function HeroVideoPreload() {
  return (
    <link
      rel="preload"
      href={HERO_LOGO_VIDEO}
      as="video"
      type={HERO_LOGO_VIDEO_TYPE}
      fetchPriority="high"
    />
  );
}
