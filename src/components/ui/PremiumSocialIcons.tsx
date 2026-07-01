"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  SiInstagram,
  SiFacebook,
  SiGooglemaps,
  SiGmail,
  SiWhatsapp,
} from "react-icons/si";
import { Phone } from "lucide-react";
import type { IconType } from "react-icons";
import { CONTACT } from "@/lib/contact";

export type SocialBrandId =
  | "instagram"
  | "facebook"
  | "maps"
  | "email"
  | "phone"
  | "whatsapp";

export interface SocialLinkItem {
  id: SocialBrandId;
  href: string;
  icon: IconType;
  external?: boolean;
  ariaIt: string;
  ariaEn: string;
  labelIt: string;
  labelEn: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "instagram",
    href: CONTACT.instagram,
    icon: SiInstagram,
    external: true,
    labelIt: "Instagram",
    labelEn: "Instagram",
    ariaIt: "Visita Creative Design su Instagram",
    ariaEn: "Visit Creative Design on Instagram",
  },
  {
    id: "facebook",
    href: CONTACT.facebook,
    icon: SiFacebook,
    external: true,
    labelIt: "Facebook",
    labelEn: "Facebook",
    ariaIt: "Visita Creative Design su Facebook",
    ariaEn: "Visit Creative Design on Facebook",
  },
  {
    id: "maps",
    href: CONTACT.maps,
    icon: SiGooglemaps,
    external: true,
    labelIt: "Maps",
    labelEn: "Maps",
    ariaIt: "Apri la sede su Google Maps",
    ariaEn: "Open studio on Google Maps",
  },
  {
    id: "email",
    href: `mailto:${CONTACT.email}`,
    icon: SiGmail,
    labelIt: "Email",
    labelEn: "Email",
    ariaIt: `Invia email a ${CONTACT.email}`,
    ariaEn: `Send email to ${CONTACT.email}`,
  },
  {
    id: "phone",
    href: `tel:${CONTACT.phone}`,
    icon: Phone as IconType,
    labelIt: "Telefono",
    labelEn: "Phone",
    ariaIt: `Chiama ${CONTACT.phoneDisplay}`,
    ariaEn: `Call ${CONTACT.phoneDisplay}`,
  },
  {
    id: "whatsapp",
    href: CONTACT.whatsapp,
    icon: SiWhatsapp,
    external: true,
    labelIt: "WhatsApp",
    labelEn: "WhatsApp",
    ariaIt: "Scrivi su WhatsApp",
    ariaEn: "Message on WhatsApp",
  },
];

export const DOCK_SOCIAL_IDS: SocialBrandId[] = [
  "instagram",
  "facebook",
  "maps",
  "email",
  "phone",
  "whatsapp",
];

export const MOBILE_DOCK_SOCIAL_IDS: SocialBrandId[] = [
  "instagram",
  "facebook",
  "email",
  "phone",
  "whatsapp",
  "maps",
];

export function getSocialLinksByIds(ids: SocialBrandId[]): SocialLinkItem[] {
  return ids
    .map((id) => SOCIAL_LINKS.find((item) => item.id === id))
    .filter((item): item is SocialLinkItem => Boolean(item));
}

interface PremiumSocialIconLinkProps {
  item: SocialLinkItem;
  ariaLabel: string;
  onLinkClick?: () => void;
  className?: string;
  style?: CSSProperties;
  mobileTapFeedback?: boolean;
  children?: ReactNode;
}

const MOBILE_TAP_MS = 110;
const MOBILE_TAP_EASE = [0.22, 1, 0.36, 1] as const;

export function PremiumSocialIconLink({
  item,
  ariaLabel,
  onLinkClick,
  className = "",
  style,
  mobileTapFeedback = false,
  children,
}: PremiumSocialIconLinkProps) {
  const Icon = item.icon;
  const [pressing, setPressing] = useState(false);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
      }
    };
  }, []);

  const navigate = useCallback(() => {
    onLinkClick?.();
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.assign(item.href);
  }, [item.external, item.href, onLinkClick]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!mobileTapFeedback) {
      onLinkClick?.();
      return;
    }

    event.preventDefault();
    if (pressing) return;

    setPressing(true);
    tapTimerRef.current = setTimeout(() => {
      navigate();
      setPressing(false);
    }, MOBILE_TAP_MS);
  };

  const linkClassName = [
    "premium-social__link",
    className,
    mobileTapFeedback && pressing ? "premium-dock-mobile__arc-link--pressing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (mobileTapFeedback) {
    return (
      <motion.a
        href={item.href}
        role="listitem"
        aria-label={ariaLabel}
        data-brand={item.id}
        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={linkClassName}
        style={style}
        onClick={handleClick}
        animate={{ scale: pressing ? 0.9 : 1 }}
        transition={{ duration: MOBILE_TAP_MS / 1000, ease: MOBILE_TAP_EASE }}
      >
        {children}
        <span className="premium-social__ring" aria-hidden />
        <span className="premium-social__glow" aria-hidden />
        <Icon className="premium-social__icon" aria-hidden />
      </motion.a>
    );
  }

  return (
    <a
      href={item.href}
      role="listitem"
      aria-label={ariaLabel}
      data-brand={item.id}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={linkClassName}
      style={style}
      onClick={handleClick}
    >
      {children}
      <span className="premium-social__ring" aria-hidden />
      <span className="premium-social__glow" aria-hidden />
      <Icon className="premium-social__icon" aria-hidden />
    </a>
  );
}

interface PremiumSocialIconsProps {
  ids?: SocialBrandId[];
  variant?: "dock";
  layout?: "horizontal" | "vertical";
  showLabels?: boolean;
  labelFor: (it: string, en: string) => string;
  ariaFor: (it: string, en: string) => string;
  className?: string;
  onLinkClick?: () => void;
}

export default function PremiumSocialIcons({
  ids,
  variant = "dock",
  layout = "horizontal",
  showLabels = false,
  labelFor,
  ariaFor,
  className = "",
  onLinkClick,
}: PremiumSocialIconsProps) {
  const items = ids ? getSocialLinksByIds(ids) : SOCIAL_LINKS;

  return (
    <div
      className={`premium-social premium-social--${variant} premium-social--${layout} ${className}`}
      role="list"
    >
      {items.map((item) => {
        const label = labelFor(item.labelIt, item.labelEn);

        return (
          <PremiumSocialIconLink
            key={item.id}
            item={item}
            ariaLabel={ariaFor(item.ariaIt, item.ariaEn)}
            onLinkClick={onLinkClick}
          >
            {showLabels ? <span className="premium-social__label">{label}</span> : null}
          </PremiumSocialIconLink>
        );
      })}
    </div>
  );
}
