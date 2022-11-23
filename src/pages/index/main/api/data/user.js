export default {
  login: {
    name: '登录',
    url: 'login',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data'],
    mock(requireData) {
      return {
        id: 1,
        name: '测试',
        platform: 1
      }
    }
  },
  userInfo: {
    name: '用户信息',
    url: 'userInfo',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data'],
    mock(requireData) {
      return {
        data: {
          id: 1,
          name: '测试',
          platform: 1
        }
      }
    }
  },
  userList: {
    name: '用户列表',
    url: 'userList',
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
            id: 1,
            name: '测试',
            platform: 1,
            status: 0
          },
          {
            id: 2,
            name: '测试2',
            platform: 2,
            status: 0
          }
        ],
        total: 100
      }
    }
  },
}