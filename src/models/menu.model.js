'use strict'

import mongoose, { Schema } from 'mongoose';

const DOCUMENT_NAME = 'Menu';
const COLLECTION_NAME = 'Menus';

const menuSchema = new mongoose.Schema({
    menuInfoId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "MenuInfo"
    },
    name: {
        type: String,
        required: true
    },
    productId: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        }
    ],
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})


//Export the model
const Menu = mongoose.model(DOCUMENT_NAME, menuSchema);
export default Menu
