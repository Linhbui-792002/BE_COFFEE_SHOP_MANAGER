"use strict";

import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
import { BadRequestError } from "../core/error.response.js";

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ProductCategory",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    detail: {
      type: String,
      required: true,
      trim: true,
    },
    isCombo: {
      type: Boolean,
      required: true,
      default: false,
    },
    productCombo: [
      {
        _id: false,
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: function () {
            return this.isCombo;
          },
        },
        quantity: {
          type: Number,
          required: function () {
            return this.isCombo;
          },
        },
      },
    ],
    costPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      require: true,
      trim: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

// trigger
productSchema.pre("save", function (next) {
  if (this.isCombo) {
    if (!this.productCombo || this.productCombo.length === 0) {
      return next(
        new BadRequestError("Please select product in product combo")
      );
    }

    for (let comboItem of this.productCombo) {
      if (!comboItem.productId) {
        return next(new BadRequestError("Not found product in product combo"));
      }
      if (!comboItem.quantity) {
        return next(
          new BadRequestError("There is no quantity in the product combo")
        );
      }
    }
  }
  next();
});

// create index for search
productSchema.index({ name: "text", detail: "text" });

//Export the model
const Product = mongoose.model(DOCUMENT_NAME, productSchema);
export default Product;
