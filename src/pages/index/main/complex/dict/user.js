import select from "@/index/main/select"
import Dictionary from "./build/Dictionary"

export const userDict = new Dictionary({
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
    },
    select.getItemByFormat('user', 'status', {
      prop: 'status',
      name: '状态',
      originprop: 'status',
      originfrom: 'list'
    }, {
      color: true
    }),
    {
      prop: 'menu',
      name: '操作',
      originprop: 'menu',
      originfrom: 'local',
      mod: {
        list: {}
      }
    }
  ]
})
