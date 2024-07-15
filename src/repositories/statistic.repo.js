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
                    "$$this.quantity",
                  ],
                },
              ],
            },
          },
        },
        revenue: {
          $sum: "$totalMoney",
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

  return {
    results: orderData,
    totalOrder: totalOrder,
    count: orderData.length,
    totalProfit: totalProfit,
    totalRevenue: totalRevenue,
  };
};

const revenueChartStatistic = async () => {
  //Đoạn này sẽ lầy thời gian đầu của tháng hiên tại và thời điểm đầu của 6 tháng trước.
  const firstDate = new Date().setDate(1);
  const firstMoment = new Date(firstDate).setHours(0, 0, 0, 1);
  //Thời điểm đầu tiên của tháng hiện tại
  const endDate = new Date(firstMoment).toISOString();
  //Thời điểm đầu tiên của 6 tháng trước
  const sixMonthsAgo = new Date(firstMoment).setMonth(new Date(firstMoment).getMonth() - 6);
  const startDate = new Date(sixMonthsAgo).toISOString();
  //Thực hiện query lấy dữ liệu
  const queryDb = [
    {
      '$match': {
        '$and': [
          {
            'createdAt': {
              '$gte': new Date(startDate)
            }
          }, {
            'createdAt': {
              '$lt': new Date(endDate)
            }
          }
        ]
      }
    }, {
      '$addFields': {
        'profit': {
          '$reduce': {
            'input': '$orderDetail',
            'initialValue': 0,
            'in': {
              '$add': [
                '$$value', {
                  '$multiply': [
                    {
                      '$subtract': [
                        {
                          '$max': [
                            '$$this.costPrice', '$$this.price'
                          ]
                        }, {
                          '$min': [
                            '$$this.costPrice', '$$this.price'
                          ]
                        }
                      ]
                    }, '$$this.quantity'
                  ]
                }
              ]
            }
          }
        },
        'revenue': '$totalMoney'
      }
    }, {
      '$addFields': {
        'localTime': {
          '$dateAdd': {
            'startDate': '$createdAt',
            'unit': 'month',
            'amount': 7
          }
        },
        'yearMonth': {
          '$dateToString': {
            'date': '$createdAt',
            'format': '%m - %Y'
          }
        }
      }
    }, {
      '$group': {
        '_id': {
          'date': '$yearMonth'
        },
        'revenue': {
          '$sum': '$revenue'
        },
        'profit': {
          '$sum': '$profit'
        }
      }
    }, {
      '$addFields': {
        'month': '$_id.date'
      }
    }, {
      '$sort': {
        '_id.date': -1
      }
    }
  ]

  return {
    revenueData: await mongoose.model("Order").aggregate(queryDb),
  };
};

const productStatistic = async () => {
  //Đoạn này sẽ lầy thời gian đầu của tháng hiên tại và thời điểm đầu của 6 tháng trước.
  const firstDate = new Date().setDate(1);
  const firstMoment = new Date(firstDate).setHours(0, 0, 0, 1);
  //Thời điểm đầu tiên của tháng hiện tại
  const endDate = new Date(firstMoment).toISOString();
  //Thời điểm đầu tiên của 6 tháng trước
  const sixMonthsAgo = new Date(firstMoment).setMonth(new Date(firstMoment).getMonth() - 6);
  const startDate = new Date(sixMonthsAgo).toISOString();

  //Thực hiện query lấy dữ liệu
  const queryDb =
    [
      {
        '$match': {
          '$and': [
            {
              'createdAt': {
                '$gte': new Date(startDate)
              }
            }, {
              'createdAt': {
                '$lt': new Date(endDate)
              }
            }
          ]
        }
      }, {
        '$unwind': {
          'path': '$orderDetail',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$addFields': {
          'productId': '$orderDetail.productId',
          'productProfit': {
            '$multiply': [
              {
                '$subtract': [
                  '$orderDetail.costPrice', '$orderDetail.price'
                ]
              }, '$orderDetail.quantity'
            ]
          },
          'localTime': {
            '$dateAdd': {
              'startDate': '$createdAt',
              'unit': 'month',
              'amount': 7
            }
          },
          'yearMonth': {
            '$dateToString': {
              'date': '$createdAt',
              'format': '%m - %Y'
            }
          }
        }
      }, {
        '$group': {
          '_id': {
            'yearMonth': '$yearMonth',
            'productId': '$productId'
          },
          'productProfit': {
            '$sum': '$productProfit'
          }
        }
      }, {
        '$addFields': {
          'productId': '$_id.productId',
          'yearMonth': '$_id.yearMonth'
        }
      }, {
        '$lookup': {
          'from': 'Products',
          'localField': 'productId',
          'foreignField': '_id',
          'as': 'product'
        }
      }, {
        '$addFields': {
          'product': {
            '$first': '$product'
          }
        }
      }, {
        '$addFields': {
          'productName': '$product.name',
          'status': '$product.status'
        }
      }, {
        '$match': {
          'status': {
            '$eq': true
          }
        }
      }, {
        '$project': {
          'productName': 1,
          'productProfit': 1,
          'yearMonth': 1
        }
      }

    ]

  return await mongoose.model("Order").aggregate(queryDb);
}

export default { orderStatistic, revenueChartStatistic, productStatistic };
