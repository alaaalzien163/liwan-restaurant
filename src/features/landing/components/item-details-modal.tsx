"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import type { PublicMenuItem } from "../types";

interface ItemDetailsModalProps {
  item: PublicMenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemDetailsModal({
  item,
  isOpen,
  onClose,
}: ItemDetailsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="sm:max-w-2xl lg:max-w-3xl"
      isDismissable
    >
      {item && (
        <div className="space-y-5">
          <div className="from-primary-100 to-primary-200 dark:from-primary-950/30 dark:to-primary-900/20 relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 672px"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-primary-300/30 dark:text-primary-700/30 text-6xl font-bold">
                  {(item.nameAr || item.name).charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-1">
                <h2 className="text-text-primary rtl:font-arabic text-xl font-bold sm:text-2xl">
                  {item.nameAr || item.name}
                </h2>
                {item.nameAr && (
                  <p className="text-text-tertiary text-sm sm:text-base">
                    {item.name}
                  </p>
                )}
              </div>
              <span className="bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400 shrink-0 rounded-lg px-3 py-1 text-base font-bold shadow-sm sm:text-lg">
                {item.price}
              </span>
            </div>

            {item.descriptionAr && (
              <p className="text-text-secondary rtl:font-arabic text-sm leading-relaxed sm:text-base">
                {item.descriptionAr}
              </p>
            )}
            {item.description && (
              <p className="text-text-tertiary text-sm leading-relaxed sm:text-base">
                {item.description}
              </p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
