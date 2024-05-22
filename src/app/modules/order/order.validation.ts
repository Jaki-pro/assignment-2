import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),

  productId: z.string().trim().min(1, { message: "productId is required" }),

  price: z.number().gt(0, { message: "Price should be positive value" }),
  quantity: z
    .number()
    .gt(0, { message: "Quantity should be positive integer" })
    .int(),
});
