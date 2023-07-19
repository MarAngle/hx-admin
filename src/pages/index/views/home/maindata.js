import _func from 'complex-func'
import { BaseData } from 'complex-data'
import api from '@api/index'
import select from "@index/main/select"

class DashboardData extends BaseData {
  constructor(option = {}) {
    super(option)
    this.data = {
      order: {
        dayAmount: 0,
        monthAmount: 0,
        dayNum: 0,
        dayOrder: 0,
        monthNum: 0
      },
      product: {
        increase: 0,
        sale: 0,
        amount: 0
      },
      user: {
        increase: 0,
        num: 0
      }
    }
  }
  getData () {
    return new Promise((resolve, reject) => {
      let postdata = {}
      postdata.status = 'showInfo'
      api.adminApi(postdata).then(res => {
        this.data.order.dayAmount = Number(res.data.data.order.total_day_amount) // 当日销售订单金额
        this.data.order.monthAmount = Number(res.data.data.order.total_month_amount) // 当月销售订单金额
        this.data.order.dayNum = Number(res.data.data.order.total_day_order_num) // 当日销售订单数量
        this.data.order.dayOrder = Number(res.data.data.order.total_day_num) // 今日下单数量
        this.data.order.monthNum = Number(res.data.data.order.total_month_num) // 当月销售订单数量

        this.data.product.increase = Number(res.data.data.commodity.grounding_num) // 上架数量
        this.data.product.sale = Number(res.data.data.commodity.sale_num) // 销售件数
        this.data.product.amount = Number(res.data.data.commodity.sale_amount) // 销售商品总额

        this.data.user.increase = Number(res.data.data.user.user_day_num) // 新增用户数
        this.data.user.num = Number(res.data.data.user.user_num) // 累计用户数
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
