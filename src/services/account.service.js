'use strict';
import bcrypt from 'bcrypt';
import { BadRequestError, ConflictRequestError } from "../core/error.response.js";
import Account from "../models/account.model.js";
import KeyTokenService from './keyToken.service.js';
import { getInfoData } from '../utils/index.js';
import { findEmployeeById } from '../repositories/employee.repo.js';
import { PASSWORD_RESET } from '../constants/index.js';
import { findAccount, getAllAccounts, getAllAccountsNotExistEmployee } from '../repositories/account.repo.js';


class AccountService {

    // POST //

    static createAccount = async ({ username, password, status, role, employeeId }) => {

        const foundAccount = await Account.findOne({ username }).lean();
        if (foundAccount) throw new ConflictRequestError("Account already registered!")

        if (!_.isEmpty(employeeId)) {
            const foundEmployee = await findEmployeeById({ employeeId });
            if (!foundEmployee) throw new BadRequestError("Employee not exists");
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const newAccount = await Account.create({
            username,
            password: passwordHash,
            status,
            role,
            employeeId: !_.isEmpty(employeeId) ? employeeId : null
        })

        return {

            account: getInfoData({
                fields: ['_id', 'username', 'role', 'employeeId', 'status'],
                object: newAccount
            })

        }


    }

    // PATCH //
    static updateAccount = async ({ accountId, status, role, employeeId }) => {

        const foundAccount = await Account.findOne({ _id: accountId }).lean();
        if (!foundAccount) throw new BadRequestError("Account not exits!")

        const updatedAccount = await Account.findByIdAndUpdate(
            accountId,
            {
                status,
                role,
                employeeId: !_.isEmpty(employeeId) ? employeeId : null
            },
            { new: true, lean: true }
        );

        return {
            account: getInfoData({
                fields: ['_id', 'username', 'role', 'employeeId', 'status'],
                object: updatedAccount
            })
        }
    }

    static blockAccount = async ({ accountId, status }) => {

        const foundAccount = await Account.findOne({ _id: accountId }).lean();
        if (!foundAccount) throw new BadRequestError("Account not exits!")

        const updatedAccount = await Account.findByIdAndUpdate(
            accountId,
            {
                status,
            },
            { new: true, lean: true }
        );

        await KeyTokenService.deleteKeyByAccountId(accountId)

        return {
            account: getInfoData({
                fields: ['_id', 'username', 'role', 'employeeId', 'status'],
                object: updatedAccount
            })
        }
    }

    static resetPassword = async ({ accountId }) => {

        const foundAccount = await Account.findOne({ _id: accountId }).lean();
        if (!foundAccount) throw new BadRequestError("Account not exits!")


        const passwordHash = await bcrypt.hash(PASSWORD_RESET, 10)
        const updatedAccount = await Account.findByIdAndUpdate(
            accountId,
            {
                password: passwordHash
            },
            { new: true, lean: true }
        );

        return {
            account: getInfoData({
                fields: ['_id', 'username', 'role', 'employeeId', 'status'],
                object: updatedAccount
            })
        }
    }

    // QUERY //

    static getAllAccounts = async ({ filter = {}, select = ['_id', 'username', 'role', 'status', 'createdAt', 'updatedAt'] }) => {
        return await getAllAccounts({ filter, select })
    }

    static getAllAccountsNotExistEmployee = async ({ employeeId = null, filter = { status: false }, select = ['_id', 'username', 'role', 'employeeId'] }) => {
        return await getAllAccountsNotExistEmployee({ employeeId, filter, select })
    }


    static findOneAccount = async ({ accountId, unSelect = ['password', '_v'] }) => {
        return await findAccount({ accountId, unSelect })
    }
}


export default AccountService;