import mongoose from "mongoose";

const orderStatistic = async () => {
  const now = new Date();
  const startDate = new Date(now.setHours(0,0,0,0)).toISOString();
  const endDate = new Date(now.setHours(23,59,59,999)).toISOString();
    console.log(startDate, endDate);
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
            'revenue': {
              '$reduce': {
                'input': '$orderDetail', 
                'initialValue': 0, 
                'in': {
                  '$add': [
                    '$$value', {
                      '$multiply': [
                        {
                          '$subtract': [
                            '$$this.costPrice', '$$this.price'
                          ]
                        }, '$$this.quantity'
                      ]
                    }
                  ]
                }
              }
            }
          }
        }, {
          '$addFields': {
            'localTime': {
              '$dateAdd': {
                'startDate': '$createdAt', 
                'unit': 'hour', 
                'amount': 7
              }
            }
          }
        }, {
          '$group': {
            '_id': {
              '$hour': '$localTime'
            }, 
            'totalRevenue': {
              '$sum': '$revenue'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }
      ]
    
    const orderData = await mongoose.model('Order').aggregate(queryDb);
    if(!orderData) {
        throw new BadRequestError("No order found!");
    }
    
    let totalRevenue = 0;
    let totalOrdder = 0;
    orderData.forEach(order => {
      totalOrdder += order.count;  
      totalRevenue += order.totalRevenue;
    });
    
    return {
      results: orderData,
      totalOrder: totalOrdder,
      count: orderData.length,
      totalRevenue: totalRevenue
    }
}

export default { orderStatistic }