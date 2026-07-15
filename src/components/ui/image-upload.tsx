"use client";

import { cn } from "@core/lib/utils";
import { type BaseProps } from "./types";
import { useState, useRef, useCallback, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps extends BaseProps {
  value?: string;
  onChange?: (value: string) => void;
  onUpload?: (file: File) => Promise<string>;
  onUploadingChange?: (uploading: boolean) => void;
  error?: string;
  label?: string;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

export function ImageUpload({
  value,
  onChange,
  onUpload,
  onUploadingChange,
  error,
  label,
  className,
  "data-testid": testId,
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setValidationError("");

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setValidationError("Only PNG, JPG, and WEBP files are allowed");
        return;
      }

      if (file.size > MAX_SIZE) {
        setValidationError("File size must be less than 5MB");
        return;
      }

      const blobUrl = URL.createObjectURL(file);
      setPreviewUrl(blobUrl);

      if (onUpload) {
        setIsUploading(true);
        onUploadingChange?.(true);
        try {
          const path = await onUpload(file);
          console.log("[ImageUpload] path from upload:", path);
          if (path.startsWith("blob:")) {
            throw new Error(
              "Upload returned a blob URL instead of a storage URL",
            );
          }
          // Upload succeeded: revoke blob, clear preview so displayUrl falls through to value
          URL.revokeObjectURL(blobUrl);
          setPreviewUrl("");
          console.log("[ImageUpload] calling onChange with:", path);
          onChange?.(path);
        } catch {
          URL.revokeObjectURL(blobUrl);
          setPreviewUrl("");
          setValidationError("Upload failed");
        } finally {
          setIsUploading(false);
          onUploadingChange?.(false);
        }
      }
    },
    [onChange, onUpload, onUploadingChange],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleRemove = useCallback(() => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
    console.log(
      "[ImageUpload] handleRemove calling onChange with: empty string",
    );
    onChange?.("");
  }, [previewUrl, onChange]);

  const displayUrl = previewUrl || value || "";
  const displayError = error || validationError;
  const displayLabel = label ?? "Category Image";

  return (
    <div
      className={cn("flex flex-col gap-1.5", className)}
      data-testid={testId}
    >
      {displayLabel && (
        <label className="text-text-primary text-sm font-medium">
          {displayLabel}
        </label>
      )}

      <AnimatePresence mode="wait">
        {displayUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border-border relative inline-flex overflow-hidden rounded-xl border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayUrl}
              alt="Preview"
              className="h-40 w-40 object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute end-2 top-2 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black/80"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="upload"
            type="button"
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "focus-visible:ring-primary-500 flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors focus:outline-none focus-visible:ring-2",
              isDragging
                ? "border-primary-500 bg-primary-50 dark:bg-primary-950/20"
                : "border-border hover:border-primary-400 hover:bg-surface-tertiary",
            )}
            aria-label="Upload image"
          >
            {isUploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Upload className="text-primary-500 h-8 w-8" />
              </motion.div>
            ) : isDragging ? (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Upload className="text-primary-500 h-8 w-8" />
              </motion.div>
            ) : (
              <ImageIcon className="text-text-tertiary h-8 w-8" />
            )}
            {isUploading ? (
              <span className="text-primary-500 text-xs">Uploading...</span>
            ) : (
              <span className="text-text-tertiary text-xs">
                PNG, JPG, WEBP (max 5MB)
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        onChange={handleInputChange}
        className="hidden"
        aria-hidden="true"
      />

      {displayError && (
        <p className="text-danger-500 text-xs" role="alert">
          {displayError}
        </p>
      )}
    </div>
  );
}
