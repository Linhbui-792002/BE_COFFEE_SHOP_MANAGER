import mongoose from "mongoose";
import { BadRequestError } from "../core/error.response.js";
import StatisticRepo from "../repositories/statistic.repo.js";

class StatisticService {

  static orderStatistic = async () => {
    return await StatisticRepo.orderStatistic();
  }
  
  static revenueChartStatistic = async () => {
    return await StatisticRepo.revenueChartStatistic();
  }

  static productStatistic = async () => {
    return await StatisticRepo.productStatistic();
  }
}


export default StatisticService;