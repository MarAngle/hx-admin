

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
let id = 2

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
      for (let i = 0; i < userList.length; i++) {
        const item = userList[i]
        if (item.id == data.id) {
          for (const prop in data) {
            item[prop] = data[prop]
          }
          break
        } 
      }
      return {
        data: null
      }
    }
  },
}