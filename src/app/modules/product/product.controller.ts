import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { productValidationSchema } from "./product.validation";

// create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product; // requested product
    const zodParseData = productValidationSchema.parse(product); // send requested product for zod validation

    const result = await ProductServices.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      error: err,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Product cannot be found!",
      error: err,
    });
  }
};

// get a specific product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: `Product ID ${req.params.productId} is not found`,
      error: err,
    });
  }
};

// update a specific product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const updateProduct = req.body.product;
    const productId = req.params.productId;
    let zodParseData = updateProduct;
    if (updateProduct.inventory.quantity !== 0) {
      zodParseData = productValidationSchema.parse(updateProduct);
    }
    const result = await ProductServices.updateSingleProductInDB(
      productId,
      zodParseData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || `Something went wrong`,
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
};
