import { BadRequestError } from "../core/error.response.js"
import Product from "../models/product.model.js"
import { createProduct, findProductById, getAllProduct, getProductInfo, searchProductByEmployee, updateProduct } from "../repositories/product.repo.js"

class ProductService {
    static getAllProducts = async ({ limit = 5, page = 1, keySearch = "", filter, select = ['_id', 'name', 'category', 'isCombo', 'costPrice', 'price', 'image', 'status', 'quantity'] }) => {
        return await getAllProduct({ limit, page, keySearch, filter, select })
    }

    static getAllProductsPublic = async ({ filter = { status: true }, select = ['_id', 'name', 'category', 'isCombo', 'costPrice', 'price', 'image', 'status', 'quantity'] }) => {
        return await Product.find(filter)
            .sort({ createdAt: -1 })
            .select(select)
            .lean();
    }

    static searchProductsByEmployee = async ({ keySearch }) => {
        return await searchProductByEmployee({ keySearch })
    }

    static getProductInfo = async ({ productId }) => {
        return await getProductInfo({ productId })
    }

    static createProduct = async ({ name, categoryId, detail, isCombo, productCombo, costPrice, price, image, quantity, status }) => {
        return await createProduct({ name, categoryId, detail, isCombo, productCombo, costPrice, price, image, quantity, status })
    }

    static updateProduct = async ({ productId, name, categoryId, detail, isCombo, productCombo, costPrice, price, image, quantity, status }) => {
        return await updateProduct({ productId, name, categoryId, detail, isCombo, productCombo, costPrice, price, image, quantity, status })
    }

    static changeStatusProduct = async ({ productId, status }) => {
        const product = await findProductById({ productId })
        if (!product) throw new BadRequestError('Product not found')
        return await Product.findByIdAndUpdate(productId,
            { status },
            { new: true, lean: true })
    }
}

export default ProductService