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

    static blockAccount = async (req, res, next) => {
        new OK({
            message: "Block account success",
            metadata: await AccountService.blockAccount(req.body)
        }).send(res)
    }
    static resetPassword = async (req, res, next) => {
        new OK({
            message: "Reset password success",
            metadata: await AccountService.resetPassword(req.body)
        }).send(res)
    }

    static getAllAccounts = async (req, res, next) => {
        const result = await AccountService.getAllAccounts(req.query)
        new SuccessResponse({
            message: "Get all account success",
            metadata: result.metadata,
            options: result.options
        }).send(res)
    }
    static getAllAccountsNotExistEmployee = async (req, res, next) => {
        const { employeeId } = req.params
        new SuccessResponse({
            message: "Get all account not employee success",
            metadata: await AccountService.getAllAccountsNotExistEmployee({ employeeId, ...req.query }),
        }).send(res)
    }

    static findOneAccount = async (req, res, next) => {
        new SuccessResponse({
            message: "Get one account success",
            metadata: await AccountService.findOneAccount(
                { accountId: req.params.accountId }
            )
        }).send(res)
    }
}

export default AccountController