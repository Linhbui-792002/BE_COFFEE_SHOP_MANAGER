'use strict';

import mongoose, { Schema } from 'mongoose';

const DOCUMENT_NAME = 'KeyToken';
const COLLECTION_NAME = 'KeyTokens';

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Account',
        },
        privateKey: {
            type: String,
            required: true,
            trim: true,
        },
        publicKey: {
            type: String,
            required: true,
            trim: true,
        },
        refreshTokensUsed: {
            type: Array,
            default: [],
        },
        refreshToken: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
const KeyToken = mongoose.model(DOCUMENT_NAME, keyTokenSchema);
export default KeyToken;
