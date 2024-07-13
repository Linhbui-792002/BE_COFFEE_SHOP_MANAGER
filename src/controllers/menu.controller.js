"use strict";

import { CREATED, OK, SuccessResponse } from "../core/success.response.js";
import MenuService from "../services/menu.service.js";
import { removeKeys } from "../utils/index.js";

class MenuController {
  static getAllMenu = async (req, res, next) => {
    const query = req.query;
    const filter = removeKeys(query, ["limit", "page", "keySearch"]);
    const { menus, options } = await MenuService.getAllMenus({
      ...query,
      filter,
    });
    new OK({
      message: "Get all menu success",
      metadata: menus,
      options: options,
    }).send(res);
  };

  static getMenuInfo = async (req, res, next) => {
    new OK({
      message: "Get menu info",
      metadata: await MenuService.getMenuInfo({ menuId: req.params.id }),
    }).send(res);
  };

  static createMenu = async (req, res, next) => {
    new CREATED({
      message: "Create menu success",
      metadata: await MenuService.createMenu(req.body),
    }).send(res);
  };

  static updateMenu = async (req, res, next) => {
    new OK({
      message: "Update menu success",
      metadata: await MenuService.updateMenu(req.body),
    }).send(res);
  };

  static changeStatus = async (req, res, next) => {
    new OK({
      message: "Change status menu success",
      metadata: await MenuService.changeStatus(req.body),
    }).send(res);
  };
}

export default MenuController;
