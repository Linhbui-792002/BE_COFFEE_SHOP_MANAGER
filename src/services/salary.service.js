import {creatSalary, getSalary, updateSalary} from "../repositories/salary.repo.js"

class SalaryService {
    static creatSalary = async ({employeeId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary, createdBy}) => {
        return await creatSalary({employeeId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary, createdBy});
    } 

    static getSalary = async (query) => {
        return await getSalary(query);
    }

    static updateSalary = async ({salaryId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary}) => {
        return await updateSalary({salaryId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary});
    }
}


export default SalaryService;