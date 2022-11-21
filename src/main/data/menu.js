import _func from 'complex-func'
import { BaseData } from 'complex-data'
import api from '@/main/api/index'
import router from '@/router'

let menu = new BaseData({
  name: '菜单列表',
  prop: 'menuData',
  data: {
    menu: [],
    list: []
  },
  methods: {
    setCurrent(path) {
      this.data.menu = path
    },
    formatMenu(menuList, deep) {
      return menuList.map(menuItem => {
        let component = resolve => require([menuItem.component], resolve)
        let nameList = menuItem.path.split('/')
        nameList.shift()
        let item = {
          path: menuItem.path,
          name: nameList.join('-'),
          component: component,
          meta: {
            name: menuItem.name,
            icon: menuItem.icon,
            menu: menuItem.menu,
            hidden: menuItem.hidden
          }
        }
        if (menuItem.children) {
          item.children = this.formatMenu(menuItem.children, deep + 1)
        }
        if (deep == 0) {
          router.addRoute(item)
        }
        return item
      })
    },
    getData() {
      return new Promise((resolve, reject) => {
        let syncMenu = [
          {
            path: '/system',
            name: '系统设置',
            component: '@/page/system/index.vue',
            icon: 'setting',
            menu: true,
            hidden: false
          }
        ]
        this.data.list = this.formatMenu(syncMenu, 0)
        resolve()
      })
    }
  }
})

console.log(menu)

export default menu
