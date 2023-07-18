import _func from 'complex-func'
import { BaseData } from 'complex-data'
import api from '@api/index'
import select from "@index/main/select"

class DashboardData extends BaseData {
  constructor(option = {}) {
    super(option)
    this.data = {
      amount: {
        day: 0,
        month: 0,
        total: 0
      },
      order: {
        day: 0,
        month: 0,
        total: 0
      },
      product: {
        increase: 0,
        total: 0
      },
      user: {
        increase: 0,
        total: 0
      }
    }
  }
  getData () {
    return new Promise((resolve, reject) => {
      let postdata = {}
      postdata.status = 'showInfo'
      api.adminApi(postdata).then(res => {
        this.data.amount.day = res.data.data.order.total_day_amount || 0 // 当日销售订单金额
        this.data.amount.month = res.data.data.order.total_month_amount || 0 // 当月销售订单金额
        this.data.amount.total = res.data.data.order.sale_amount || 0 // 销售商品总额

        this.data.order.day = res.data.data.order.total_day_order_num || 0 // 当日销售订单数量
        this.data.order.dayOrder = res.data.data.order.sale_amount || 0 // 今日下单数量
        this.data.order.month = res.data.data.order.total_month_num || 0 // 当月销售订单数量

        this.data.product.increase = res.data.data.commodity.grounding_num || 0 // 上架数量
        this.data.product.sale = res.data.data.commodity.sale_num || 0 // 销售件数

        this.data.user.increase = res.data.data.user.user_day_num || 0 // 新增用户数
        this.data.user.total = res.data.data.user.user_num || 0 // 累计用户数

        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}

DashboardData.$name = 'DashboardData'

let dashboardData = new DashboardData({
  name: '看板数据',
  prop: 'dashboardData',
  extradata: {}
})

export default dashboardData
