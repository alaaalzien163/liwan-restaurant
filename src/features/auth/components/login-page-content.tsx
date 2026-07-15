"use client";

import { LoginForm } from "./login-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { UtensilsCrossed, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function LoginPageContent() {
  const { t, i18n } = useTranslation();
  const ArrowIcon = i18n.dir() === "rtl" ? ArrowRight : ArrowLeft;
  return (
    <div className="bg-surface flex min-h-screen">
      <div className="from-primary-500 via-primary-600 to-primary-800 hidden flex-1 flex-col justify-between bg-gradient-to-br p-12 lg:flex">
        <div className="flex items-center gap-3 text-white">
          <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
            <UtensilsCrossed className="h-8 w-8" />
          </div>
          <span className="text-2xl font-bold">{t("common.appName")}</span>
        </div>

        <div className="max-w-md">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl leading-tight font-bold text-white"
          >
            {t("auth.login.welcome")}
            <br />
            <span className="text-primary-200">
              {t("auth.login.restaurantName")}
            </span>
          </motion.h1>
        </div>

        <p className="text-sm text-white/60">
          {t("landing.footer.copyright", { year: new Date().getFullYear() })}
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-end gap-2 p-4">
          <LanguageSwitch
            currentLocale={i18n.language}
            onLocaleChange={(code) => i18n.changeLanguage(code)}
          />
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="mb-8 text-center lg:text-start">
              <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
                <div className="bg-primary-500 rounded-xl p-2 text-white">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <span className="text-text-primary text-xl font-bold">
                  {t("common.appName")}
                </span>
              </div>
              <h2 className="text-text-primary text-2xl font-bold">
                {t("auth.login.title")}
              </h2>
              <p className="text-text-secondary mt-1 text-sm">
                {t("auth.login.description")}
              </p>
              <Link
                href="/"
                className="text-primary-500 hover:text-primary-600 mt-3 inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <ArrowIcon className="h-3.5 w-3.5" />
                {t("auth.login.backToHome")}
              </Link>
            </div>

            <LoginForm />

            <p className="text-text-tertiary mt-8 text-center text-xs">
              {t("auth.login.demoCredentials")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
