import express, { Request, Response } from "express";
import { ProductControllers } from "./product.controller";
const router = express.Router();
router.post("/", ProductControllers.createProduct); // create a new Product
router.get("/", ProductControllers.getAllProducts); // get list of products
router.get("/:productId", ProductControllers.getSingleProduct); // get a specific product by ID
router.put("/:productId", ProductControllers.updateSingleProduct); // update a specific product
router.delete("/:productId", ProductControllers.deleteSingleProduct); // Delete a specific product
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export const ProductRoutes = router;
