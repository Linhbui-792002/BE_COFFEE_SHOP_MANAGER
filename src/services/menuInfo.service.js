import { BadRequestError } from "../core/error.response.js";
import MenuInfo from "../models/menuInfo.model.js";

class MenuInfoService {
  static createMenuInfo = async ({ name }) => {
    return await MenuInfo.create({ name });
  };

  static updateMenuInfo = async ({ menuInfoId, name, status }) => {
    const menuInfo = await MenuInfo.findOne({ _id: menuInfoId });
    if (!menuInfo) throw new BadRequestError("MenuInfo not existed !");
    return await MenuInfo.findByIdAndUpdate(
      menuInfoId,
      { name, status },
      { new: true, lean: true }
    );
  };

  static getAllMenuInfo = async ({
    filter,
    select = ["_id", "name", "status", "createdAt", "updatedAt"],
  }) => {
    return await MenuInfo.find(filter)
      .sort({ createdAt: -1 })
      .select(select)
      .lean();
  };

  static getAllMenuInfoActive = async ({
    filter = {
      status: true,
    },
    select = ["_id", "name", "status", "createdAt", "updatedAt"],
  }) => {
    return await MenuInfo.find(filter)
      .sort({ createdAt: -1 })
      .select(select)
      .lean();
  };

  static getOneMenuInfo = async ({
    menuInfoId,
    select = ["_id", "name", "status", "createdAt", "updatedAt"],
  }) => {
    const menuInfo = await MenuInfo.findOne({ _id: menuInfoId })
      .select(select)
      .lean();
    if (!menuInfo) throw new BadRequestError("MenuInfo not existed !");

    return menuInfo;
  };
}

export default MenuInfoService;
