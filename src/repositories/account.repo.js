import Account from "../models/account.model.js";


const findAccountByUsername = async ({ username, select = { username: 1, password: 1, status: 1, role: 1 } }) => {
    return await Account.findOne({ username }).select(select).lean();
};

const findAllAccounts = async ({ filter, select }) => {
    const accounts = await Account.find(filter)
        .sort({ createdAt: -1 })
        .select(select)
        .lean()

    return accounts
}

export { findAccountByUsername, findAllAccounts }