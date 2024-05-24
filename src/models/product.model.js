'use strict'

import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const productSchema = new mongoose.Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "ProductCategory"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    isCombo: {
        type: Boolean,
        required: true,
        default: false
    },
    productCombo: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: function () {
                    return this.isCombo;
                }
            },
            quantity: {
                type: Number,
                required: true
            }

        }
    ],
    costPrice: {
        type: Number,
        required: true,

    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        require: true,
        trim: true
    },
    quantity: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

// create index for search
productSchema.index({ name: 'text', detail: 'text' })

//Export the model
const Product = mongoose.model(DOCUMENT_NAME, productSchema);
export default Product
