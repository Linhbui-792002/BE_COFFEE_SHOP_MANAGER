import { BadRequestError } from "../core/error.response.js"
import { CREATED, OK, SuccessResponse } from "../core/success.response.js"
import AccountService from "../services/account.service.js"
import SalaryService from "../services/salary.service.js"

class SalaryController {
    /*
    * This funciton will create salary for 1 employee
    * Step 1: check that employee is created salary in workTerm or not.
    *       --> if created -> return message.
    * Step 2: check term is valid or not.
    * Step 3: create new salary
    */
    static createSalary = async (req, res, next) => {
        new CREATED({
            message: "Created salary success",
            metadata: await SalaryService.creatSalary(req.body, req.account.accountId),
        }).send(res)
    }

    static getSalary = async (req, res, next) => {
        const {id} = req.params
        new OK({
            message: "Get salary success",
            metadata: await SalaryService.getByFilter({_id: id})
        }).send(res)
    }

    static getAllSalary = async (req, res, next) => {
        new OK({
            message: "Get salary success",
            metadata: await SalaryService.getByFilter()
        }).send(res)
    }

    static updateSalary = async(req, res, next) => {
        new OK({
            message: "Edit salary success",
            metadata: await SalaryService.updateSalary(req.body),
        }).send(res)
    }

    static getListEmployee = async(req, res, next) => {
        new OK({
            message: "Get list employee success",
            metadata: await SalaryService.getAllEmployee(req.body),
        }).send(res)
    }
}

export default SalaryController;