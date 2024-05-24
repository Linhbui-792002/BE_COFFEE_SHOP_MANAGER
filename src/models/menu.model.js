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
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
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


//Export the model
const Menu = mongoose.model(DOCUMENT_NAME, menuSchema);
export default Menu
