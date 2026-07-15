"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SettingsSection } from "./settings-section";
import { SettingsCard } from "./settings-card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  securitySchema,
  type SecurityFormData,
} from "../schemas/settings-schema";
import { useChangePassword } from "../hooks";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { cn } from "@core/lib/utils";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const strengthColors = [
  { label: "Weak", bar: "bg-danger-500", text: "#EF4444" },
  { label: "Fair", bar: "bg-warning-500", text: "#F59E0B" },
  { label: "Good", bar: "bg-yellow-500", text: "#EAB308" },
  { label: "Strong", bar: "bg-success-500", text: "#22C55E" },
];

const strengthWidths = ["w-1/4", "w-2/4", "w-3/4", "w-full"];

function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.max(Math.min(score - 1, 3), 0);
}

export function SecuritySettings() {
  const changePasswordMutation = useChangePassword();
  const [showPasswords, setShowPasswords] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword") ?? "";
  const strength = getPasswordStrength(newPassword);
  const strengthInfo = strengthColors[strength]!;
  const strengthWidth = strengthWidths[strength]!;

  const onSubmit = useCallback(
    async (data: SecurityFormData) => {
      try {
        await changePasswordMutation.mutateAsync({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
        toast.success("Password changed successfully");
        reset();
      } catch {
        toast.error("Failed to change password");
      }
    },
    [changePasswordMutation, reset],
  );

  return (
    <SettingsSection
      title="Security"
      titleAr="الأمان"
      description="Update your password"
    >
      <SettingsCard>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid max-w-md gap-6 sm:grid-cols-1">
            <Input
              label="Current Password"
              type={showPasswords ? "text" : "password"}
              placeholder="Enter current password"
              isRequired
              error={errors.currentPassword?.message}
              {...register("currentPassword")}
            />
            <Input
              label="New Password"
              type={showPasswords ? "text" : "password"}
              placeholder="Enter new password"
              isRequired
              error={errors.newPassword?.message}
              {...register("newPassword")}
            />
            {newPassword.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-text-tertiary text-xs">
                    Password strength
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: strengthInfo.text }}
                  >
                    {strengthInfo.label}
                  </span>
                </div>
                <div className="bg-surface-tertiary h-1.5 w-full overflow-hidden rounded-full">
                  <motion.div
                    className={cn("h-full rounded-full", strengthInfo.bar)}
                    initial={{ width: 0 }}
                    animate={{ width: strengthWidth }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
            <Input
              label="Confirm Password"
              type={showPasswords ? "text" : "password"}
              placeholder="Confirm new password"
              isRequired
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
                className="border-border text-primary-500 focus:ring-primary-500 rounded"
              />
              <span className="text-text-secondary text-sm">
                Show passwords
              </span>
            </label>
          </div>

          <Button type="submit" isLoading={changePasswordMutation.isPending}>
            <ShieldCheck className="h-4 w-4" />
            Change Password
          </Button>
        </form>
      </SettingsCard>
    </SettingsSection>
  );
}
