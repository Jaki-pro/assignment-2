import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { productValidationSchema } from "./product.validation";

// create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product; // requested product
    const zodParseData = productValidationSchema.parse(product); // send requested product for zod validation
    zodParseData.inventory.inStock = true;
    const result = await ProductServices.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    if (err?.issues) {
      res.status(500).json({
        success: false,
        message: err.issues[0].message,
        error: err,
      });
    } else {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  let query: string = "";
  if (req?.query?.searchTerm) query = req.query.searchTerm as string;

  try {
    const result = await ProductServices.getAllProductsFromDB(query);
    res.status(200).json({
      success: true,
      message: query
        ? `Products matching search term ${query} fetched successfully!`
        : "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || "Something went wrong",
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
      message: `Product not found`,
    });
  }
};

// update a specific product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const updateProduct = req.body.product;
    const productId = req.params.productId;
    // quantity of product is 0 then we dynamically update inStock value to false
    if (updateProduct.inventory.quantity === 0)
      updateProduct.inventory.inStock = false;

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
    if (err?.issues) {
      res.status(500).json({
        success: false,
        message: err.issues[0].message,
        error: err,
      });
    } else {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  }
};

// Delete a specific product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product Deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || `Something went wrong`,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
