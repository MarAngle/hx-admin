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
      path: '/home',
      name: 'home',
      component: () => import('@/page/home/index.vue'),
      meta: {
        icon: 'home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/page/login/index.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/config/page/404.vue')
    },

  ]
});

export default router
