"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryImage } from "../types";
import { useTranslation } from "react-i18next";

export function GallerySection() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-primary-500 text-xs font-semibold tracking-widest uppercase">
            {t("landing.gallery.sectionLabel")}
          </span>
          <h2 className="text-text-primary mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.gallery.heading")}
          </h2>
          <p className="text-text-secondary mx-auto mt-3 max-w-xl">
            {t("landing.gallery.description")}
          </p>
        </motion.div>

        <div className="mt-12 text-center">
          <div className="bg-surface-tertiary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <span className="text-text-tertiary text-2xl">📸</span>
          </div>
          <p className="text-text-secondary mt-4 text-sm">
            {t("landing.gallery.comingSoon")}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface relative max-h-[80vh] max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="from-primary-200 to-primary-300 aspect-[4/3] bg-gradient-to-br">
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl font-bold text-white/40">L</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
