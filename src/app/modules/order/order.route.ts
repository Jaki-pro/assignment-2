import express from "express";
import { OrderControllers } from "./order.controller";
const router = express.Router();
router.post("/", OrderControllers.createOrder); // create a new Order

export const OrderRoutes = router;
