"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { CONTACT_INFO, SOCIAL_LINKS } from "../constants";
import { useTranslation } from "react-i18next";

const socialIcons = [
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
  { icon: MessageCircle, href: SOCIAL_LINKS.whatsapp, label: "WhatsApp" },
];

export function ContactSection() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="bg-surface-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-primary-500 text-xs font-semibold tracking-widest uppercase">
            {t("landing.contact.sectionLabel")}
          </span>
          <h2 className="text-text-primary mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.contact.heading")}
          </h2>
          <p className="text-text-secondary mx-auto mt-3 max-w-xl">
            {t("landing.contact.description")}
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="border-border bg-surface flex items-start gap-4 rounded-xl border p-5 shadow-sm">
              <div className="bg-primary-50 text-primary-500 dark:bg-primary-950/30 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-text-primary font-semibold">
                  {t("landing.contact.phone")}
                </h3>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-text-secondary hover:text-primary-500 mt-0.5 block text-sm"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="border-border bg-surface flex items-start gap-4 rounded-xl border p-5 shadow-sm">
              <div className="bg-primary-50 text-primary-500 dark:bg-primary-950/30 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-text-primary font-semibold">
                  {t("landing.contact.address")}
                </h3>
                <p className="text-text-secondary mt-0.5 text-sm">
                  {CONTACT_INFO.address}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-surface text-text-secondary hover:border-primary-300 hover:text-primary-500 flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
