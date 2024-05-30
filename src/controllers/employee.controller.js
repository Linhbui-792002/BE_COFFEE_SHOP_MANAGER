import { CREATED, OK } from "../core/success.response.js"
import EmployeeService from "../services/employee.service.js"

class EmployeeController {

    static createEmployee = async (req, res, next) => {
        new CREATED({
            message: "Create employee success",
            metadata: await EmployeeService.createEmployee(req.body)
        }).send(res)
    }

    static updateEmployee = async (req, res, next) => {
        new OK({
            message: "Update employee success",
            metadata: await EmployeeService.updateEmployee(req.body)
        }).send(res)
    }

    static changeStatusEmployee = async (req, res, next) => {
        new OK({
            message: "Change status employee success",
            metadata: await EmployeeService.changeStatus(req.body)
        }).send(res)
    }


    //QUERY//

    static getAllEmployees = async (req, res, next) => {
        new OK({
            message: "Get all employees success",
            metadata: await EmployeeService.getAllEmployees(req.query)
        }).send(res)
    }

    static getAllEmployeesDoing = async (req, res, next) => {
        new OK({
            message: "Get all employees doing success",
            metadata: await EmployeeService.getAllEmployeesDoing(req.query)
        }).send(res)
    }

    static getInfoEmployee = async (req, res, next) => {
        const employeeId = req.params.id
        new OK({
            message: "Get info employee success",
            metadata: await EmployeeService.getInfoEmployees({ employeeId })
        }).send(res)
    }
}

export default EmployeeController