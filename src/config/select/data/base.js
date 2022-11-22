import _func from 'complex-func'
import { SelectList } from 'complex-data'

let data = {
  status: new SelectList({
    name: '是否状态',
    list: [
      {
        value: '0',
        label: '否'
      },
      {
        value: '1',
        label: '是'
      }
    ]
  }),
  delete: new SelectList({
    name: '删除状态',
    list: [
      {
        value: '0',
        label: '未删除'
      },
      {
        value: '1',
        label: '已删除'
      }
    ]
  })
}

export default data
