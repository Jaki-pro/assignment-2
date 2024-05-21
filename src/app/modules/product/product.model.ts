import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});
const inventorySchema = new Schema<TInventory>({
  quantity: { type: String, required: true },
  insStock: { type: Boolean, required: true },
});

// Now create a schema of product
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

// Create a model of product
export const Product = model<TProduct>("Product", productSchema);
