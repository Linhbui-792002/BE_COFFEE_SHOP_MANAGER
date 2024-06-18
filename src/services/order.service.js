import { BadRequestError } from "../core/error.response.js";
import Order from "../models/order.model.js";
import Employee from "../models/employee.model.js"; // Import Employee model if not already imported
import {
  createOrder,
  getAllOrders,
  getOrderInfo,
} from "../repositories/order.repo.js";

class OrderService {
  static getAllOrders = async ({
    limit = 5,
    page = 1,
    keySearch = "",
    filter,
    select = [
      "_id",
      "totalMoney",
      "receivedMoney",
      "excessMoney",
      "createdAt",
      "createdBy",
    ],
  }) => {
    return await getAllOrders({
      limit,
      page,
      keySearch,
      filter,
      select,
    });
  };

  static getOrderInfo = async ({ orderId }) => {
    return await getOrderInfo({ orderId });
  };

  static createOrder = async ({
    totalMoney,
    receivedMoney,
    excessMoney,
    voucherUsed,
    orderDetail,
    accountId,
  }) => {
    return await createOrder({
      totalMoney,
      receivedMoney,
      excessMoney,
      voucherUsed,
      orderDetail,
      accountId,
    });
  };
}

export default OrderService;
