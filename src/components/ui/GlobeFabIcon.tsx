interface GlobeFabIconProps {
  className?: string;
}

/** Permanent FAB symbol — international presence globe (white stroke). */
export default function GlobeFabIcon({ className = "h-5 w-5" }: GlobeFabIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.75" stroke="currentColor" strokeWidth="1.35" />
      <ellipse cx="12" cy="12" rx="3.75" ry="8.75" stroke="currentColor" strokeWidth="1.35" />
      <path d="M3.25 12h17.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path
        d="M5.5 8.25h13M5.5 15.75h13"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}
