import _func from '@/main/func/index'
import { SelectList } from 'complex-data'

let data = {
  status: new SelectList({
    name: '用户状态',
    list: [
      {
        value: 0,
        label: '正常',
        color: _func.data.color.primary
      },
      {
        value: 1,
        label: '冻结',
        color: _func.data.color.disabled
      }
    ]
  })
}




export default data