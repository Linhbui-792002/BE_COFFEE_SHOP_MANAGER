'use strict';
import express from 'express'
import { asyncHandler } from '../helpers/asyncHandler.js';
import { authentication, checkAdminRole } from '../auth/authUtils.js';
import StatisticController from '../controllers/statistic.controller.js';

const statisticRouter = express.Router();
// authentication
statisticRouter.use(asyncHandler(authentication))

// //Role admin
statisticRouter.use(asyncHandler(checkAdminRole))
statisticRouter.get('/statisticInDay', asyncHandler(StatisticController.StatisticPerDay));
statisticRouter.get('/statisticProduct', asyncHandler(StatisticController.StatisticProduct));
statisticRouter.get('/statisticRevenue', asyncHandler(StatisticController.StatisticRevenue));


export default statisticRouter;