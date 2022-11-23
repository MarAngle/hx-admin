import { getMock } from "../mock"

export default {
  menuList: {
    name: '菜单列表',
    url: 'menuList',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data'],
    mock(requireData) {
      return getMock({
        data: [
          {
            path: '/system',
            name: '系统设置',
            component: '@/config/layout/PureLayout.vue',
            icon: 'setting',
            menu: true,
            hidden: false,
            children: [
              {
                path: '/system/user',
                name: '用户管理',
                component: '@/pages/index/page/system/user/index.vue',
                menu: true,
                hidden: false,
              }
            ]
          },
          {
            path: '/system2',
            name: '系统设置2',
            component: '@/config/layout/PureLayout.vue',
            icon: 'setting',
            menu: true,
            hidden: false,
            children: [
              {
                path: '/system2in',
                name: '系统设置2in',
                component: '@/config/layout/PureLayout.vue',
                menu: true,
                hidden: false,
                children: [
                  {
                    path: '/system2/user',
                    name: '用户管理',
                    component: '@/pages/index/page/system/user/index.vue',
                    menu: true,
                    hidden: false,
                  }
                ]
              },
            ]
          },
        ]
      })
    }
  },
}