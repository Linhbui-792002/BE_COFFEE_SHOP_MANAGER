'use strict';

import mongoose, { Schema } from 'mongoose';

const DOCUMENT_NAME = 'ProductCategory';
const COLLECTION_NAME = 'ProductCategories';

const productCateSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
const ProductCategory = mongoose.model(DOCUMENT_NAME, productCateSchema);
export default ProductCategory;
