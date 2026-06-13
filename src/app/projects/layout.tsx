import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialDock from "@/components/SocialDock";
import { projectsMetadataBase } from "@/lib/project-metadata";

export const metadata = {
  metadataBase: projectsMetadataBase,
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
