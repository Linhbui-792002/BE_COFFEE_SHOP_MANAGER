'use strict';

import express from "express";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { authentication, checkAdminRole } from "../auth/authUtils.js";
import MenuController from "../controllers/menu.controller.js";


const routerMenu = express.Router()

// authentication
routerMenu.use(asyncHandler(authentication));

routerMenu.get("/getMenu/forEmployee", asyncHandler(MenuController.getAllMenuPublic))

// Role admin
routerMenu.use(asyncHandler(checkAdminRole));

routerMenu.get("/", asyncHandler(MenuController.getAllMenu))
routerMenu.get("/:id", asyncHandler(MenuController.getMenuInfo))
routerMenu.post("/", asyncHandler(MenuController.createMenu))
routerMenu.patch("/", asyncHandler(MenuController.updateMenu))
routerMenu.patch("/changeStatus", asyncHandler(MenuController.changeStatus))


export default routerMenu