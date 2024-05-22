import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";
app.use(cors());
app.use(express.json());
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
export default app;
