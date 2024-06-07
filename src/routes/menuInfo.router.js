'use strict';
import express from "express";
import { authentication, checkAdminRole } from "../auth/authUtils.js";
import { asyncHandler } from '../helpers/asyncHandler.js';
import MenuInfoController from "../controllers/menuInfo.controller.js";

const routerMenuInfo = express.Router()

// authentication
routerMenuInfo.use(asyncHandler(authentication));

routerMenuInfo.get("/", asyncHandler(MenuInfoController.getAllMenuInfo))

// Role admin
routerMenuInfo.use(asyncHandler(checkAdminRole));

routerMenuInfo.get("/:id", asyncHandler(MenuInfoController.getOneMenuInfo))
routerMenuInfo.post("/", asyncHandler(MenuInfoController.addNewMenuInfo))
routerMenuInfo.patch("/", asyncHandler(MenuInfoController.updateMenuInfo))

export default routerMenuInfo