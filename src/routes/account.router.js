'use strict';
import express from 'express';
import { asyncHandler } from '../helpers/asyncHandler.js';
import { authentication, checkAdminRole } from '../auth/authUtils.js';
import AccountController from '../controllers/account.controller.js';

const routerAccount = express.Router();

// authentication
routerAccount.use(asyncHandler(authentication))

routerAccount.patch('/', asyncHandler(AccountController.updateAccount));

// Role admin
routerAccount.use(asyncHandler(checkAdminRole))

routerAccount.get('/', asyncHandler(AccountController.getAllAccounts));
routerAccount.post('/', asyncHandler(AccountController.createAccount));
routerAccount.patch('/resetPassword', asyncHandler(AccountController.resetPassword));


export default routerAccount;