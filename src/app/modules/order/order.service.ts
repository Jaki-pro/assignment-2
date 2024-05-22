import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// ---create a new product into DB---
const createOrderIntoDB = async (orderData: TOrder) => {
  let product;
  try {
    product = await Product.findOne({ _id: orderData.productId });

    // Check if order quantity is smaller or equal to product qunatity. If true then,
    if (
      product != undefined &&
      product.inventory.quantity >= orderData.quantity
    ) {
      const result = await Order.create(orderData); // Create order in Order model
      // Update the product quantity
      await Product.updateOne(
        { _id: orderData.productId },
        { $inc: { "inventory.quantity": -orderData.quantity } }
      );
      // If product quantity equals zero then set inStock to false
      await Product.updateOne(
        { _id: orderData.productId, "inventory.quantity": 0 },
        { $set: { "inventory.inStock": false } }
      );
      return result;
    } else throw new Error("Insufficient quantity available in inventory");
  } catch (err) {
    if (
      product !== undefined &&
      product != null &&
      product.inventory.quantity < orderData.quantity
    ) {
      // If order quantity is greater than that of product then show Insufficient quantity available in inventory
      throw new Error("Insufficient quantity available in inventory");
    } else throw new Error("Product not found");
  }
};

// ---Retrieve all orders from DB---
const getAllOrdersFromDB = async (query: string) => {
  if (query === "") {
    //If query is not found then return all orders
    const result = await Order.find();
    if (result.length === 0) throw new Error("Order not found");
    return result;
  } else {
    // If query is found then return according to query orders
    const result = await Order.find({ email: query });
    if (result.length === 0) throw new Error("Order not found");
    return result;
  }
};
export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
