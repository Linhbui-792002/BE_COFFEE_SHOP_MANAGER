import { BadRequestError } from "../core/error.response.js";
import Order from "../models/order.model.js";
import { findAccount } from "./account.repo.js";

const getAllOrders = async ({ keySearch, limit, page, filter, select }) => {
  const skip = (page - 1) * limit;
  let searchCriteria = { ...filter };

  if (keySearch) {
    const regexSearch = new RegExp(keySearch);
    searchCriteria = { ...searchCriteria, $text: { $search: regexSearch } };
  }

  const orders = await Order.find(searchCriteria)
    .populate("employeeId")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .select(select)
    .lean();

  const totalCount = await Order.countDocuments(searchCriteria);
  const options = {
    pageSize: limit,
    pageIndex: page,
    totalRecords: totalCount,
  };
  return { orders, options };
};

const getOrderInfo = async ({ orderId }) => {
  return await Order.findOne({ _id: orderId }).populate("employeeId").lean();
};

const createOrder = async ({
  totalMoney,
  receivedMoney,
  excessMoney,
  voucherUsed,
  orderDetail,
  accountId,
}) => {
  const createdBy = await findAccount({
    accountId,
    unSelect: ["password", "_v"],
  });
  if (!createdBy.employeeId)
    throw new BadRequestError("Account is not employee");

  return await Order.create({
    totalMoney,
    receivedMoney,
    excessMoney,
    voucherUsed,
    orderDetail,
    createdBy: createdBy.employeeId,
  });
};

export { getAllOrders, getOrderInfo, createOrder };
