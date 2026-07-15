"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PublicNavbar } from "./components/public-navbar";
import { HeroSection } from "./components/hero-section";
import { SplashScreen } from "./components/splash-screen";
const AboutSection = dynamic(() =>
  import("./components/about-section").then((m) => ({
    default: m.AboutSection,
  })),
);
// const CategoriesSection = dynamic(() => import("./components/categories-section").then((m) => ({ default: m.CategoriesSection })));
const MenuSection = dynamic(() =>
  import("./components/menu-section").then((m) => ({ default: m.MenuSection })),
);
const ContactSection = dynamic(() =>
  import("./components/contact-section").then((m) => ({
    default: m.ContactSection,
  })),
);
const Footer = dynamic(() =>
  import("./components/footer").then((m) => ({ default: m.Footer })),
);
export function LandingPageContent() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const shown = sessionStorage.getItem("liwanSplashShown");
    if (shown) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem("liwanSplashShown", "1");
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <main>
      <PublicNavbar />
      <HeroSection />
      <AboutSection />
      {/* <CategoriesSection /> */}
      <MenuSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
