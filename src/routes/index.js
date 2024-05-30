'use strict';
import express from 'express';
import routerAccess from './access.router.js';
import routerAccount from './account.router.js';
import routerEmployee from './employee.router.js';
const router = express.Router();

router.use('/v1/api/employee', routerEmployee);
router.use('/v1/api/account', routerAccount);
router.use('/v1/api/', routerAccess);

export default router;
