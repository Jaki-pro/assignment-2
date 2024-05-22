import express, { Request, Response } from "express";
import { OrderControllers } from "./order.controller";
const router = express.Router();
router.post("/", OrderControllers.createOrder); // create a new Order
router.get("/", OrderControllers.getAllOrders); // retrieve all orders
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export const OrderRoutes = router;
