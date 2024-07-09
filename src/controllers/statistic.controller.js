import { BadRequestError } from "../core/error.response.js"
import { CREATED, OK, SuccessResponse } from "../core/success.response.js"
import StatisticService from "../services/statistic.service.js"

class StatisticController {
    static Statistic = async (req, res, next) => {
        // const [mot, hai, ba] = await Promise.all(ơ )
        const dataReturn = {
            revenueAnalistic: await StatisticService.revenueChartStatistic() || [],
            productStatistic: await StatisticService.productStatistic() || [],
            orderAnalistic: await StatisticService.orderStatistic() || [],

        }
        new OK({
            message: "Get order statistic success",
            metadata: dataReturn,
        }).send(res)
    };
}

export default StatisticController;