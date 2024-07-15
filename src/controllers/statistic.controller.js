import { BadRequestError } from "../core/error.response.js"
import { CREATED, OK, SuccessResponse } from "../core/success.response.js"
import StatisticService from "../services/statistic.service.js"

class StatisticController {
    static StatisticPerDay = async (req, res, next) => {
        new OK({
            message: "Get order statistic per days success",
            metadata: await StatisticService.orderStatistic() || [],
        }).send(res)
    };

    static StatisticProduct = async (req, res, next) => {
        new OK({
            message: "Get product statistic success",
            metadata: await StatisticService.productStatistic() || [],
        }).send(res)
    };

    static StatisticRevenue = async (req, res, next) => {
        new OK({
            message: "Get revenue Statistic success",
            metadata: await StatisticService.revenueChartStatistic() || [],
        }).send(res)
    };
}

export default StatisticController;