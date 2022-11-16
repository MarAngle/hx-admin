import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/*
登陆时路由报错问题暂时解决方案 参考https://www.cnblogs.com/rever/p/11577322.html
出现这个问题，控制台会报[NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}]。其原因在于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报上述的错误。
如果你仔细观察并复现了多次错误你会发现，vue-router是先报了一个Uncaught (in promise)的错误(因为push没加回调)，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。
*/
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
