"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/modal";

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  name: string;
}

export function ImagePreviewModal({
  isOpen,
  onClose,
  image,
  name,
}: ImagePreviewModalProps) {
  if (!image) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" title={name}>
      <div className="relative flex min-h-[300px] items-center justify-center p-2">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-xl object-contain"
          sizes="(max-width: 768px) 100vw, 600px"
          unoptimized
        />
      </div>
    </Modal>
  );
}
