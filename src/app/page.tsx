import type { Metadata } from "next";
import { LandingPageContent } from "@/features/landing/landing-page-content";

export const metadata: Metadata = {
  title: "Liwan Restaurant – Premium Dining in Riyadh",
  description:
    "Experience exquisite flavors at Liwan Restaurant. Premium dining, handcrafted dishes, and timeless elegance in the heart of Riyadh.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Liwan Restaurant – Premium Dining in Riyadh",
    description:
      "Experience exquisite flavors at Liwan Restaurant. Premium dining, handcrafted dishes, and timeless elegance.",
    type: "website",
    locale: "en_US",
    siteName: "Liwan Restaurant",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liwan Restaurant – Premium Dining in Riyadh",
    description:
      "Experience exquisite flavors at Liwan Restaurant. Premium dining, handcrafted dishes, and timeless elegance.",
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Liwan Restaurant",
  description: "Premium dining experience in Riyadh with handcrafted dishes",
  servesCuisine: ["International", "Arabic", "Desserts", "Beverages"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 King Fahd Road",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  telephone: "+966551234567",
  priceRange: "$$",
  image: "/og-image.jpg",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <LandingPageContent />
    </>
  );
}
