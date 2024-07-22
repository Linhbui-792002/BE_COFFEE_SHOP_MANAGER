'use strict';

import mongoose, { Schema, Types } from 'mongoose';
import { BadRequestError } from "../core/error.response.js";

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

//trigger
voucherSchema.pre('find', async function (next) {
    const currentDate = new Date();
    try {
        
        // Update vouchers where the current date is within the start and end dates
        const resultActive = await mongoose.model('Voucher').updateMany(
            { startDate: { $lte: currentDate }, endDate: { $gte: currentDate } },
            { $set: { status: true } }
        );
        const resultInactiveNumVoucherZero = await mongoose.model('Voucher').updateMany(
            { numberVoucher: { $lte: 0 } },
            { $set: { status: false } }
        );
        console.log(`Active vouchers updated: ${resultInactiveNumVoucherZero.nModified}`);

        // Update vouchers where the current date is outside the start and end dates
        const resultInactive = await mongoose.model('Voucher').updateMany(
            { $or: [{ startDate: { $gt: currentDate } }, { endDate: { $lt: currentDate } }] },
            { $set: { status: false } }
        );
        console.log(`Inactive vouchers updated: ${resultInactive.nModified}`);
    } catch (error) {
        console.error('Error during voucher status update:', error.message);
        return next(new BadRequestError('Error updating voucher status'));
    }
    next();
});

//Export the model
const Voucher = mongoose.model(DOCUMENT_NAME, voucherSchema);
export default Voucher;
