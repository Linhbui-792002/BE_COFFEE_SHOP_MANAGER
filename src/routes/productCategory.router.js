import express from "express";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { authentication, checkAdminRole } from "../auth/authUtils.js";
import ProductCategoryController from "../controllers/productCategory.controller.js";

const routerProductCategory = express.Router();

// authentication
routerProductCategory.use(asyncHandler(authentication));

routerProductCategory.get(
  "/",
  asyncHandler(ProductCategoryController.getAllProductCategory)
);

routerProductCategory.get(
  "/:id",
  asyncHandler(ProductCategoryController.getProductCategoryInfo)
);

// Role admin
routerProductCategory.use(asyncHandler(checkAdminRole));

routerProductCategory.post(
  "/",
  asyncHandler(ProductCategoryController.createNewProductCategory)
);

routerProductCategory.patch(
  "/",
  asyncHandler(ProductCategoryController.updateProductCategory)
);

export default routerProductCategory;
