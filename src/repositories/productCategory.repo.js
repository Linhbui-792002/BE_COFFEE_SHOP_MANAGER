import ProductCategory from '../models/productCategory.model.js';

const findProductCateById = async ({ categoryId }) => {
    const category = await ProductCategory.findOne({ _id: categoryId }).lean()
    return category
}

export { findProductCateById }