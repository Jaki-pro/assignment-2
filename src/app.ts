import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
app.use(cors());
app.use(express.json());
//app.use("/api/products");
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});
export default app;
