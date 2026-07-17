import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@core/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liwanrestaurant.com"),
  title: {
    default: "Liwan Restaurant",
    template: "%s | Liwan Restaurant",
  },
  description: "Restaurant management system for Liwan",
  keywords: ["restaurant", "management", "pos", "menu", "dashboard"],
  authors: [{ name: "Liwan Restaurant" }],
  creator: "Liwan Restaurant",
  publisher: "Liwan Restaurant",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1284AA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${notoSansArabic.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
