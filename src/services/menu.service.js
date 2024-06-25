'use strict';

import { BadRequestError } from "../core/error.response.js";
import Menu from "../models/menu.model.js";
import { getAllMenu, getMenuInfo } from "../repositories/menu.repo.js";

class MenuService {

    static getAllMenus = async ({
        limit = 5,
        page = 1,
        keySearch = "",
        filter,
        select = [
          "_id",
          "name",
          "menuInfoId",
          "productId",
          "status",
        ],
      }) => {
        return await getAllMenu({ limit, page, keySearch, filter, select });
      };

      static getMenuInfo = async ({menuId})=>{
        return await getMenuInfo({menuId})
      }
    static createMenu = async ({ menuInfoId, name, productId, status }) => {
        return await Menu.create({ menuInfoId, name, productId, status })
    }

    static updateMenu = async ({ menuId, menuInfoId, name, productId, status }) => {
        const menu = Menu.findOne({ _id: menuId }).lean()
        if (!menu) throw new BadRequestError('Menu not found !!!')

        return await Menu.findByIdAndUpdate(menuId, {
            menuInfoId, name, productId, status
        }, { new: true, lean: true })
    }

    static changeStatus = async ({ menuId, status }) => {
        const menu = Menu.findOne({ _id: menuId }).lean()
        if (!menu) throw new BadRequestError('Menu not found !!!')
        return await Menu.findByIdAndUpdate(menuId, {
            status
        }, { new: true, lean: true })
    }
}

export default MenuService