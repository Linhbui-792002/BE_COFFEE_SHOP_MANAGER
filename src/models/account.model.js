'use strict';

import mongoose, { Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'Account';
const COLLECTION_NAME = 'Accounts';

const accountSchema = new Schema(
    {
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
        username: {
            type: String,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: Schema.Types.Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["Admin", "Employee"],
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
const Account = mongoose.model(DOCUMENT_NAME, accountSchema);
export default Account;
