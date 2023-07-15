import _func from 'complex-func'
import { ListData } from 'complex-data'
import api from '@api/index'
import select from "@index/main/select"
import PicView from '@/config/components/mod/PicView.vue'
import UploadPicMultiple from '@/config/components/mod/UploadPicMultiple.vue'
import { mutipleFileUpload } from '@/pages/index/main/complex/utils'
import categoryList from './../../manage/category/maindata'
import resourceList from './../../manage/resource/maindata'
import marketList from './../../manage/market/maindata'

class OrderList extends ListData {
  constructor(option = {}) {
    super(option)
  }
  loadLocalDepend() {
    return _func.promiseAllFinished([categoryList.loadData(), resourceList.loadData(), marketList.loadData()])
  }
  getData () {
    return new Promise((resolve, reject) => {
      this.loadLocalDepend().finally(() => {
        let postdata = this.getSearch()
        const pageData = this.getPageData()
        postdata.pageNumber = pageData.page
        postdata.pageSize = pageData.size
        postdata.status = 'tradeOrderList'
        api.orderApi(postdata).then(res => {
          this.formatData(res.data.data.list, Number(res.data.data.total))
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    })
  }
  parseEditData(postdata) {
    postdata.pic = {
      main_list: postdata.main_pic.map(pic => {
        return {
          path: pic
        }
      }),
      detail_list: postdata.detail_pic.map(pic => {
        return {
          path: pic
        }
      })
    }
    delete postdata.main_pic
    delete postdata.detail_pic
  }
  changeDataStatus(valueItem, record) {
    return new Promise((resolve, reject) => {
      api.orderApi({
        status: valueItem.value == 0 ? 'tradeItemOffshelf' : 'tradeItemGrounding',
        model_id: record.model_id
      }).then(res => {
        _func.showmsg(`${valueItem.label}成功！`, 'success')
        record.sale_status = valueItem
        resolve()
      }, res => {
        reject(res)
      })
    })
  }
}

OrderList.$name = 'OrderList'

let orderList = new OrderList({
  name: '订单',
  prop: 'orderList',
  dictionary: {
    layout: {
      default: {
        grid: 12,
        label: 6,
        content: 18
      }
    },
    id: {
      prop: 'pay_id',
      data: ''
    },
    list: [
      {
        prop: 'pay_id',
        name: 'ID',
        originprop: 'pay_id',
        originfrom: 'list',
        mod: {
          list: {}
        }
      },
      {
        prop: 'order_id',
        name: '洗护ID',
        originprop: 'order_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'uc_id',
        name: '用户套餐ID',
        originprop: 'uc_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'sku_id',
        name: '商品编号',
        originprop: 'sku_id',
        originfrom: 'list',
        mod: {
          list: {
            width: 120
          }
        }
      },
      {
        prop: 'commodity_name',
        name: '商品名称',
        originprop: 'commodity_name',
        originfrom: 'list',
        mod: {
          list: {
            width: 240
          }
        }
      },
      {
        prop: 'nickname',
        name: '用户昵称',
        originprop: 'nickname',
        originfrom: 'list',
        mod: {
          list: {
            width: 120
          }
        }
      },
      {
        prop: 'mobile',
        name: '手机号',
        originprop: 'mobile',
        originfrom: 'list',
        mod: {
          list: {
            width: 130
          }
        }
      },
      {
        prop: 'pay_amount',
        name: '支付金额',
        originprop: 'pay_amount',
        originfrom: 'list',
        func: {
          format(value) {
            return value / 100
          }
        },
        mod: {
          list: {
            width: 90
          }
        }
      },
      {
        prop: 'status',
        showprop: 'label',
        name: '订单状态',
        originprop: 'status',
        originfrom: 'list',
        func: {
          format(value, { originitem }) {
            return {
              value: value,
              label: originitem.status_desc
            }
          }
        },
        mod: {
          list: {
            width: 90
          }
        }
      },
      {
        prop: 'order_status',
        name: '洗护订单内置状态',
        originprop: 'order_status',
        originfrom: 'list',
        mod: {
          list: {
            width: 160
          }
        }
      },
      select.getItemByFormat('base', 'useStatus', {
        prop: 'use_status',
        name: '使用状态',
        originprop: 'use_status',
        originfrom: 'list'
      }, {
        list: {
          width: 160,
          color: true
        }
      }),
      {
        prop: 'reservation_time',
        name: '预约时间',
        originprop: 'reservation_time',
        originfrom: 'list',
        mod: {
          list: {
            width: 165
          }
        }
      },
      {
        prop: 'expires_time',
        name: '套餐过期时间',
        originprop: 'expires_time',
        originfrom: 'list',
        mod: {
          list: {
            width: 165
          }
        }
      },
      {
        prop: 'order_time',
        name: '使用时间',
        originprop: 'order_time',
        originfrom: 'list',
        mod: {
          list: {
            width: 165
          }
        }
      },
      {
        prop: 'pay_time',
        name: '支付时间',
        originprop: 'pay_time',
        originfrom: 'list',
        mod: {
          list: {
            width: 165
          }
        }
      },
      {
        prop: 'pay_create_time',
        name: '创建时间',
        originprop: 'pay_create_time',
        originfrom: 'list',
        mod: {
          list: {
            width: 165
          }
        }
      },
      {
        prop: 'menu',
        name: '操作',
        originprop: 'menu',
        originfrom: 'local',
        mod: {
          list: {
            width: 80
          }
        }
      }
    ]
  },
  search: {
    menu: {
      list: []
    },
    dictionary: {
      list: [
      ]
    }
  },
  extradata: {},
  pagination: true
})

export default orderList
