import mongoose from "mongoose";
import Salary from "../models/salary.model.js";

const creatSalary = async ({employeeId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary, createdBy},) => {
    return await Salary.create({
        employeeId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary, createdBy});
}

const getDetailSalary = async (_id) => {
    return await Salary.find({"id": new ObjectId(_id)}).lean();
}

const getSalary = async (query) => {
    const queryDb = [
        {
            $lookup: {
                from: "Employees",
                localField: "employeeId",
                foreignField: "_id",
                as: "employeeInfo"
            }
        },
        {
            $addFields: {
                employeeInfo: { $first: "$employeeInfo" }
            }
        },
        {
            $group: {
                _id: "$workTerm",
                data: {
                    $push: {
                        hardSalary: "$hardSalary",
                        bonus: "$bonus",
                        bonusPercent: "$bonusPercent",
                        deduction: "$deduction",
                        totalSalary: "$totalSalary",
                        employeeName: {
                        $concat: [
                            "$employeeInfo.lastName",
                            " ",
                            "$employeeInfo.firstName"
                        ]
                        }
                    }
                }
            }
        }
    ]
    query ? queryDb.unshift({$match: {employeeId: new mongoose.Types.ObjectId(query)}}) : null;
    return await Salary.aggregate(queryDb);
}

const updateSalary = async ({salaryId, workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary},) => {
    return await Salary.findByIdAndUpdate(salaryId, {workTerm, dateOff, deduction, bonusPercent, bonus, hardSalary, totalSalary});
}

export { creatSalary, getSalary, getDetailSalary, updateSalary }