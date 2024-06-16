import { populate } from "dotenv";
import { BadRequestError, NotFoundError } from "../core/error.response.js"
import Product from "../models/product.model.js"
import { findProductCateById } from "./productCategory.repo.js"

const getAllProduct = async ({ keySearch, limit, page, filter, select }) => {
    const skip = (page - 1) * limit;
    let searchCriteria = { ...filter };

    if (keySearch) {
        const regexSearch = new RegExp(keySearch);
        searchCriteria = { ...searchCriteria, $text: { $search: regexSearch }, }
    }

    const products = await Product.find(searchCriteria)
        .populate('categoryId', '_id name')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .select(select)
        .lean();

    const totalCount = await Product.countDocuments(searchCriteria);
    const options = {
        pageSize: limit,
        pageIndex: page,
        totalRecords: totalCount,
    }
    return { products, options };
}

const getProductInfo = async ({ productId }) => {
    return await Product.findOne({ _id: productId })
        .populate('categoryId', '_id name')
        .populate({
            path: 'productCombo',
            populate: { path: 'productId', select: '_id name image costPrice price' }
        })
        .exec()
}

const searchProductByEmployee = async ({ keySearch }) => {
    const regexSearch = new RegExp(keySearch)
    const results = await Product.find({
        status: true,
        $text: { $search: regexSearch },
    }, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .lean()
    return results

}
const findProductById = async ({ productId }) => {
    return await Product.findOne({ _id: productId }).lean()
}

const updateProduct = async ({ productId, name, categoryId, detail, isCombo, productCombo, costPrice, price, image, quantity, status }) => {

    const product = await findProductById({ productId })
    if (!product) throw new BadRequestError('Product not existed !')

    const productCategory = await findProductCateById({ categoryId })
    if (!productCategory) throw new NotFoundError('Category not found')

    const isExistName = await Product.findOne({ name: new RegExp('^' + name + '$', 'i'), _id: { $ne: productId } }).lean()
    if (isExistName) throw new BadRequestError("Product name existed")

    return await Product.findByIdAndUpdate(
        productId,
        { name, categoryId, detail, isCombo, productCombo, costPrice, price, image, quantity, status },
        { new: true, lean: true }
    )
}

const createProduct = async ({ name, categoryId, detail, isCombo, productCombo, costPrice, price, image, quantity, status }) => {
    const productCategory = await findProductCateById({ categoryId })
    if (!productCategory) throw new NotFoundError('Category not found')

    const isExistName = await Product.findOne({ name: new RegExp('^' + name + '$', 'i') }).lean()
    if (isExistName) throw new BadRequestError("Product name existed")

    return Product.create({ name, categoryId, detail, isCombo, productCombo, costPrice, price, image, quantity, status })
}

export { createProduct, getAllProduct, findProductById, updateProduct, getProductInfo, searchProductByEmployee }