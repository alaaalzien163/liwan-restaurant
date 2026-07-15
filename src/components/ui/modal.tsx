"use client";

import { cn } from "@core/lib/utils";
import { type BaseProps, type Size } from "./types";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  titleAr?: string;
  size?: Size | "full";
  isCentered?: boolean;
  showCloseButton?: boolean;
  isDismissable?: boolean;
}

const sizeStyles: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[calc(100%-2rem)] mx-4",
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 25, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.15 } },
};

export function Modal({
  isOpen,
  onClose,
  title,
  titleAr,
  size = "md",
  isCentered = true,
  showCloseButton = true,
  isDismissable = true,
  children,
  className,
  "data-testid": testId,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDismissable) onClose();
    },
    [onClose, isDismissable],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6"
          data-testid={testId}
        >
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={isDismissable ? onClose : undefined}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "border-border bg-surface relative z-10 w-full rounded-xl border shadow-xl",
              sizeStyles[size],
              isCentered && "mt-auto mb-auto",
              className,
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {(title || showCloseButton) && (
              <div className="border-border flex items-center justify-between border-b px-6 py-4">
                {title && (
                  <h2 className="text-text-primary text-lg font-semibold">
                    {titleAr ? <span dir="auto">{titleAr}</span> : title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-text-tertiary hover:bg-surface-tertiary hover:text-text-primary rounded-lg p-1.5 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
