import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create a new product into DB
const createProductIntoDB = async (productData: TProduct) => {
  const isProductExists = await Product.findOne({ name: productData.name });
  if (isProductExists) {
    throw new Error(`Product ${productData.name} already exists`);
  }
  const result = await Product.create(productData);
  return result;
};

// ---get all products from DB---
const getAllProductsFromDB = async (query: string) => {
  try {
    // when not searching just try to get all products then query is empty value.
    // and empty query is not interfering this regex expression of searching.
    // Otherwise only those documents will be found whose name or category or description matches the query from their starting position.
    const result = await Product.find({
      $or: [
        { name: { $regex: `^${query}` } },
        { category: { $regex: `^${query}` } },
        { description: { $regex: `^${query}` } },
      ],
    });
    if (result.length === 0) throw new Error(`Product not found`); // If result is empty array that means no product was found
    return result;
  } catch (err) {
    throw new Error(`Product not found`);
  }
};

// ---get a specific product from DB---
const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });
  return result;
};

// ---update a specific product in DB---
const updateSingleProductInDB = async (
  productId: string,
  updateProduct: TProduct
) => {
  try {
    await Product.updateOne(
      // Update full document according to updateProduct
      { _id: productId },
      {
        name: updateProduct.name,
        description: updateProduct.description,
        price: updateProduct.price,
        category: updateProduct.category,
        tags: updateProduct.tags,
        variants: updateProduct.variants,
        inventory: updateProduct.inventory,
      }
    );
    return updateProduct;
  } catch (err) {
    // If productId doesn't match then throw an error product not found
    throw new Error(`Product not found`);
  }
};

// ---Delete a specific product in DB---
const deleteSingleProductFromDB = async (productId: string) => {
  try {
    const result = await Product.deleteOne({ _id: productId });
    if (result.deletedCount === 0)
      throw new Error(`Product not found`); // Delete count 0 means product not found
    else return null;
  } catch (err) {
    throw new Error(`Product not found`);
  }
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductInDB,
  deleteSingleProductFromDB,
};
