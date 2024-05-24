'use strict';

import mongoose, { Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'Voucher';
const COLLECTION_NAME = 'Vouchers';

const voucherSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            trim: true,
        },
        detail: {
            type: String,
            required: true,
            trim: true,
        },
        voucherPercent: {
            type: Number,
            required: true,
        },
        maxDiscount: {
            type: Number,
            required: true
        },
        numberVoucher: {
            type: Number,
            required: true
        },
        type: {
            type: Boolean,
            default: true
        },
        autoUse: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        productId: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        productCategoryId: [
            {
                type: Schema.Types.ObjectId,
                ref: "ProductCategory"
            }
        ],
        menuInfoId: [
            {
                type: Schema.Types.ObjectId,
                ref: "MenuInfo"
            }
        ]

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
const Voucher = mongoose.model(DOCUMENT_NAME, voucherSchema);
export default Voucher;
