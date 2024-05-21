import express from "express";
import { ProductControllers } from "./product.controller";
const router = express.Router();
router.post("/", ProductControllers.createProduct); // create a new Product
router.get("/", ProductControllers.getAllProducts); // get list of products
router.get("/:productId", ProductControllers.getSingleProduct); // get a specific product by ID

export const ProductRoutes = router;
