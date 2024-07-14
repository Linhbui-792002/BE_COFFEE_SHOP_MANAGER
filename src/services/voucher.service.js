"use strict";
import { BadRequestError } from '../core/error.response.js';
import Voucher from '../models/voucher.model.js';
import { getMenuInfo } from '../repositories/menu.repo.js';
import { findProductById } from '../repositories/product.repo.js';
import { findVoucher, getAllVoucher } from '../repositories/voucher.repo.js';

class VoucherService {

    static getAllVoucher= async ({
        limit = 5,
        page = 1,
        keySearch = "",
        filter,
        select = ["_id","name", "code", "detail", "voucherPercent","type", "autoUse","status","startDate","endDate", "createdAt", "updatedAt"],
      }) => {
        return await getAllVoucher({ limit, page, keySearch, filter, select });
      };


  static getVoucherInfo = async ({ voucherId }) => {
    return await findVoucher({ voucherId });
  };

    static createVoucher = async ({ name, code, detail, voucherPercent, maxDiscount,numberVoucher,type, autoUse,status,startDate,endDate,productId,productCategoryId,menuInfoId})=>{
        
        const isExistName = await Voucher.findOne({
            name: new RegExp("^" + name + "$", "i"),
          }).lean();
          if (isExistName) throw new BadRequestError("Voucher name existed");

          const isExistCode = await Voucher.findOne({
            code: new RegExp("^" + code + "$", "i"),
          }).lean();
          if (isExistCode) throw new BadRequestError("Voucher code existed");

          productId &&  await Promise.all(
            productId.map(async (id) => {
              const product = await findProductById({ productId: id });
              if (!product) throw new BadRequestError(`Product ${id} not found !!!`);
            })
          );
          productCategoryId &&  await Promise.all(
            productCategoryId.map(async (id) => {
              const product = await findProductCateById({ categoryId: id });
              if (!product) throw new BadRequestError(`Category ${id} not found !!!`);
            })
          );
          menuInfoId && await Promise.all(
            menuInfoId.map(async (id) => {
              const product = await getMenuInfo({ menuId: id });
              if (!product) throw new BadRequestError(`Menu ${id} not found !!!`);
            })
          );
         return await Voucher.create({ name, code, detail, voucherPercent, maxDiscount,numberVoucher,type, autoUse,status,startDate,endDate,productId,productCategoryId,menuInfoId});
    }

    static editVoucher = async ({ voucherId, name, code, detail, voucherPercent, maxDiscount,numberVoucher,type, autoUse,status,startDate,endDate,productId,productCategoryId,menuInfoId})=>{
        
        const isExistName = await Voucher.findOne({
            name: new RegExp("^" + name + "$", "i"),
            _id: { $ne: voucherId },
          }).lean();
          if (isExistName) throw new BadRequestError("Voucher name existed");

          const isExistCode = await Voucher.findOne({
            code: new RegExp("^" + code + "$", "i"),
            _id: { $ne: voucherId },
          }).lean();
          if (isExistCode) throw new BadRequestError("Voucher code existed");

          productId &&  await Promise.all(
            productId.map(async (id) => {
              const product = await findProductById({ productId: id });
              if (!product) throw new BadRequestError(`Product ${id} not found !!!`);
            })
          );
          productCategoryId &&  await Promise.all(
            productCategoryId.map(async (id) => {
              const product = await findProductCateById({ categoryId: id });
              if (!product) throw new BadRequestError(`Category ${id} not found !!!`);
            })
          );
          menuInfoId && await Promise.all(
            menuInfoId.map(async (id) => {
              const product = await getMenuInfo({ menuId: id });
              if (!product) throw new BadRequestError(`Menu ${id} not found !!!`);
            })
          );

          return await Voucher.findByIdAndUpdate(
            voucherId,
            { name, code, detail, voucherPercent, maxDiscount,numberVoucher,type, autoUse,status,startDate,endDate,productId,productCategoryId,menuInfoId},
            { new: true, lean: true }
          );
    }


}

export default VoucherService;