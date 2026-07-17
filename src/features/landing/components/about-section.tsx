"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Award, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import aboutImage from "@/assets/images/about.jpeg";

const highlights = [
  {
    icon: Star,
    titleKey: "landing.about.highlightQuality",
    descriptionKey: "landing.about.qualityDesc",
  },
  {
    icon: Award,
    titleKey: "landing.about.highlightChefs",
    descriptionKey: "landing.about.chefsDesc",
  },
  {
    icon: Heart,
    titleKey: "landing.about.highlightPassion",
    descriptionKey: "landing.about.passionDesc",
  },
];

export function AboutSection() {
  const { t } = useTranslation();
  return (
    <section id="about" className="bg-surface-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary-500 text-xs font-semibold tracking-widest uppercase">
              {t("landing.about.sectionLabel")}
            </span>
            <h2 className="text-text-primary mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("landing.about.heading")}
              <span className="text-primary-500">
                {" "}
                {t("landing.about.accent")}
              </span>
            </h2>
            <p className="text-text-secondary mt-4 leading-relaxed">
              {t("landing.about.paragraph1")}
            </p>
            <p className="text-text-secondary mt-3 leading-relaxed">
              {t("landing.about.paragraph2")}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.titleKey}
                  className="bg-surface rounded-xl p-4 shadow-sm"
                >
                  <item.icon className="text-primary-500 h-5 w-5" />
                  <h3 className="text-text-primary mt-2 text-sm font-semibold">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-text-tertiary mt-1 text-xs">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={aboutImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
