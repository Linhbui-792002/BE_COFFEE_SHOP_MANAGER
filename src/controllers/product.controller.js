'use strict';

import { CREATED, OK } from "../core/success.response.js";
import ProductService from "../services/product.service.js";
import { removeKeys } from "../utils/index.js";

class ProductController {

    static getAllProduct = async (req, res, next) => {
        const query = req.query
        const filter = removeKeys(query, ['limit', 'page', 'keySearch'])
        const { products, options } = await ProductService.getAllProducts({ ...query, filter })
        new OK({
            message: "Get all products success",
            metadata: products,
            options: options
        }).send(res)
    }

    static getAllProductPublic = async (req, res, next) => {
        new OK({
            message: "Get all products public success",
            metadata: await ProductService.getAllProductsPublic(req.query)
        }).send(res)
    }

    static getProductInfo = async (req, res, next) => {
        new OK({
            message: "Get product info success",
            metadata: await ProductService.getProductInfo({ productId: req.params.id })
        }).send(res)
    }

    static searchProductsByEmployee = async (req, res, next) => {
        console.log(req.params.keySearch, 'req.params.keySearch');
        new OK({
            message: "Get product success",
            metadata: await ProductService.searchProductsByEmployee({ keySearch: req.params.keySearch })
        }).send(res)
    }

    static createProduct = async (req, res, next) => {
        const { body } = req
        new CREATED({
            message: "Create product success",
            metadata: await ProductService.createProduct(body)
        }).send(res)
    }

    static updateProduct = async (req, res, next) => {
        new OK({
            message: "Update product success",
            metadata: await ProductService.updateProduct(req.body)
        }).send(res)
    }

    static changeStatusProduct = async (req, res, next) => {
        new OK({
            message: "Change status product success",
            metadata: await ProductService.changeStatusProduct(req.body)
        }).send(res)
    }
}


export default ProductController