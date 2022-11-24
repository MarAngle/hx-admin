import router from '@index/router'
import _func from 'complex-func'
import user from '@index/main/data/user'
import { loadDepend } from './depend'
import setting from '@/setting'

const loginPath = ['/login']
const whitePath = [].concat(loginPath)

router.beforeEach((to, from, next) => {
  let login = user.getStatus('login').value
  if (login == 'logined') {
    if (loginPath.indexOf(to.path) !== -1) {
      next({ path: '/' })
    } else {
      loadDepend(to, from, next)
    }
  } else {
    if (whitePath.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  }
})

router.afterEach((to, from) => {
  _func.page.setType('default')
  _func.page.setStyle()
  _func.setTitle(setting.page.index.title, to.meta.name, to.meta.title)
})