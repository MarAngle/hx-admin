import Dictionary from "@/main/api/build/Dictionary"

export default {
  login: {
    name: '登录',
    url: 'login',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data']
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
    dict: {
      list: new Dictionary({
        list: [
          {
            prop: 'id',
            name: 'ID',
            originprop: 'id',
            originfrom: 'list',
            mod: {}
          },
          {
            prop: 'name',
            name: '名称',
            originprop: 'name',
            originfrom: 'list',
            mod: {
              list: {}
            }
          },
          {
            prop: 'platform',
            name: '平台',
            originprop: 'platform',
            originfrom: 'list',
            mod: {
              list: {}
            }
          }
        ]
      })
    }
  },
}