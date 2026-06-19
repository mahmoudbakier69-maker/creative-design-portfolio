import { HERO_LOGO_VIDEO } from "@/lib/hero-media";

interface HeroLogoVideoProps {
  className?: string;
}

export default function HeroLogoVideo({ className }: HeroLogoVideoProps) {
  return (
    <div className={className}>
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
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
