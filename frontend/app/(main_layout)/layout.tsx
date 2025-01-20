import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { AnotherNavbar } from "@/components/AnotherNavabar";
import Footer from "@/components/footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - Articles for Engineers`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnotherNavbar />
      {children}
      <Footer />
    </>
  );
}
