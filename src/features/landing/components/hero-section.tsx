"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, UtensilsCrossed, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import heroBgImage from "@/assets/images/WhatsApp Image 2026-07-15 at 15.20.28.jpeg";

export function HeroSection() {
  const { t } = useTranslation();
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
      <Image
        src={heroBgImage}
        alt=""
        fill
        className="object-cover opacity-30"
        sizes="100vw"
        priority
      />
      <div className="from-primary-500/20 absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] via-transparent to-transparent" />
      <div className="from-primary-700/10 absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] via-transparent to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="border-primary-500/30 bg-primary-500/10 text-primary-400 inline-block rounded-full border px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
            {t("landing.hero.badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {t("landing.hero.brand")}
          <span className="from-primary-400 to-primary-300 block bg-gradient-to-r bg-clip-text text-transparent">
            {t("landing.hero.brandSubtitle")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300 sm:text-xl"
        >
          {t("landing.hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="xl"
            leftIcon={<UtensilsCrossed className="h-5 w-5" />}
            onClick={() => scrollTo("menu")}
            className="bg-primary-500 shadow-primary-500/25 hover:bg-primary-600 text-white shadow-lg"
          >
            {t("landing.hero.viewMenu")}
          </Button>
          <Button
            variant="secondary"
            size="xl"
            leftIcon={<Phone className="h-5 w-5" />}
            onClick={() => scrollTo("contact")}
            className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          >
            {t("landing.hero.contactUs")}
          </Button>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50"
        aria-label={t("landing.hero.scrollDown")}
      >
        <ArrowDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
