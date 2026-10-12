import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/500.css";
import "./globals.css";
import { MotionProvider } from "@/components/Motion";
import { brand } from "@/config/brand";

const title = "Spice & Pangat | Maharashtrian Supper Club in London";
const description =
  "Discover Spice & Pangat, a Maharashtrian supper club in Northwood, London, celebrating regional flavours, shared tables, festive gatherings and the feeling of home.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_GB",
    siteName: brand.name,
    images: [{ url: brand.logo.original, width: 1080, height: 1080, alt: "Spice & Pangat logo" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [brand.logo.original] },
  icons: { icon: brand.logo.original },
};
export const viewport: Viewport = {
  themeColor: brand.colors.ivory,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <MotionProvider>{children}</MotionProvider>
        <noscript>
          <style>{`.ritual__track{height:auto!important}.ritual__sticky{display:none!important}.ritual__static{display:flex!important}.pangat-track{height:auto!important}.pangat-sticky{display:none!important}.pangat-static{display:block!important}main [style]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
