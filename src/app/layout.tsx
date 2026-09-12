import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@core/providers";

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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
