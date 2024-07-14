'use strict';
import express from 'express';
import { asyncHandler } from '../helpers/asyncHandler.js';
import { authentication, checkAdminRole } from '../auth/authUtils.js';
import VoucherController from '../controllers/voucher.controller.js';

const routerVoucher = express.Router();

// authentication
routerVoucher.use(asyncHandler(authentication))



// Role admin
routerVoucher.use(asyncHandler(checkAdminRole))

routerVoucher.get('/', asyncHandler(VoucherController.getAllVoucher));
routerVoucher.get('/:id', asyncHandler(VoucherController.getVoucherInfo));

routerVoucher.post('/', asyncHandler(VoucherController.createVoucher));
routerVoucher.patch('/', asyncHandler(VoucherController.updateVoucher));



export default routerVoucher;