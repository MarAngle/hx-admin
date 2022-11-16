import VueRouter from 'vue-router'
import "@/config/router";

const router = new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./../page/list/index.vue')
    },
    {
      path:'*',
      redirect: '/'
    },
  ]
});

export default router
