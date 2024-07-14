import Voucher from "../models/voucher.model.js";

const getAllVoucher = async ({ limit, page, keySearch, filter, select }) => {
    const skip = (page - 1) * limit;
    let searchCriteria = { ...filter };
  
    if (keySearch) {
      const regexSearch = new RegExp(keySearch, "i");
      searchCriteria = { ...searchCriteria, name: regexSearch };
    }
  
    const vouchers = await Voucher.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select(select)
      .lean();
  
    const totalCount = await Voucher.countDocuments(searchCriteria);
    const options = {
      pageSize: limit,
      pageIndex: page,
      totalRecords: totalCount,
    };
    return { vouchers, options };
  };

const findVoucher = async({voucherId})=>{
  const voucher = await Voucher.findOne({ _id: voucherId })
  .lean();

  return voucher
  }


export {getAllVoucher, findVoucher}