'use strict'
import JWT from 'jsonwebtoken';
import KeyTokenService from '../services/keyToken.service.js';
import { AuthFailureError, ForbiddenError, NotFoundError } from '../core/error.response.js';
import { ROLES } from '../constants/index.js';

const HEADER = {
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-rtoken-id'
};


const createTokenPair = async (payload, publicKey, privateKey) => {
    try {

        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2days',
        });

        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7days',
        });

        //verify
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log(err, 'err');
                console.error(`error verify::`, err);
            } else {
                console.log(`decode verify`, decode);
            }
        });

        return { accessToken, refreshToken };
    } catch (error) { }
};

const checkAdminRole = async (req, res, next) => {
    const role = req.account.role
    if (role != ROLES.ADMIN) {
        throw new ForbiddenError("Forbidden")
    }
    return next()
}

const checkEmployeeRole = async (req, res, next) => {
    const role = req.account.role
    if (role != ROLES.EMPLOYEE) {
        throw new ForbiddenError("Forbidden")
    }
    return next()
}

const authentication = async (req, res, next) => {

    const accountId = req.headers[HEADER.CLIENT_ID]
    if (!accountId) throw new AuthFailureError('Invalid Request')

    const keyStore = await KeyTokenService.findByAccountId(accountId)
    if (!keyStore) throw new AuthFailureError('Login again')

    const refreshToken = req.body.refreshToken
    if (refreshToken) {
        try {
            const decodeAccount = JWT.verify(refreshToken, keyStore.privateKey)
            if (accountId != decodeAccount.accountId) throw new AuthFailureError('Invalid AccountId')
            req.keyStore = keyStore
            req.account = decodeAccount
            req.refreshToken = refreshToken
            return next()
        } catch (error) {
            throw error
        }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]

    if (!accessToken) throw new AuthFailureError('Invalid Request')
    try {
        const token = accessToken.includes("Bearer") ? accessToken.split(" ")[1] : accessToken;
        const decodeAccount = JWT.verify(token, keyStore.publicKey, (err, decoded) => {
            if (err) throw new ForbiddenError("Forbidden")
            return decoded
        })
        if (accountId != decodeAccount.accountId) throw new AuthFailureError('Invalid AccountId')
        if (decodeAccount.status) throw new AuthFailureError('Account Blocked')
        req.keyStore = keyStore
        req.account = decodeAccount
        return next()
    } catch (error) {
        throw error
    }

}

export { createTokenPair, authentication, checkAdminRole, checkEmployeeRole };
