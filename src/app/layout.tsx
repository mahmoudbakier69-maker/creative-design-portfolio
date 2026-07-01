import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import StructuredData from "@/components/seo/StructuredData";
import { buildOrganizationJsonLd } from "@/lib/project-metadata";
import { defaultSiteDescription, siteMetadataBase, siteName, siteUrl } from "@/lib/site";

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
  metadataBase: siteMetadataBase,
  title: {
    default: `${siteName} | Exhibition Stand Design & Spatial Environments`,
    template: `%s | ${siteName}`,
  },
  description: defaultSiteDescription,
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} | Exhibition Stand Design & Spatial Environments`,
    description: defaultSiteDescription,
    type: "website",
    url: siteUrl,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Exhibition Stand Design & Spatial Environments`,
    description: defaultSiteDescription,
  },
  robots: {
    index: true,
    follow: true,
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
        <StructuredData data={buildOrganizationJsonLd()} />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
