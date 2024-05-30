'use strict';

import express from 'express';
import { asyncHandler } from '../helpers/asyncHandler.js';
import AccessController from '../controllers/access.controller.js';
import { authentication } from '../auth/authUtils.js';

const routerAccess = express.Router();

//public api
routerAccess.post('/login', asyncHandler(AccessController.login));

// authentication
routerAccess.use(asyncHandler(authentication))

routerAccess.post('/handleRefreshToken', asyncHandler(AccessController.handleRefreshToken));

routerAccess.post('/logout', asyncHandler(AccessController.logout));

routerAccess.patch('/changePassword', asyncHandler(AccessController.changePassword));

export default routerAccess;