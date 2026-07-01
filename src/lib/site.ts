export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://creativedesign.it";

export const siteName = "Creative Design";

export const siteMetadataBase = new URL(siteUrl);

export const defaultSiteDescription =
  "Italian exhibition stand design and spatial branding studio. Trade show environments, corporate installations and experiential architecture — turnkey across Europe.";
