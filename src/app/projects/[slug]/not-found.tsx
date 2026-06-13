import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-8 text-center">
      <p className="editorial-eyebrow mb-4">404</p>
      <h1
        className="text-text mb-6"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        Project not found
      </h1>
      <Link
        href="/#portfolio"
        className="text-[10px] font-semibold tracking-[0.32em] uppercase text-text-dim hover:text-cyan transition-colors"
      >
        Back to Portfolio
      </Link>
    </div>
  );
}
