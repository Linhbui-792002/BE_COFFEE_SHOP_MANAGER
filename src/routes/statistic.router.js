'use strict';
import express from 'express'
import { asyncHandler } from '../helpers/asyncHandler.js';
import { authentication, checkAdminRole } from '../auth/authUtils.js';
import StatisticController from '../controllers/statistic.controller.js';

const statisticRouter = express.Router();
// authentication
statisticRouter.use(asyncHandler(authentication))
statisticRouter.get('/', asyncHandler(StatisticController.orderStatistic));

// //Role admin
statisticRouter.use(asyncHandler(checkAdminRole))


export default statisticRouter;