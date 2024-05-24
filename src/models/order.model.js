'use strict';

import mongoose, { Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';

const voucherUsedSchema = new Schema({
    voucherId: {
        type: Schema.Types.ObjectId,
        ref: "Voucher"
    },
    voucherPercent: {
        type: Number,
        required: true
    }
})

const orderDetailSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    voucherUsed: [voucherUsedSchema]
})

const orderSchema = new Schema(
    {
        totalMoney: {
            type: Number,
            required: true,
        },
        receivedMoney: {
            type: Number,
            required: true,
        },
        excessMoney: {
            type: Number,
            required: true,
        },
        voucherUsed: [voucherUsedSchema],
        orderDetail: [orderDetailSchema],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

// Add indexes for createdAt and updatedAt
orderSchema.index({ createdAt: 1, updatedAt: 1, createdBy: 1 }); // 1: Ascending order


//Export the model
const Order = mongoose.model(DOCUMENT_NAME, orderSchema);
export default Order;
