import { BadRequestError } from "../core/error.response.js"
import { CREATED, OK, SuccessResponse } from "../core/success.response.js"
import StatisticService from "../services/statistic.service.js"

class StatisticController {
   static orderStatistic = async (req, res, next) => {
        new OK({
            message: "Get order statistic success",
            metadata: await StatisticService.orderStatistic(),
        }).send(res)
    }
}

export default StatisticController;