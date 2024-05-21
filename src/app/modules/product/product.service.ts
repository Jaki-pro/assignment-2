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
  let matchCount;
  try {
    const result = await Product.updateOne(
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
    matchCount = result.matchedCount;
    console.log(result.modifiedCount);
    if (result.modifiedCount === 1) return updateProduct;
    else throw new Error(`Nothing to update`);
  } catch (err) {
    if (matchCount === 1) throw new Error(`Nothing to update`);
    else throw new Error(`Product Id ${productId} not found`);
  }
};

// Delete a specific product in DB
const deleteSingleProductFromDB = async (productId: string) => {
  try {
    const result = await Product.deleteOne({ _id: productId });
    if (result.deletedCount === 0)
      throw new Error(`Product Id ${productId} not found`);
    else return null;
  } catch (err) {
    throw new Error(`Product Id ${productId} not found`);
  }
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductInDB,
  deleteSingleProductFromDB,
};
