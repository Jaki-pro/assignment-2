import express from "express";
import { ProductControllers } from "./product.controller";
const router = express.Router();
router.post("/", ProductControllers.createProduct); // create a new Product
router.get("/", ProductControllers.getAllProducts); // get list of products

export const ProductRoutes = router;
