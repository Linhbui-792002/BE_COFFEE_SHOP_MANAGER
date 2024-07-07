import { BadRequestError } from "../core/error.response.js"
import { CREATED, OK, SuccessResponse } from "../core/success.response.js"
import StatisticService from "../services/statistic.service.js"

class StatisticController {
   static Statistic = async (req, res, next) => {
        const dataReturn = {
            orderAnalistic: await StatisticService.orderStatistic() || [],
            revenueAnalistic: await StatisticService.revenueChartStatistic() || [],
        }    
        new OK({
            message: "Get order statistic success",
            metadata: dataReturn,
        }).send(res)
    };
}

export default StatisticController;