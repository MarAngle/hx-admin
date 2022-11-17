import DictList from "@/main/dict/build/DictList"

let userInfo = new DictList({
  name: '用户信息',
  prop: 'userInfo',
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
        info: {}
      }
    },
    {
      prop: 'platform',
      name: '平台',
      originprop: 'platform',
      originfrom: 'list',
      mod: {
        info: {}
      }
    }
  ]
})


export default userInfo