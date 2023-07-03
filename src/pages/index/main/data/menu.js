import _func from 'complex-func'
import { BaseData } from 'complex-data'
import api from '@api/index'
import router from '@index/router'
import user from './user'

const baseMenu = [
  {
    path: '/home',
    name: '主页',
    component: 'pages/index/views/home/index.vue',
    icon: 'home',
    menu: true,
    hidden: false
  },
  {
    path: '/item',
    name: 'ITEM',
    component: 'config/layout/PureLayout.vue',
    icon: 'setting',
    menu: true,
    hidden: false,
    children: [
      {
        path: '/item/list',
        name: 'LIST',
        component: 'pages/index/views/item/list/index.vue',
        menu: true,
        hidden: false,
      }
    ]
  },
]

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
          component: resolve => require([`@/${menuItem.component}`], resolve),
          meta: {
            name: menuItem.name,
            title: menuItem.title,
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
      // return new Promise((resolve, reject) => {
      //   api.menuList(user.getItem('id')).then(res => {
      //     let olist = res.data.data || []
      //     let syncMenu = baseMenu.concat(olist)
      //     this.data.list = this.formatMenu(syncMenu, 0)
      //     this.addRoute(this.data.list)
      //     resolve(res)
      //   }, err => {
      //     console.error(err)
      //     reject(err)
      //   })
      // })
      let olist = []
      let syncMenu = baseMenu.concat(olist)
      this.data.list = this.formatMenu(syncMenu, 0)
      this.addRoute(this.data.list)
      return Promise.resolve({ status: 'success' })
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
