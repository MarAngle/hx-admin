
const userList = [
  {
    id: 1,
    name: '测试1',
    platform: 1,
    status: 0
  },
  {
    id: 2,
    name: '测试2',
    platform: 2,
    status: 1
  }
]

function getUserById(id) {
  for (let i = 0; i < userList.length; i++) {
    const item = userList[i]
    if (item.id == id) {
      return item
    }
  }
}

let id = 2

export default {
  login: {
    name: '登录服务',
    token: false,
    url: '/tb_api/api/admin/admin_login.php',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data']
  },
  userInfo: {
    name: '用户信息',
    token: false,
    url: 'userInfo',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data'],
    mock(requireData) {
      return {
        data: getUserById(1)
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
        data: userList,
        total: userList.length
      }
    }
  },
  userBuild: {
    name: '用户创建',
    url: 'userBuild',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data'],
    mock({ data }) {
      id++
      data.id = id
      data.status = 0
      userList.unshift(data)
      return {
        data: id
      }
    }
  },
  userChange: {
    name: '用户修改',
    url: 'userChange',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data'],
    mock({ data }) {
      let item = getUserById(data.id)
      if (item) {
        for (const prop in data) {
          item[prop] = data[prop]
        }
      }
      return {
        data: null
      }
    }
  },
}