import _func from 'complex-func'
import { BaseData } from 'complex-data'
import api from '@/index/main/api/index'
import router from '@/pages/index/router'


const baseMenu = [
  {
    path: '/home',
    name: '主页',
    component: 'page/home/index.vue',
    icon: 'home',
    menu: true,
    hidden: false
  }
]

function loadView(path) {
  return resolve => require([`@/${path}`], resolve)
}

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
        let nameList = menuItem.path.split('/')
        nameList.shift()
        let item = {
          path: menuItem.path,
          name: nameList.join('-'),
          component: loadView(menuItem.component),
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
        return item
      })
    },
    getData () {
      return new Promise((resolve, reject) => {
        api.menuList().then(res => {
          let olist = res.data.data
          let syncMenu = baseMenu.concat(olist)
          this.data.list = this.formatMenu(syncMenu, 0)
          this.addRoute(this.data.list)
          resolve(res)
        }, err => {
          console.error(err)
          reject(err)
        })
      })
    },
    addRoute(routeList) {
      router.addRoute({
        path:'/',
        redirect: '/home'
      })
      routeList.forEach(route => {
        router.addRoute(route)
      })
      router.addRoute({
        path:'*',
        redirect: '/404'
      })
    }
  }
})

export default menu
