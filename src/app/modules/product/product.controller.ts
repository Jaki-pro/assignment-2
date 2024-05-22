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
    // eslint-disable-next-line
  } catch (err: any) {
    if (err?.issues) {
      res.status(500).json({
        success: false,
        message: err.issues[0].message,
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
  let query: string = ""; // Search product perspective
  if (req?.query?.searchTerm) query = req.query.searchTerm as string; // Search product perspective

  try {
    const result = await ProductServices.getAllProductsFromDB(query);
    res.status(200).json({
      success: true,
      message: query
        ? `Products matching search term ${query} fetched successfully!` // Message against getting search term products
        : "Products fetched successfully!", // Message against getting all products
      data: result,
    });
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
    // If quantity of Update product is 0 then we dynamically update inStock value to false
    if (updateProduct.inventory.quantity === 0)
      updateProduct.inventory.inStock = false;

    let zodParseData = updateProduct;
    // If quantity of Update product is not 0 only then we'll send update product to parse for zod
    // because for 0 zod will give an error. but we want to update document setting inStock value to false
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
    // eslint-disable-next-line
  } catch (err: any) {
    if (err?.issues) {
      // Zod Error
      res.status(500).json({
        success: false,
        message: err.issues[0].message,
      });
    } else {
      // Custom throw exception
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
    // eslint-disable-next-line
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
