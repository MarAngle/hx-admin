import _func from 'complex-func'
import { ListData } from 'complex-data'
import api, { dict } from '@/main/api/index'

let maindata = new ListData({
  name: '用户管理',
  prop: 'user',
  dictionary: {
    layout: {
      default: {
        label: 6,
        content: 18
      }
    },
    id: {
      prop: 'vin',
      data: ''
    },
    list: dict.userInfo.list.getList()
  },
  methods: {
    getData: function () {
      return new Promise((resolve, reject) => {
        let postdata = this.getSearch()
        postdata.pageNo = this.getPageData('page')
        postdata.pageSize = this.getPageData('size')
        api.userList(postdata).then(res => {
          this.formatData(res.data.data, res.data.totalCount)
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    },
    buildItem({ postdata }) {
      return new Promise((resolve, reject) => {
        api.buildUser(postdata).then(res => {
          _func.showmsg('新增成功！', 'success')
          this.reloadData({
            sync: true,
            page: false,
            choice: {
              from: 'reload'
            }
          })
          resolve()
        }, res => {
          reject(res)
        })
      })
    },
    changeItem({ postdata }) {
      return new Promise((resolve, reject) => {
        api.changeUser(postdata).then(res => {
          _func.showmsg('修改成功！', 'success')
          this.reloadData({
            sync: true,
            page: false,
            choice: {
              from: 'reload'
            }
          })
          resolve()
        }, res => {
          reject(res)
        })
      })
    }
  },
  search: {
    menu: {
      list: [
        {
          type: 'primary',
          icon: 'plus',
          name: '新增',
          act: 'build'
        }
      ]
    },
    dictionary: {
      list: []
    }
  },
  extradata: {},
  pagination: true
})

export default maindata
