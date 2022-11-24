import VueRouter from 'vue-router'
import "@/config/router";

const router = new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@index/views/login/index.vue'),
      meta: {
        name: '登录'
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/config/views/404.vue'),
      meta: {
        name: '404'
      }
    },

  ]
});

export default router
