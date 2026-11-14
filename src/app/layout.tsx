import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/manrope";
import "./globals.css";

const siteMetadata: Metadata = {
  title: "Folio — One Terminal. Every Opportunity.",
  description: "Discover. Analyze. Trade. Folio is an all-in-one crypto trading terminal in development for Robinhood Chain. Explore the product preview and join the community.",
  applicationName: "Folio",
  openGraph: { title: "Folio — One Terminal. Every Opportunity.", description: "A smarter, more connected way to navigate crypto. Coming soon to Robinhood Chain.", type: "website", siteName: "Folio", images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Folio. One Terminal. Every Opportunity." }] },
  twitter: { card: "summary_large_image", title: "Folio — One Terminal. Every Opportunity.", description: "Discover. Analyze. Trade. Coming soon to Robinhood Chain.", images: ["/social-card.png"] },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};
export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") === "https" ? "https" : host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  return { ...siteMetadata, metadataBase: new URL(`${protocol}://${host}`) };
}
export const viewport: Viewport = { themeColor: "#050B08", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
