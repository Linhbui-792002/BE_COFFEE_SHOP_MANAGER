import { BadRequestError } from "../core/error.response.js";
import ProductCategory from "../models/productCategory.model.js";

class ProductCategoryService {
  // Query
  static getAllProductCategory = async ({
    filter = {},
    select = ["name", "createdAt", "updatedAt"],
  }) => {
    return await ProductCategory.find(filter).select(select);
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

  static updateProductCategory = async ({ productCategoryId, name }) => {
    await this.getProductCategoryInfo(productCategoryId);
    return await ProductCategory.findOneAndUpdate(
      { _id: productCategoryId },
      { name },
      { new: true }
    );
  };

  static createNewProductCategory = async ({ name }) => {
    return await ProductCategory.create({ name });
  };
}

export default ProductCategoryService;
