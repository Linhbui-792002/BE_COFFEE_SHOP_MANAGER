import { BadRequestError } from "../core/error.response.js";
import Order from "../models/order.model.js";
import { removeKeys } from "../utils/index.js";
import { findAccount } from "./account.repo.js";
import { reduceProductQuantity } from "./product.repo.js";
import { isFullVoucher, reduceVoucherQuantity } from "./voucher.repo.js";

const getAllOrders = async ({ keySearch, limit, page, filter, select }) => {
  const skip = (page - 1) * limit;
  let searchCriteria = { ...filter };

  if (filter.fromDate && filter.toDate) {
    searchCriteria = {
      ...searchCriteria,
      createdAt: {
        $gte: new Date(filter.fromDate),
        $lt: new Date(filter.toDate),
      },
    };

    searchCriteria = removeKeys(searchCriteria, ["fromDate", "toDate"]);
  }

  if (keySearch) {
    const regexSearch = new RegExp(keySearch);
    searchCriteria = { ...searchCriteria, $text: { $search: regexSearch } };
  }

  const orders = await Order.find(searchCriteria)
    .populate({ path: "createdBy", select: "_id firstName lastName" })
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
  return await Order.findById(orderId)
    .populate({ path: "createdBy", select: "_id firstName lastName" })
    .populate({
      path: "orderDetail.productId",
      select: "name",
    })
    .lean();
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

  const bodyOrder = {
    totalMoney,
    receivedMoney,
    excessMoney,
    voucherUsed,
    orderDetail,
  }
  if (bodyOrder) {
    const products = [];
    const voucherIds = [];
  
    bodyOrder.voucherUsed.forEach(voucher => {
      voucherIds.push(voucher.voucherId);
    });
  
    bodyOrder.orderDetail.forEach(detail => {
      products.push({ productId: detail.productId, quantity: detail.quantity });
      detail.voucherUsed.forEach(voucher => {
        voucherIds.push(voucher.voucherId);
      });
    });

    if(products.length>0){
      await Promise.all(products.map( async product=>{
        await reduceProductQuantity(product.productId, product.quantity)
      }))
    }

    const vouchersUsed = {};

    voucherIds.forEach(voucherId => {
      vouchersUsed[voucherId] = (vouchersUsed[voucherId] || 0) + 1;
    });

    const vouchersQuantityUsed = Object.keys(vouchersUsed).map(voucherId => ({
      voucherId,
      quantity: vouchersUsed[voucherId]
    }));

    if(vouchersQuantityUsed.length>0){
      await Promise.all(vouchersQuantityUsed.map( async (voucherUsed)=>{
       const voucher = await  isFullVoucher(voucherUsed)
       if(voucher){
       throw new BadRequestError(`The number of vouchers ${voucher.code} (${voucher.numberVoucher}) is less than the number of vouchers in use (${voucherUsed.quantity})`)
       }
      }))
    }

    if(voucherIds.length>0){
      await Promise.all(voucherIds.map( async voucherId=>{
        await  reduceVoucherQuantity(voucherId)
      }))
    }

  };

 const order =  await Order.create({
    totalMoney,
    receivedMoney,
    excessMoney,
    voucherUsed,
    orderDetail,
    createdBy: createdBy.employeeId,
  });
  
  return order
};

export { getAllOrders, getOrderInfo, createOrder };
