import mongoose from "mongoose";
import { BadRequestError } from "../core/error.response.js";
import StatisticRepo from "../repositories/statistic.repo.js";

class StatisticService {

  static orderStatistic = async () => {
    return await StatisticRepo.orderStatistic();
  }
  
}


export default StatisticService;