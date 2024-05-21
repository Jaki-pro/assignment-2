import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";
import { boolean } from "zod";

const variantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});
const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// Now create a schema of product
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true, _id: false },
  variants: { type: [variantSchema], required: true, _id: false },
  inventory: { type: inventorySchema, required: true, _id: false },
});

// Create a model of product
export const Product = model<TProduct>("Product", productSchema);
