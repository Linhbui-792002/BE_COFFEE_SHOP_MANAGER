import Account from "../models/account.model.js";
import { unGetSelectData } from "../utils/index.js";
import { findKeyTokenByAccountId } from "./keyToken.repo.js";
import { Types } from 'mongoose';


const findAccountByUsername = async ({ username, select = { username: 1, password: 1, status: 1, role: 1 } }) => {
    return await Account.findOne({ username }).select(select).lean();
};

const findEmployeeInAccount = async (employeeId) => {
    if (employeeId == "undefined" || employeeId == null) {
        return null;
    }
    return await Account.findOne({ employeeId }).lean()
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

const getAllAccountsNotExistEmployee = async ({ employeeId, filter = {}, select }) => {
    let employeeFilter = { employeeId: null };

    if (employeeId != 'undefined') {
        employeeFilter = {
            $or: [
                { employeeId: null },
                { employeeId: employeeId }
            ]
        };
    }
    const mergedFilter = { ...filter, ...employeeFilter };
    console.log(mergedFilter, 'mergedFilter');
    const result = await Account.find(mergedFilter)
        .sort({ createdAt: -1 })
        .select(select)
        .lean();
    console.log(result, 'result');
    return result;
};

const findAccount = async ({ accountId, unSelect }) => {
    return await Account.findById(accountId)
        .select(unGetSelectData(unSelect))
        .lean()
}

export { findAccountByUsername, getAllAccounts, findAccount, findEmployeeInAccount, getAllAccountsNotExistEmployee }