import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { orderValidationSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body.order; // requested product
    const zodParseData = orderValidationSchema.parse(orderData); // send requested product for zod validation
    // console.log(zodParseData);
    const result = await OrderServices.createOrderIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: any) {
    let errorMessage;
    if (err?.issues) errorMessage = err.issues[0].message;
    res.status(500).json({
      success: false,
      message: errorMessage || err.message,
    });
  }
};

// Retrieve all orders
const getAllOrders = async (req: Request, res: Response) => {
  let query: string = "";
  if (req?.query?.email) query = req.query.email as string;
  // console.log(query);
  try {
    const result = await OrderServices.getAllOrdersFromDB(query);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
export const OrderControllers = {
  createOrder,
  getAllOrders,
};
