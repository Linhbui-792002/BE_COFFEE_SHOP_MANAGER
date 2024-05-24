'use strict';

import mongoose, { Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'MenuInfo';
const COLLECTION_NAME = 'MenuInfos';

const menuInfoSchema = new Schema(
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
const MenuInfo = mongoose.model(DOCUMENT_NAME, menuInfoSchema);
export default MenuInfo;
