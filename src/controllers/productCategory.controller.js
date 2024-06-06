import { OK } from "../core/success.response.js";
import ProductCategoryService from "../services/productCategory.service.js";

class ProductCategoryController {
  static getAllProductCategory = async (req, res, next) => {
    new OK({
      message: "Get all product category success",
      metadata: await ProductCategoryService.getAllProductCategory(req.query),
    }).send(res);
  };

  static getProductCategoryInfo = async (req, res, next) => {
    new OK({
      message: "Get product category info success",
      metadata: await ProductCategoryService.getProductCategoryInfo(
        req.params.id
      ),
    }).send(res);
  };

  static updateProductCategory = async (req, res, next) => {
    new OK({
      message: "Update product category success",
      metadata: await ProductCategoryService.updateProductCategory(req.body),
    }).send(res);
  };

  static createNewProductCategory = async (req, res, next) => {
    new OK({
      message: "Create new product category success",
      metadata: await ProductCategoryService.createNewProductCategory(req.body),
    }).send(res);
  };
}

export default ProductCategoryController;
