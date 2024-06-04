import { BadRequestError } from "../core/error.response.js"
import { CREATED, OK, SuccessResponse } from "../core/success.response.js"
import AccountService from "../services/account.service.js"
import EmployeeService from "../services/employee.service.js"
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
       
        //create filter.
        const query = {
            "employeeId" : req.body.employeeId,
            "workTerm" : req.body.workTerm
        }
        if(!query.employeeId){
            throw new BadRequestError("Employee not found !!!");
        }
        if(!query.workTerm){
            throw new BadRequestError("Work term is not found !!!");
        }

        //Step 1:
        const isCreated = await SalaryService.getByFilter(query);
        if(isCreated){
            throw new BadRequestError("This employee salary already created for this term!");
        }

        //Step 2:
        delete query.workTerm;
        const employeeInfo = await EmployeeService.getInfoEmployees(query);
        if(new Date(employeeInfo.createdAt).getTime() > new Date(req.body.workTerm).getTime()){
            throw new BadRequestError(`Work term must be greater than month ${employeeInfo.createdAt.getMonth() + 1} year ${employeeInfo.createdAt.getFullYear()}`);
        }

        new CREATED({
            message: "Created salary success",
            metadata: await SalaryService.creatSalary(req.body),
        }).send(res)
    }

    static getSalary = async (req, res, next) => {
        new OK({
            message: "Get salary success",
            metadata: await SalaryService.getSalary(req.body.employeeId)
        }).send(res)
    }

    static updateSalary = async(req, res, next) => {
        const id = req.body._id;
        if(!id){
            throw new BadRequestError("Missing data require: _id");
        }

        const salaryDetai = await SalaryService.getDetailSalary(id);
        if(!salaryDetai){
            throw new BadRequestError("Salary not found!");
        }

        new CREATED({
            message: "Created salary success",
            metadata: await SalaryService.updateSalary(req.body),
        }).send(res)
    }
}

export default SalaryController;