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

// get all products from DB
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
