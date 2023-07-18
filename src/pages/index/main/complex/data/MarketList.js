import _func from 'complex-func'
import { ListData, SelectList } from 'complex-data'
import api from '@api/index'
import select from "@index/main/select"

const defaultInitOption = {
  name: '营销语',
  prop: 'marketList',
  dictionary: {
    layout: {
      default: {
        label: 6,
        content: 18
      }
    },
    id: {
      prop: 'marketing_id',
      data: ''
    },
    list: [
      {
        prop: 'marketing_id',
        name: 'ID',
        originprop: 'marketing_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'marketing_desc',
        name: '营销语',
        originprop: 'marketing_desc',
        originfrom: 'list',
        mod: {
          list: {
            width: 200
          },
          edit: {
            type: 'input',
            required: true,
            option: {
              maxLength: 100
            }
          },
          build: {
            type: 'edit'
          },
          change: {
            type: 'edit'
          }
        }
      },
      select.getItemByFormat('base', 'isShow', {
        prop: 'show',
        name: '展示',
        originprop: 'is_show',
        originfrom: 'list'
      }, {
        list: {
          width: 80,
          color: true,
          switch: {
            operate: false
          }
        },
        edit: {
          change: {
            required: true
          },
          build: {
            required: true
          }
        }
      }),
      select.getItemByFormat('base', 'status', {
        prop: 'is_defalut',
        name: '默认',
        originprop: 'is_defalut',
        originfrom: 'list'
      }, {
        list: {
          width: 80,
          color: true,
          switch: {
            operate: false
          }
        },
        edit: {
          change: {
            required: true
          },
          build: {
            required: true
          }
        }
      }),
      {
        prop: 'create_time',
        name: '创建日期',
        originprop: 'create_time',
        originfrom: 'list',
        mod: {
          list: {
            width: 165
          }
        }
      },
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
  pagination: false
}

class MarketList extends ListData {
  constructor(option = {}) {
    let initOption = _func.setDataByDefault(option.init, defaultInitOption)
    if (option.format) {
      option.format(initOption)
    }
    super(initOption)
    this.select = new SelectList()
  }
  buildSelect() {
    let select = []
    let prop = this.getDictionaryPropData('prop')
    for (let i = 0; i < this.data.list.length; i++) {
      const item = this.data.list[i];
      select.push({
        value: item[prop],
        label: item.marketing_desc
      })
    }
    this.select.setList(select)
  }
  getData () {
    return new Promise((resolve, reject) => {
      let postdata = this.getSearch()
      postdata.status = 'showMarketing'
      api.adminApi(postdata).then(res => {
        this.formatData(res.data.data, res.data.totalCount)
        this.buildSelect()
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
  buildItem ({ postdata }) {
    return new Promise((resolve, reject) => {
      postdata.status = 'setMarketing'
      api.adminApi(postdata).then(res => {
        _func.showmsg('新增营销语成功！', 'success')
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
      postdata.status = 'editMarketing'
      let prop = this.getDictionaryPropData('prop')
      postdata[prop] = targetitem[prop]
      api.adminApi(postdata).then(res => {
        _func.showmsg('修改营销语成功！', 'success')
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
  deleteItem (record) {
    return new Promise((resolve, reject) => {
      const postdata = {}
      postdata.status = 'delMarketing'
      let prop = this.getDictionaryPropData('prop')
      postdata[prop] = record[prop]
      api.adminApi(postdata).then(res => {
        _func.showmsg('删除营销语成功！', 'success')
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

MarketList.$name = 'MarketList'

export default MarketList
