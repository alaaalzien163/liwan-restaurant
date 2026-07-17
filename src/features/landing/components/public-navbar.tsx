"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn } from "lucide-react";
import { LANDING_NAV_LINKS } from "../constants";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { useTranslation } from "react-i18next";
import { cn } from "@core/lib/utils";
import logoImage from "@/assets/images/Liwan-removebg-preview.png";

export function PublicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-surface/80 border-border border-b shadow-sm backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          href="#home"
          className="flex items-center gap-2"
          onClick={(e) => handleNavClick(e, "#home")}
        >
          <Image
            src={logoImage}
            alt={t("common.appName")}
            width={150}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LANDING_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-text-secondary hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-950/30 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {i18n.language === "ar" ? link.labelAr : link.label}
            </a>
          ))}
          <LanguageSwitch
            currentLocale={i18n.language}
            onLocaleChange={(code) => i18n.changeLanguage(code)}
          />
          <ThemeToggle />
          <div className="ml-4">
            <Link href="/login">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<LogIn className="h-4 w-4" />}
              >
                {t("nav.login")}
              </Button>
            </Link>
          </div>
        </div>

        <button
          type="button"
          className={cn(
            "flex items-center gap-2 md:hidden",
            isScrolled ? "text-text-primary" : "text-white",
          )}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={
            isMobileOpen
              ? t("landing.navbar.closeMenu")
              : t("landing.navbar.openMenu")
          }
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-border bg-surface overflow-hidden border-t md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {LANDING_NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-text-secondary hover:bg-primary-50 hover:text-primary-600 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                >
                  {i18n.language === "ar" ? link.labelAr : link.label}
                </a>
              ))}
              <div className="border-border mt-2 flex items-center gap-2 border-t pt-3">
                <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                  <Button variant="secondary" className="!h-9 !w-9 !p-0">
                    <LogIn className="h-4 w-4" />
                  </Button>
                </Link>
                <LanguageSwitch
                  currentLocale={i18n.language}
                  onLocaleChange={(code) => i18n.changeLanguage(code)}
                />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
