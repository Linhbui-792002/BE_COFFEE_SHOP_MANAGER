import { OK } from "../core/success.response.js";
import ProductCategoryServer from "../services/productCategory.server.js";

class ProductCategoryController {
  static getAllProductCategory = async (req, res, next) => {
    new OK({
      message: "Get all product category success",
      metadata: await ProductCategoryServer.getAllProductCategory(req.query),
    }).send(res);
  };

  static getProductCategoryInfo = async (req, res, next) => {
    new OK({
      message: "Get product category info success",
      metadata: await ProductCategoryServer.getProductCategoryInfo(
        req.params.id
      ),
    }).send(res);
  };

  static updateProductCategory = async (req, res, next) => {
    new OK({
      message: "Update product category success",
      metadata: await ProductCategoryServer.updateProductCategory(req.body),
    }).send(res);
  };

  static createNewProductCategory = async (req, res, next) => {
    new OK({
      message: "Create new product category success",
      metadata: await ProductCategoryServer.createNewProductCategory(req.body),
    }).send(res);
  };
}

export default ProductCategoryController;
