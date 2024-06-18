'use strict';

import express from "express";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { authentication, checkAdminRole } from "../auth/authUtils.js";
import ProductController from "../controllers/product.controller.js";


const routerProduct = express.Router()

// authentication
routerProduct.use(asyncHandler(authentication));

//Role employee
routerProduct.get("/search/:keySearch", asyncHandler(ProductController.searchProductsByEmployee));

// Role admin
routerProduct.use(asyncHandler(checkAdminRole));


routerProduct.get("/", asyncHandler(ProductController.getAllProduct))
routerProduct.get("/:id", asyncHandler(ProductController.getProductInfo))
routerProduct.get("/getProduct/productsPublic", asyncHandler(ProductController.getAllProductPublic))
routerProduct.post("/", asyncHandler(ProductController.createProduct))
routerProduct.patch("/", asyncHandler(ProductController.updateProduct))
routerProduct.patch("/changeStatus", asyncHandler(ProductController.changeStatusProduct))


export default routerProduct