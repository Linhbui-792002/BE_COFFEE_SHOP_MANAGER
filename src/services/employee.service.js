import Employee from "../models/employee.model.js";
import {
  changeStatusEmployee,
  getAllEmployees,
  getAllEmployeesNotExistAccount,
  getOneEmployee,
  updateEmployee,
} from "../repositories/employee.repo.js";

class EmployeeService {
  static createEmployee = async ({
    firstName,
    lastName,
    dob,
    gender,
    phoneNumber,
    hardSalary,
    address,
    status,
  }) => {
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      dob,
      gender,
      phoneNumber,
      hardSalary,
      address,
      status,
    });

    return newEmployee;
  };

  static updateEmployee = async (payload) => {
    return await updateEmployee(payload);
  };

  static changeStatus = async (payload) => {
    return await changeStatusEmployee(payload);
  };

  static getAllEmployees = async ({
    filter = {},
    select = [
      "_id",
      "firstName",
      "lastName",
      "phoneNumber",
      "hardSalary",
      "gender",
      "status",
      "createdAt",
      "updatedAt",
    ],
  }) => {
    return await getAllEmployees({ filter, select });
  };

  static getAllEmployeesDoing = async ({
    filter = { status: true },
    select = ["_id", "firstName", "lastName"],
  }) => {
    return await getAllEmployees({ filter, select });
  };

  static getAllEmployeesNotExistAccount = async ({
    accountId = null,
    filter = { status: true },
    select = ["_id", "firstName", "lastName"],
  }) => {
    return await getAllEmployeesNotExistAccount({ accountId, filter, select });
  };

  static getInfoEmployees = async ({ employeeId }) => {
    return await getOneEmployee({ employeeId });
  };
}

export default EmployeeService;
