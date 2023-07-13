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
  })
}

export default data
