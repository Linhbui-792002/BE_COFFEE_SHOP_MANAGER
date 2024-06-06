'use strict';
import { createTokenPair } from '../auth/authUtils.js';
import { BadRequestError } from '../core/error.response.js';
import Account from '../models/account.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import KeyTokenService from './keyToken.service.js';
import { getInfoData } from '../utils/index.js';
import { findAccountByUsername } from '../repositories/account.repo.js';
import { findKeyTokenByAccountId } from '../repositories/keyToken.repo.js';

class AccessService {

    static handleRefreshToken = async ({ refreshToken, account, keyStore }) => {

        const { accountId, username, role } = account;

        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteKeyByAccountId(accountId)
            throw new ForbiddenError('Something wrong happen !! pls relogin')
        }

        if (keyStore.refreshToken != refreshToken) throw new AuthFailureError('account not registered')

        const foundAccount = await findAccountByUsername({ username })
        if (!foundAccount) throw new AuthFailureError('shop not registered ')

        // create new token
        const tokens = await createTokenPair({ accountId, username, role, status }, keyStore.publicKey, keyStore.privateKey)

        //updateTokens
        await keyStore.updateOne({
            $set: {
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        })
        return {
            account: {
                _id: account.accountId, ...account
            },
            tokens
        }
    }

    static logout = async (keyStore) => {
        const deleteKey = await KeyTokenService.removeKeyById(keyStore._id)
        return deleteKey
    }

    static login = async ({ username, password }) => {
        const foundAccount = await findAccountByUsername({ username })
        if (!foundAccount) throw new BadRequestError("Account not register")

        const matchPassword = await bcrypt.compare(password, foundAccount.password)

        if (!matchPassword) throw new BadRequestError("Username or password invalid")
        if (foundAccount.status) throw new BadRequestError("Account blocked")

        const foundKeyToken = await findKeyTokenByAccountId(foundAccount._id)
        if (foundKeyToken) throw new BadRequestError("Account online in other device !!!")

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const { _id: accountId, role, status } = foundAccount
        const tokens = await createTokenPair(
            { accountId, username, role, status },
            publicKey,
            privateKey
        );

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            accountId,
        });

        return {
            account: getInfoData({
                fields: ['_id', 'username', 'role'],
                object: foundAccount,
            }),
            tokens,
        };
    }

    static changePassword = async ({ account, oldPassword, newPassword }) => {
        const { accountId } = account;
        const foundAccount = await Account.findOne({ _id: accountId }).lean();
        if (!foundAccount) throw new BadRequestError("Account not exits!")

        const matchPassword = await bcrypt.compare(oldPassword, foundAccount.password)
        if (!matchPassword) throw new BadRequestError("Old password not correct")

        const passwordHash = await bcrypt.hash(newPassword, 10)
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
}

export default AccessService;