
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
      return {
        data: [
          {
            path: '/system',
            name: '系统设置',
            component: 'config/layout/PureLayout.vue',
            icon: 'setting',
            menu: true,
            hidden: false
          }
        ]
      }
    }
  },
}