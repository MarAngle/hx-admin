import _func from 'complex-func'
import { BaseData } from 'complex-data'
import user from './user'
import menu from './menu'

let depend = new BaseData({
  name: '依赖',
  prop: 'dependData',
  methods: {
    getData(force) {
      return new Promise((resolve, reject) => {
        user.loadData(true).then(res => {
          menu.loadData(force).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        }, err => {
          reject(err)
        })
      })
    }
  }
})

export default depend
