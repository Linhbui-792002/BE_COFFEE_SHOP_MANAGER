
import Employee from '../models/employee.model.js';

const findEmployeeById = async ({
    employeeId,
    select = { firstName: 1, lastName: 1, gender: 1, phoneNumber: 1, hardSalary: 1, address: 1, status: 1 }
}) => {
    return await Employee.findOne({ _id: employeeId }).select(select).lean();
};



export { findEmployeeById, }