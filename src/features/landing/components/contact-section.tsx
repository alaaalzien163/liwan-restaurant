"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { CONTACT_INFO, WHATSAPP_REVIEW_NUMBER } from "../constants";
import { useTranslation } from "react-i18next";

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
                <div className="mt-0.5 space-y-0.5">
                  {CONTACT_INFO.phoneNumbers.map((p) => (
                    <a
                      key={p.number}
                      href={`tel:${p.number}`}
                      className="text-text-secondary hover:text-primary-500 block cursor-pointer text-sm transition-colors"
                      aria-label={`Call ${p.number}`}
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
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
            <a
              href={`https://wa.me/${WHATSAPP_REVIEW_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-primary-500 bg-primary-500 hover:bg-primary-600 mt-4 flex items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              {t("landing.contact.reviewsButton")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
