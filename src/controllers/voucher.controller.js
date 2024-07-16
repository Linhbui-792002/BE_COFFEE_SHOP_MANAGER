import { CREATED, OK, SuccessResponse } from "../core/success.response.js"
import VoucherService from "../services/voucher.service.js"
import { removeKeys } from "../utils/index.js";

class VoucherController {

    static getAllVoucher = async (req, res, next) => {
        const query = req.query;
        const filter = removeKeys(query, ["limit", "page", "keySearch"]);
        const { vouchers, options } = await VoucherService.getAllVoucher({
          ...query,
          filter,
        });
        new OK({
          message: "Get all voucher success",
          metadata: vouchers,
          options: options,
        }).send(res);
      };

      static getVouchersProductActive = async (req, res, next) => {
        const query = req.query;
        const filter = removeKeys(query, ["limit", "page", "keySearch"]);
        const { vouchers, options } = await VoucherService.getVouchersProductActive({
          ...query,
          filter,
        });
        new OK({
          message: "Get voucher product success",
          metadata: vouchers,
          options: options,
        }).send(res);
      };
      static getVouchersCartActive = async (req, res, next) => {
        const query = req.query;
        const filter = removeKeys(query, ["limit", "page", "keySearch"]);
        const { vouchers, options } = await VoucherService.getVouchersCartActive({
          ...query,
          filter,
        });
        new OK({
          message: "Get voucher cart success",
          metadata: vouchers,
          options: options,
        }).send(res);
      };
    static getVoucherInfo = async (req, res, next) => {
        new OK({
          message: "Get voucher info",
          metadata: await VoucherService.getVoucherInfo({ voucherId: req.params.id }),
        }).send(res);
      };
    static createVoucher = async (req, res, next) => {
        new CREATED({
            message: "Create voucher success",
            metadata: await VoucherService.createVoucher(req.body)
        }).send(res)
    }
    static updateVoucher = async (req, res, next) => {
        new OK({
            message: "Update voucher success",
            metadata: await VoucherService.editVoucher(req.body)
        }).send(res)
    }
}

export default VoucherController
