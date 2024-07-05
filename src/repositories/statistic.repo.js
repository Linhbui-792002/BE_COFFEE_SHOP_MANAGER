import mongoose from "mongoose";

const orderStatistic = async () => {
  const now = new Date();
  const startDate = new Date(now.setHours(0, 0, 0, 0)).toISOString();
  const endDate = new Date(now.setHours(23, 59, 59, 999)).toISOString();

  const queryDb = [
    {
      $match: {
        $and: [
          {
            createdAt: {
              $gte: new Date(startDate),
            },
          },
          {
            createdAt: {
              $lt: new Date(endDate),
            },
          },
        ],
      },
    },
    {
      $addFields: {
        profit: {
          $reduce: {
            input: "$orderDetail",
            initialValue: 0,
            in: {
              $add: [
                "$$value",
                {
                  $multiply: [
                    {
                      $subtract: [
                        { $max: ["$$this.costPrice", "$$this.price"] },
                        { $min: ["$$this.costPrice", "$$this.price"] },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        revenue: {
          $sum: "$orderDetail.price",
        },
      },
    },
    {
      $addFields: {
        localTime: {
          $dateAdd: {
            startDate: "$createdAt",
            unit: "hour",
            amount: 7,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          $hour: "$localTime",
        },
        totalProfit: {
          $sum: "$profit",
        },
        totalRevenue: {
          $sum: "$revenue",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ];

  const orderData = await mongoose.model("Order").aggregate(queryDb);
  if (!orderData) {
    throw new BadRequestError("No order found!");
  }

  let totalProfit = 0;
  let totalRevenue = 0;
  let totalOrder = 0;
  orderData.forEach((order) => {
    totalOrder += order.count;
    totalProfit += order.totalProfit;
    totalRevenue += order.totalRevenue;
  });
  console.log("orderData", orderData);

  return {
    results: orderData,
    totalOrder: totalOrder,
    count: orderData.length,
    totalProfit: totalProfit,
    totalRevenue: totalRevenue,
  };
};

export default { orderStatistic };
