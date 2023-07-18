import _func from 'complex-func'
import { ListData, SelectData, SelectList } from 'complex-data'
import api from '@api/index'
import select from "@index/main/select"

const resourcePosition = new SelectData({
  name: '资源位位置',
  prop: 'resourcePosition',
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        let postdata = {}
        postdata.status = 'showPosition'
        api.adminApi(postdata).then(res => {
          let originList = res.data.data || []
          this.setSelect(originList.map(item => {
            return {
              value: item.position_id,
              label: item.position_name
            }
          }))
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    }
  }
})

const defaultInitOption = {
  name: '资源位',
  prop: 'resourceList',
  dictionary: {
    layout: {
      default: {
        label: 6,
        content: 18
      }
    },
    id: {
      prop: 'resourceniche_id',
      data: ''
    },
    list: [
      {
        prop: 'resourceniche_id',
        name: 'ID',
        originprop: 'resourceniche_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'resourceniche_name',
        name: '名称',
        originprop: 'resourceniche_name',
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
      {
        prop: 'resourceniche_position_id',
        showprop: {
          default: 'value',
          list: 'label'
        },
        name: '位置',
        originprop: 'resourceniche_position_id',
        originfrom: 'list',
        func: {
          format(value) {
            return resourcePosition.getItem(value)
          }
        },
        mod: {
          list: {
            width: 100
          },
          edit: {
            type: 'select',
            required: false,
            option: {
              list: []
            },
            methods: {
              getData() {
                this.option.list = resourcePosition.getList()
                return Promise.resolve()
              }
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
      {
        prop: 'order_by',
        name: '排序',
        originprop: 'order_by',
        originfrom: 'list',
        mod: {
          list: {
            width: 60,
          },
          edit: {
            type: 'inputNumber',
            required: true,
            option: {
              min: 0,
              precision: 0,
              step: 1
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

class ResourceList extends ListData {
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
        label: item.resourceniche_name
      })
    }
    this.select.setList(select)
  }
  getData () {
    return new Promise((resolve, reject) => {
      resourcePosition.loadData().finally(() => {
        let postdata = this.getSearch()
        postdata.status = 'showResourceniche'
        api.adminApi(postdata).then(res => {
          this.formatData(res.data.data, res.data.totalCount)
          this.buildSelect()
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    })
  }
  buildItem ({ postdata }) {
    return new Promise((resolve, reject) => {
      postdata.status = 'setResourceniche'
      api.adminApi(postdata).then(res => {
        _func.showmsg('新增资源位成功！', 'success')
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
      postdata.status = 'editResourceniche'
      let prop = this.getDictionaryPropData('prop')
      postdata[prop] = targetitem[prop]
      api.adminApi(postdata).then(res => {
        _func.showmsg('修改资源位成功！', 'success')
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

ResourceList.$name = 'ResourceList'

export default ResourceList
