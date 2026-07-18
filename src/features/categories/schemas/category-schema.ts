import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  nameAr: z.string().min(1, { message: "Arabic name is required" }),
  description: z.string(),
  image: z.string(),
  displayOrder: z.coerce
    .number()
    .int({ message: "Must be a whole number" })
    .min(1, { message: "Display order must be at least 1" }),
  isActive: z.boolean(),
  mainSection: z.enum(["food", "drinks"]),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
