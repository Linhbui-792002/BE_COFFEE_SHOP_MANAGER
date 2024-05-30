import { get } from "mongoose";
import { BadRequestError } from "../core/error.response.js";
import Employee from "../models/employee.model.js";
import { getInfoData } from "../utils/index.js";

const findEmployeeById = async ({
    employeeId,
    select = {
        firstName: 1,
        lastName: 1,
        gender: 1,
        phoneNumber: 1,
        hardSalary: 1,
        address: 1,
        status: 1,
    },
}) => {
    const employee = await Employee.findOne({ _id: employeeId }).select(select).lean();
    if (!employee) throw new BadRequestError("Employee not found !!!");

    return employee
};

const updateEmployee = async ({
    employeeId,
    firstName,
    lastName,
    dob,
    gender,
    phoneNumber,
    hardSalary,
    address,
    status,
}) => {
    await findEmployeeById({ employeeId })

    const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        {
            firstName,
            lastName,
            dob,
            gender,
            phoneNumber,
            hardSalary,
            address,
            status,
        },
        { new: true, lean: true }
    );

    return updatedEmployee;
};

const changeStatusEmployee = async ({ employeeId, status }) => {
    const foundEmployee = await Employee.findOne({ _id: employeeId });

    if (!foundEmployee) throw new BadRequestError("Employee not found !!!");

    const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        {
            status,
        },
        { new: true, lean: true }
    );

    return getInfoData({
        fields: ["_id", "firstName", "lastName", "status"],
        object: updatedEmployee,
    });
};

const getAllEmployees = async ({ filter, select }) => {
    const employees = await Employee.find(filter)
        .sort({ createdAt: -1 })
        .select(select)
        .lean();

    return employees;
};

const getOneEmployee = async ({ employeeId }) => {
    await findEmployeeById({ employeeId })

    const employees = await Employee.findOne({ _id: employeeId }).lean();
    return employees;
};


export {
    findEmployeeById,
    updateEmployee,
    changeStatusEmployee,
    getAllEmployees,
    getOneEmployee
};
