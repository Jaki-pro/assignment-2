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

// get a specific product from DB
const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.find({ _id: productId });
  return result;
};

// update a specific product in DB
const updateSingleProductInDB = async (
  productId: string,
  updateProduct: TProduct
) => {
  try {
    await Product.updateOne(
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
  } catch (err) {
    throw new Error(`Product Id ${productId} could not found`);
  }
  const updatedResult = await Product.findOne({ _id: productId });
  return updatedResult;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductInDB,
};
