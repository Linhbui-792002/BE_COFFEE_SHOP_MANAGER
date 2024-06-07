import mongoose from "mongoose";
import {creatSalary, getSalary, updateSalary, getAllEmployees, getSalaryStatics} from "../repositories/salary.repo.js"
import EmployeeService from "./employee.service.js";
import { BadRequestError } from "../core/error.response.js";

class SalaryService {
    static creatSalary = async ({employeeId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary}, createdBy) => {
        //create filter.
        const query = {
            "employeeId" : new mongoose.Types.ObjectId(employeeId),
            "workTerm" : workTerm
        }
        if(!query.employeeId){
            throw new BadRequestError("Employee not found !!!");
        }
        if(!query.workTerm){
            throw new BadRequestError("Work term is not found !!!");
        }

        //Step 1:
        const isCreated = await this.getByFilter(query);
        if(isCreated){
            throw new BadRequestError("This employee salary already created for this term!");
        }

        //Step 2:
        delete query.workTerm;
        const dateWorkTerm = String(workTerm).split("-")
        const date = new Date(dateWorkTerm[0].trim(), dateWorkTerm[1].trim() - 1)
        const employeeInfo = await EmployeeService.getInfoEmployees(query);
        const dateCreated = new Date(new Date(employeeInfo.createdAt).getFullYear(), new Date(employeeInfo.createdAt).getMonth());
        if(dateCreated.getTime() > new Date(date).getTime()){
            throw new BadRequestError(`Work term must be greater than month ${employeeInfo.createdAt.getMonth() + 1} year ${employeeInfo.createdAt.getFullYear()}`);
        }

        return await creatSalary({employeeId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary, createdBy});
    } 

    static getSalaryStatics = async (query) => {
        return await getSalaryStatics(query);
    }

    static updateSalary = async ({salaryId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary}) => {
        return await updateSalary({_id: salaryId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary});
    }

    static getAllEmployee = async({filter = { status: true }, select = ['_id', 'firstName', 'lastName', 'hardSalary'] }) => {
        return await getAllEmployees(filter, select)
    }

    static getByFilter = async(filter) => {
        return await getSalary({filter});
    }
}


export default SalaryService;