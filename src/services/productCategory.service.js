import { BadRequestError } from "../core/error.response.js";
import ProductCategory from "../models/productCategory.model.js";

class ProductCategoryService {
  // Query
  static getAllProductCategory = async ({
    filter = {},
    select = ["_id", "name", "status", "createdAt", "updatedAt"],
  }) => {
    return await ProductCategory.find(filter)
      .sort({ createdAt: -1 })
      .select(select)
      .lean();
  };

  static getProductCategoryInfo = async (productCategoryId) => {
    const getProductCategoryInfo = await ProductCategory.findOne({
      _id: productCategoryId,
    });
    if (!getProductCategoryInfo) {
      throw new BadRequestError("Product Category Not Found");
    }
    return getProductCategoryInfo;
  };

  static getAllProductCategoryActive = async ({
    filter = {
      status: true,
    },
    select = ["_id", "name", "status", "createdAt", "updatedAt"],
  }) => {
    return await ProductCategory.find(filter)
      .sort({ createdAt: -1 })
      .select(select)
      .lean();
  };

  static updateProductCategory = async ({
    productCategoryId,
    name,
    status,
  }) => {
    await this.getProductCategoryInfo(productCategoryId);
    return await ProductCategory.findOneAndUpdate(
      { _id: productCategoryId },
      { name, status },
      { new: true }
    );
  };

  static createNewProductCategory = async ({ name }) => {
    return await ProductCategory.create({ name });
  };
}

export default ProductCategoryService;
