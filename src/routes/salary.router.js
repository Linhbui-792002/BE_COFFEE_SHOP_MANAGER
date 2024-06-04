'use strict';
import express from 'express'
import { asyncHandler } from '../helpers/asyncHandler.js';
import { authentication, checkAdminRole } from '../auth/authUtils.js';
import SalaryController from '../controllers/salary.controller.js';

const salaryRouter = express.Router();
// authentication
salaryRouter.use(asyncHandler(authentication))
salaryRouter.get('/getSalary', asyncHandler(SalaryController.getSalary));

//Role admin
salaryRouter.use(asyncHandler(checkAdminRole))

salaryRouter.post('/createSalary', asyncHandler(SalaryController.createSalary));
// salaryRouter.get('/getSalary', asyncHandler(SalaryController.getSalary));
salaryRouter.put('/updateSalary', asyncHandler(SalaryController.updateSalary));

export default salaryRouter;