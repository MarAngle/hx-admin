import _func from 'complex-func'
import { ListData } from 'complex-data'
import api from '@api/index'
import { userDict } from '@index/main/complex/dict/user'

const defaultInitOption = {
  name: '用户',
  prop: 'userList',
  dictionary: {
    layout: {
      default: {
        label: 6,
        content: 18
      }
    },
    id: {
      prop: 'id',
      data: ''
    },
    list: userDict.getList()
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
}

class UserList extends ListData {
  constructor(option = {}) {
    let initOption = _func.setDataByDefault(option.init, defaultInitOption)
    if (option.format) {
      option.format(initOption)
    }
    super(initOption)
  }
  getData () {
    return new Promise((resolve, reject) => {
      let postdata = this.getSearch()
      postdata.pageNo = this.getPageData('page')
      postdata.pageSize = this.getPageData('size')
      api.userList(postdata).then(res => {
        this.formatData(res.data.data, Number(res.data.totalCount))
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
  buildItem ({ postdata }) {
    return new Promise((resolve, reject) => {
      api.userBuild(postdata).then(res => {
        _func.showmsg('新增用户成功！', 'success')
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
  changeItem ({ postdata, targetitem }) {
    return new Promise((resolve, reject) => {
      let prop = this.getDictionaryPropData('prop')
      postdata[prop] = targetitem[prop]
      api.userChange(postdata).then(res => {
        _func.showmsg('修改用户成功！', 'success')
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
}

UserList.$name = 'UserList'

export default UserList
