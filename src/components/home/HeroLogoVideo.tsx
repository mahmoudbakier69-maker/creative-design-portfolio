import { HERO_LOGO_VIDEO } from "@/lib/hero-media";
import styles from "./HeroLogoVideo.module.css";

interface HeroLogoVideoProps {
  className?: string;
}

export default function HeroLogoVideo({ className }: HeroLogoVideoProps) {
  return (
    <div className={className}>
      <video
        className={styles.video}
        src={HERO_LOGO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
    </div>
  );
}
