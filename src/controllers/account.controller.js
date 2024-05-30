import { CREATED, OK, SuccessResponse } from "../core/success.response.js"
import AccountService from '../services/account.service.js';

class AccountController {

    static createAccount = async (req, res, next) => {
        new CREATED({
            message: "Create account success",
            metadata: await AccountService.createAccount(req.body)
        }).send(res)
    }
    static updateAccount = async (req, res, next) => {
        new OK({
            message: "Update account success",
            metadata: await AccountService.updateAccount(req.body)
        }).send(res)
    }

    static resetPassword = async (req, res, next) => {
        new OK({
            message: "Reset password success",
            metadata: await AccountService.resetPassword(req.body)
        }).send(res)
    }

    static getAllAccounts = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all account success",
            metadata: await AccountService.getAllAccounts(req.query)
        }).send(res)
    }
}

export default AccountController