"use strict";

import mongoose, { Schema, Types } from "mongoose";

const DOCUMENT_NAME = "General";
const COLLECTION_NAME = "General";

const generalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
    favicon: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
const General = mongoose.model(DOCUMENT_NAME, generalSchema);
export default General;
