import Menu from "../models/menu.model.js";

const getAllMenu = async ({ limit, page, keySearch, filter, select }) => {
  const skip = (page - 1) * limit;
  let searchCriteria = { ...filter };

  if (keySearch) {
    const regexSearch = new RegExp(keySearch, "i");
    searchCriteria = { ...searchCriteria, name: regexSearch };
  }

  const menus = await Menu.find(searchCriteria)
    .populate("menuInfoId", "_id name")
    .populate("productId", "_id name")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .select(select)
    .lean();

  const totalCount = await Menu.countDocuments(searchCriteria);
  const options = {
    pageSize: limit,
    pageIndex: page,
    totalRecords: totalCount,
  };
  return { menus, options };
};

const getMenuInfo = async ({ menuId }) => {
  const menu = await Menu.findOne({ _id: menuId })
    .populate("menuInfoId", "_id name")
    .lean();
};

export { getAllMenu, getMenuInfo };
