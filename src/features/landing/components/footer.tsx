"use client";

import { LANDING_NAV_LINKS, CONTACT_INFO, SOCIAL_LINKS } from "../constants";
import { Instagram, MessageCircle, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@core/lib/utils";

const socialIcons = [
  {
    icon: Instagram,
    href: SOCIAL_LINKS.instagram,
    label: "Instagram",
    colorClass:
      "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300",
  },
  {
    icon: MessageCircle,
    href: SOCIAL_LINKS.whatsapp,
    label: "WhatsApp",
    colorClass:
      "text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300",
  },
  {
    icon: Facebook,
    href: SOCIAL_LINKS.facebook,
    label: "Facebook",
    colorClass:
      "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",
  },
];

export function Footer() {
  const { t } = useTranslation();
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document
        .getElementById(href.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-border bg-surface border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-primary-500 text-xl font-bold tracking-tight">
              {t("common.appName")}
            </span>
            <p className="text-text-tertiary mt-3 text-sm leading-relaxed">
              {t("landing.footer.description")}
            </p>
          </div>

          <div>
            <h4 className="text-text-primary text-sm font-semibold">
              {t("landing.footer.quickLinks")}
            </h4>
            <ul className="mt-4 space-y-2">
              {LANDING_NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-text-secondary hover:text-primary-500 text-sm transition-colors"
                  >
                    {t("common.appName") === "ليوان"
                      ? link.labelAr
                      : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary text-sm font-semibold">
              {t("landing.footer.contact")}
            </h4>
            <ul className="text-text-secondary mt-4 space-y-2 text-sm">
              {CONTACT_INFO.phoneNumbers.map((p) => (
                <li key={p.number}>
                  <a
                    href={`tel:${p.number}`}
                    className="hover:text-primary-500 cursor-pointer transition-colors"
                    aria-label={`Call ${p.number}`}
                  >
                    {p.display}
                  </a>
                </li>
              ))}
              <li className="text-xs leading-relaxed">
                {CONTACT_INFO.address}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary text-sm font-semibold">
              {t("landing.footer.followUs")}
            </h4>
            <div className="mt-4 flex gap-3">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "border-border flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                    s.colorClass,
                  )}
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-border text-text-tertiary mt-10 border-t pt-6 text-center text-xs">
          &copy;{" "}
          {t("landing.footer.copyright", { year: new Date().getFullYear() })}
        </div>
        <div className="text-text-tertiary/60 mt-2 text-center text-[10px]">
          Powered by Ether Tech
        </div>
      </div>
    </footer>
  );
}
