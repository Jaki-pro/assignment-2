import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// create a new product into DB
const createOrderIntoDB = async (orderData: TOrder) => {
  const product = await Product.findOne({ _id: orderData.productId });
  if (product !== null && product.inventory.quantity < orderData.quantity) {
    throw new Error("Has no sufficient quantity of the product");
  } else if (product !== null) {
    // console.log(product);
    const result = await Order.create(orderData);
    await Product.updateOne(
      { _id: orderData.productId },
      { $inc: { "inventory.quantity": -orderData.quantity } }
    );
    await Product.updateOne(
      { _id: orderData.productId, "inventory.quantity": 0 },
      { $set: { "inventory.inStock": false } }
    );
    return result;
  } else throw new Error("Invalid order");
};
export const OrderServices = {
  createOrderIntoDB,
};
