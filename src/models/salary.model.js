'use strict';

import mongoose, { Schema, Types } from 'mongoose';

const DOCUMENT_NAME = 'Salary';
const COLLECTION_NAME = 'Salaries';

const salarySchema = new Schema(
    {
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
        workTerm: {
            type: String,
            required: true,
            trim: true,
        },
        dateOff: {
            type: Number,
            required: true,
        },
        deduction: {
            type: Number,
            required: true,
        },
        bonusPercent: {
            type: Number,
            required: true
        },
        bonus: {
            type: Number,
            required: true
        },
        hardSalary: {
            type: Number,
            required: true
        },
        totalSalary: {
            type: Number,
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

// Add indexes for createdAt and updatedAt
salarySchema.index({ createdAt: 1, updatedAt: 1 }); // 1: Ascending order

//Export the model
const Salary = mongoose.model(DOCUMENT_NAME, salarySchema);
export default Salary;
