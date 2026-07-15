"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/login-schema";
import { useAuthStore } from "../stores/auth-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function LoginForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data.email, data.password);
      toast.success(t("auth.login.welcomeBack"), {
        description: t("auth.login.redirecting"),
      });
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("auth.login.loginFailed");
      toast.error(t("auth.login.loginFailed"), {
        description: message,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label={t("auth.login.email")}
          type="email"
          placeholder={t("auth.login.emailPlaceholder")}
          leftIcon={<Mail className="h-4 w-4" />}
          isRequired
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label={t("auth.login.password")}
          type="password"
          placeholder={t("auth.login.passwordPlaceholder")}
          leftIcon={<Lock className="h-4 w-4" />}
          isRequired
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between">
          <label className="text-text-secondary hover:text-text-primary flex cursor-pointer items-center gap-2 text-sm transition-colors">
            <input
              type="checkbox"
              className="border-border bg-surface text-primary-500 focus:ring-primary-500/20 h-4 w-4 rounded"
              {...register("rememberMe")}
            />
            {t("auth.login.rememberMe")}
          </label>
          <Link
            href="#"
            className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
          >
            {t("auth.login.forgotPassword")}
          </Link>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-danger-50 text-danger-600 dark:bg-danger-950/20 dark:text-danger-400 rounded-lg p-3 text-sm"
            role="alert"
          >
            {error}
          </motion.p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isFullWidth
          isLoading={isSubmitting || isLoading}
          rightIcon={
            !(isSubmitting || isLoading) ? (
              <LogIn className="h-4 w-4" />
            ) : undefined
          }
        >
          {t("auth.login.submit")}
        </Button>
      </form>
    </motion.div>
  );
}
