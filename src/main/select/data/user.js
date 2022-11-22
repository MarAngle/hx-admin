import _func from '@/main/func/index'
import { SelectList } from 'complex-data'

let userdata = {
  userStatus: new SelectList({
    name: '用户状态',
    list: [
      {
        value: 1,
        label: '正常'
      },
      {
        value: 2,
        label: '冻结'
      }
    ]
  })
}




export default userdata