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
            component: 'layout/PureLayout.vue',
            icon: 'setting',
            menu: true,
            hidden: false,
            children: [
              {
                path: '/system/user',
                name: '用户管理',
                component: 'page/system/user/index.vue',
                menu: true,
                hidden: false,
              }
            ]
          }
        ]
      })
    }
  },
}