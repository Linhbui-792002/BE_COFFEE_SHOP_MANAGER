'use strict';
import express from 'express'
import { asyncHandler } from '../helpers/asyncHandler.js';
import { authentication, checkAdminRole } from '../auth/authUtils.js';
import SalaryController from '../controllers/salary.controller.js';

const salaryRouter = express.Router();
// authentication
salaryRouter.use(asyncHandler(authentication))
salaryRouter.get('/employee', asyncHandler(SalaryController.getEmployeeSalary));
salaryRouter.get('/:id', asyncHandler(SalaryController.getSalary));

//Role admin
salaryRouter.use(asyncHandler(checkAdminRole))
salaryRouter.get('/', asyncHandler(SalaryController.getAllSalary));
salaryRouter.post('/', asyncHandler(SalaryController.createSalary));
salaryRouter.put('/', asyncHandler(SalaryController.updateSalary));

export default salaryRouter;