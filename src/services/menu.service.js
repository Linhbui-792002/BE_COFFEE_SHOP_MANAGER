"use strict";

import MenuController from "../controllers/menu.controller.js";
import { BadRequestError } from "../core/error.response.js";
import Menu from "../models/menu.model.js";
import { getAllMenu, getMenuInfo } from "../repositories/menu.repo.js";
import { findMenuInfo } from "../repositories/menuInfo.repo.js";
import { findProductById } from "../repositories/product.repo.js";

class MenuService {

  static getAllMenuPublic = async ({
    limit ,
    page ,
    keySearch = "",
    filter ,
    select = ["_id", "name", "menuInfoId", "productId", "status", "createdAt", "updatedAt"] }) => {
    return await getAllMenu({ limit, page, keySearch, filter: { ...filter,status: true }, select });
  }

  static getAllMenus = async ({
    limit = 5,
    page = 1,
    keySearch = "",
    filter,
    select = ["_id", "name", "menuInfoId", "productId", "status", "createdAt", "updatedAt"],
  }) => {
    return await getAllMenu({ limit, page, keySearch, filter, select });
  };

  static getMenuInfo = async ({ menuId }) => {
    return await getMenuInfo({ menuId });
  };
  static createMenu = async ({ menuInfoId, name, productId, status }) => {
    const isExistName = await Menu.findOne({
      name: new RegExp("^" + name + "$", "i"),
    }).lean();
    if (isExistName) throw new BadRequestError("Menu name existed");

    const menuInfo = await findMenuInfo({ menuInfoId });
    if (!menuInfo) throw new BadRequestError("Menu info not found !!!");
    await Promise.all(
      productId.map(async (id) => {
        const product = await findProductById({ productId: id });
        if (!product) throw new BadRequestError(`Product ${id} not found !!!`);
      })
    );
    return await Menu.create({ menuInfoId, name, productId, status });
  };

  static updateMenu = async ({
    menuId,
    menuInfoId,
    name,
    productId,
    status,
  }) => {
    const menu = Menu.findOne({ _id: menuId }).lean();
    if (!menu) throw new BadRequestError("Menu not found !!!");


    const isExistName = await Menu.findOne({
      name: new RegExp("^" + name + "$", "i"),
      _id: { $ne: menuId },
    }).lean();
    if (isExistName) throw new BadRequestError("Menu name existed");

    await Promise.all(
      productId.map(async (id) => {
        const product = await findProductById({ productId: id });
        if (!product) throw new BadRequestError(`Product ${id} not found !!!`);
      })
    );

    return await Menu.findByIdAndUpdate(
      menuId,
      {
        menuInfoId,
        name,
        productId,
        status,
      },
      { new: true, lean: true }
    );
  };

  static changeStatus = async ({ menuId, status }) => {
    const menu = Menu.findOne({ _id: menuId }).lean();
    if (!menu) throw new BadRequestError("Menu not found !!!");
    return await Menu.findByIdAndUpdate(
      menuId,
      {
        status,
      },
      { new: true, lean: true }
    );
  };
}

export default MenuService;
