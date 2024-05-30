'use strict';
import express from 'express';
import { asyncHandler } from '../helpers/asyncHandler.js';
import { authentication, checkAdminRole } from '../auth/authUtils.js';
import EmployeeController from '../controllers/employee.controller.js';

const routerEmployee = express.Router();

// authentication
routerEmployee.use(asyncHandler(authentication))

routerEmployee.get('/:id', asyncHandler(EmployeeController.getInfoEmployee));

// Role admin
routerEmployee.use(asyncHandler(checkAdminRole))

routerEmployee.get('/', asyncHandler(EmployeeController.getAllEmployees));
routerEmployee.get('/employeeDoing', asyncHandler(EmployeeController.getAllEmployeesDoing));


routerEmployee.post('/', asyncHandler(EmployeeController.createEmployee));
routerEmployee.patch('/', asyncHandler(EmployeeController.updateEmployee));
routerEmployee.patch('/changeStatus', asyncHandler(EmployeeController.changeStatusEmployee));

export default routerEmployee;