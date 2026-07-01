import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialDock from "@/components/SocialDock";
import { siteMetadataBase } from "@/lib/site";

export const metadata = {
  metadataBase: siteMetadataBase,
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SocialDock />
    </>
  );
}
