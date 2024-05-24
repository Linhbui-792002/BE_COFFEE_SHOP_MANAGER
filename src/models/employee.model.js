'use strict';

import mongoose, { Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'Employee';
const COLLECTION_NAME = 'Employees';

const employeeSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        dob: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: Boolean,
            default: false
        },
        phoneNumber: {
            type: String,
            trim: true,

        },
        hardSalary: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            trim: true
        },
        status: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
const Employee = mongoose.model(DOCUMENT_NAME, employeeSchema);
export default Employee;
