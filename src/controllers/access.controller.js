'use strict';

import { OK, SuccessResponse } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {

    static handleRefreshToken = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get token success',
            metadata: await AccessService.handleRefreshToken({
                refreshToken: req.body.refreshToken,
                account: req.account,
                keyStore: req.keyStore
            })
        }).send(res);
    }

    static logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout success!',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res);
    }

    static login = async (req, res, next) => {
        const data = await AccessService.login(req.body)
        new SuccessResponse({
            metadata: data
        }).send(res);
    }

    static changePassword = async (req, res, next) => {
        const { oldPassword, newPassword } = req.body
        const data = await AccessService.changePassword({ account: req.account, oldPassword, newPassword })
        new OK({
            metadata: data
        }).send(res);
    }
}

export default AccessController