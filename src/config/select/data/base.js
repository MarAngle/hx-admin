import _func from 'complex-func'
import { SelectList } from 'complex-data'

let data = {
  status: new SelectList({
    name: '是否状态',
    list: [
      {
        value: 0,
        label: '否',
        _switch: false
      },
      {
        value: 1,
        label: '是',
        _switch: true
      }
    ]
  }),
  delete: new SelectList({
    name: '删除状态',
    list: [
      {
        value: 0,
        label: '未删除',
        _switch: false
      },
      {
        value: 1,
        label: '已删除',
        _switch: true
      }
    ]
  }),
  isShow: new SelectList({
    name: '展示',
    list: [
      {
        value: 0,
        label: '不展示',
        _switch: false
      },
      {
        value: 1,
        label: '展示',
        _switch: true
      }
    ]
  }),
  itemStatus: new SelectList({
    name: '产品状态',
    list: [
      {
        value: 0,
        label: '下架',
        _switch: false
      },
      {
        value: 1,
        label: '上架',
        _switch: true
      }
    ]
  }),
  orderStatus: new SelectList({
    name: '订单状态',
    list: [
      {
        value: 100,
        label: '未支付'
      },
      {
        value: 200,
        label: '待使用'
      },
      {
        value: 201,
        label: '洗护中'
      },
      {
        value: 202,
        label: '已完成'
      },
      {
        value: 2000,
        label: '关闭订单'
      },
      {
        value: 4000,
        label: '已退款'
      }
    ]
  }),
  useStatus: new SelectList({
    name: '套餐使用状态',
    list: [
      {
        value: 0,
        label: '未使用'
      },
      {
        value: 1,
        label: '已使用'
      },
      {
        value: 2,
        label: '退款'
      },
      {
        value: 3,
        label: '销毁'
      }
    ]
  })
}

export default data
