import Account from "../models/account.model.js";
import { unGetSelectData } from "../utils/index.js";
import { findKeyTokenByAccountId } from "./keyToken.repo.js";
import { Types } from 'mongoose';


const findAccountByUsername = async ({ username, select = { username: 1, password: 1, status: 1, role: 1 } }) => {
    return await Account.findOne({ username }).select(select).lean();
};

const findEmployeeInAccount = async (employeeId) => {
    if (!employeeId) {
        return null;
    }
    return await Account.findOne({ employeeId: new Types.ObjectId(employeeId) }).lean()
}

const getAllAccounts = async ({ filter, select }) => {
    const totalAccount = await Account.countDocuments({});
    const totalAccountBlock = await Account.countDocuments({ status: true });
    let totalAccountOnline = 0
    const accounts = await Account.find(filter)
        .sort({ createdAt: -1 })
        .select(select)
        .lean()

    const result = await Promise.all(accounts.map(
        async (account) => {
            const onlineStatus = await findKeyTokenByAccountId(account?._id)
            totalAccountOnline += onlineStatus ? 1 : 0
            return { ...account, onlineStatus }
        }))

    const options = {
        totalAccount,
        totalAccountBlock,
        totalAccountOnline,
        totalAccountOffline: totalAccount - totalAccountOnline
    }

    return { metadata: result, options }
}

const getAllAccountsNotExistEmployee = async ({ employeeId, filter, select }) => {
    const result = []

    const accounts = await Account.find(filter)
        .sort({ createdAt: -1 })
        .select(select)
        .lean();
    await Promise.all(accounts.map(async (account) => {
        const isExist = employeeId ? await findEmployeeInAccount(employeeId) : false
        const isEmployee = (isExist && employeeId ? String(isExist?.employeeId) === employeeId : false)
        if (!isExist || isEmployee) {
            result.push(account)
        }
    }))

    return result;

}

const findAccount = async ({ accountId, unSelect }) => {
    return await Account.findById(accountId)
        .select(unGetSelectData(unSelect))
        .lean()
}

export { findAccountByUsername, getAllAccounts, findAccount, findEmployeeInAccount, getAllAccountsNotExistEmployee }