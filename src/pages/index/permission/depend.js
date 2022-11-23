
import _func from 'complex-func'
import depend from '@/main/data/depend'

export function loadDepend(to, from, next) {
  let load = depend.getStatus('load').value
  if (load == 'loaded') {
    next()
  } else {
    depend.loadData().then(res => {
      let redirect = decodeURIComponent(from.query.redirect || to.path)
      if (to.path === redirect) {
        // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        next({ ...to, replace: true })
      } else {
        // 跳转到目的路由
        next()
      }
    }, err => {
      next({ path: '/login', query: { redirect: to.fullPath } })
    })
  }
}