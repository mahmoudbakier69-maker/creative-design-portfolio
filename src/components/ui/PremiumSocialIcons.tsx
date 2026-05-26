"use client";

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

interface PremiumSocialIconsProps {
  ids?: SocialBrandId[];
  variant?: "dock";
  layout?: "horizontal" | "vertical";
  showLabels?: boolean;
  labelFor: (it: string, en: string) => string;
  ariaFor: (it: string, en: string) => string;
  className?: string;
}

export default function PremiumSocialIcons({
  ids,
  variant = "dock",
  layout = "horizontal",
  showLabels = false,
  labelFor,
  ariaFor,
  className = "",
}: PremiumSocialIconsProps) {
  const items = ids
    ? ids
        .map((id) => SOCIAL_LINKS.find((item) => item.id === id))
        .filter((item): item is SocialLinkItem => Boolean(item))
    : SOCIAL_LINKS;

  return (
    <div
      className={`premium-social premium-social--${variant} premium-social--${layout} ${className}`}
      role="list"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const label = labelFor(item.labelIt, item.labelEn);
        const aria = ariaFor(item.ariaIt, item.ariaEn);

        return (
          <a
            key={item.id}
            href={item.href}
            role="listitem"
            aria-label={aria}
            data-brand={item.id}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="premium-social__link"
          >
            {showLabels && (
              <span className="premium-social__label">{label}</span>
            )}
            <span className="premium-social__ring" aria-hidden />
            <span className="premium-social__glow" aria-hidden />
            <Icon className="premium-social__icon" aria-hidden />
          </a>
        );
      })}
    </div>
  );
}
