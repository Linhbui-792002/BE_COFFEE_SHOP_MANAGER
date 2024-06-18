"use strict";
import express from "express";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { authentication, checkAdminRole } from "../auth/authUtils.js";
import OrderController from "../controllers/order.controller.js";

const routerOrder = express.Router();

// authentication
routerOrder.use(asyncHandler(authentication));

routerOrder.post("/", asyncHandler(OrderController.createOrder));

// Role admin
routerOrder.use(asyncHandler(checkAdminRole));

routerOrder.get("/", asyncHandler(OrderController.getAllOrders));
routerOrder.get("/:id", asyncHandler(OrderController.getOrderInfo));

export default routerOrder;
