import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creative Design | Exhibition Stand Design & Spatial Environments",
  description:
    "Italian exhibition stand design and spatial branding studio. Trade show environments, corporate installations and experiential architecture — turnkey across Europe.",
  keywords: [
    "exhibition stand design",
    "allestimenti fieristici",
    "stand fieristici",
    "spatial branding",
    "trade show design",
    "experiential architecture",
    "corporate installations",
    "Creative Design",
  ],
  openGraph: {
    title: "Creative Design | Exhibition Stand Design & Spatial Environments",
    description:
      "Italian exhibition stand design and spatial branding studio. Trade show environments and experiential architecture across Europe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${spaceGrotesk.variable} ${cormorantGaramond.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-graphite text-text transition-colors duration-700"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
