import { OK } from "../core/success.response.js";
import OrderService from "../services/order.service.js";
import AccountService from "../services/account.service.js";
import { removeKeys } from "../utils/index.js";

class OrderController {
  //   //CREATE//
  static createOrder = async (req, res, next) => {
    const { body } = req;
    console.log(body, "body");
    new OK({
      message: "Create order success",
      metadata: await OrderService.createOrder({
        ...body,
        accountId: req.account.accountId,
      }),
    }).send(res);
  };

  //   //QUERY//
  static getAllOrders = async (req, res, next) => {
    const query = req.query;
    const filter = removeKeys(query, ["limit", "page", "keySearch"]);
    const { orders, options } = await OrderService.getAllOrders({
      ...query,
      filter,
    });
    new OK({
      message: "Get all orders success",
      metadata: orders,
      options: options,
    }).send(res);
  };

  static getOrderInfo = async (req, res, next) => {
    new OK({
      message: "Get order info success",
      metadata: await OrderService.getOrderInfo({
        orderId: req.params.id,
      }),
    }).send(res);
  };
}

export default OrderController;
