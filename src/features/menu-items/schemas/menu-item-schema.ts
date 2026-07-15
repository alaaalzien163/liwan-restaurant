import { z } from "zod";

export const menuItemSchema = z
  .object({
    categoryId: z.string().min(1, { message: "Category is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    nameAr: z.string().min(1, { message: "Arabic name is required" }),
    description: z.string(),
    descriptionAr: z.string(),
    price: z.coerce
      .number()
      .positive({ message: "Price must be greater than 0" }),
    discountPrice: z.union([z.coerce.number(), z.literal("")]).optional(),
    image: z.string(),
    displayOrder: z.coerce
      .number()
      .int({ message: "Must be a whole number" })
      .min(1, { message: "Display order must be at least 1" }),
    isAvailable: z.boolean(),
    isFeatured: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.discountPrice) return true;
      return Number(data.discountPrice) <= Number(data.price);
    },
    {
      message: "Discount price must be less than or equal to the price",
      path: ["discountPrice"],
    },
  );

export type MenuItemFormData = z.infer<typeof menuItemSchema>;
