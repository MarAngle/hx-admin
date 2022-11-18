import _func from 'complex-func'
import { BaseData } from 'complex-data'
import menu from './menu'

let depend = new BaseData({
  name: '依赖',
  prop: 'dependData',
  methods: {
    getData(force) {
      return menu.loadData(force)
    }
  }
})

export default depend
