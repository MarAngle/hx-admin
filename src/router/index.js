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
      path: '/agreement/cd/privacy',
      name: 'agreement_cd_privacy',
      component: () => import('./../page/agreement/cd/privacy.vue'),
    },
    {
      path: '/agreement/cd/user',
      name: 'agreement_cd_user',
      component: () => import('./../page/agreement/cd/user.vue'),
    },
    {
      path: '/agreement/yf/privacy',
      name: 'agreement_yf_privacy',
      component: () => import('./../page/agreement/yf/privacy.vue'),
    },
    {
      path: '/agreement/zs/privacy',
      name: 'agreement_zs_privacy',
      component: () => import('./../page/agreement/zs/privacy.vue'),
    },
    {
      path:'*',
      redirect: '/'
    },
  ]
});

export default router
