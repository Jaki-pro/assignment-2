import { z } from "zod";

const variantValidationSchema = z.object({
  type: z.string().trim().min(1, { message: "field value cannot be empty" }),
  value: z.string().trim().min(1, { message: "field value cannot be empty" }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int({ message: "Quantity should be positive integer" })
    .gt(0, { message: "Quantity should be positive integer" }),
  inStock: z.boolean(),
});

export const productValidationSchema = z.object({
  name: z.string().trim().min(1, { message: "name is required" }),
  description: z.string().trim().min(10, {
    message: "Description must be more than or equal 10 characters",
  }),
  price: z.number().gt(0, { message: "Price should be positive value" }),
  category: z.string().trim().min(1, { message: "Category is required" }),
  tags: z
    .array(
      z.string().trim().min(1, { message: "Tags element cannot be empty" })
    )
    .nonempty({ message: "tags cannot be empty" }),
  variants: z
    .array(variantValidationSchema)
    .nonempty({ message: "variants element cannot be empty" }),
  inventory: inventoryValidationSchema,
});
