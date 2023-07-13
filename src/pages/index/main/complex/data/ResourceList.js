import _func from 'complex-func'
import { ListData } from 'complex-data'
import api from '@api/index'
import select from "@index/main/select"
import PicView from '@/config/components/mod/PicView.vue'
import UploadPic from '@/config/components/mod/UploadPic.vue'
import { fileUpload } from '../utils'

// "resourceniche_id": "1",
// "resourceniche_name": "热销",
// "resourceniche_position_id": "1",
// "order_by": "1",
// "is_show": "1",
// "create_time": "2023-07-13 15:56:06"

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
        prop: 'name',
        name: '名称',
        originprop: 'resourceniche_name',
        originfrom: 'list',
        mod: {
          list: {
            width: 165
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
        name: '位置ID?',
        originprop: 'resourceniche_position_id',
        originfrom: 'list',
        mod: {
          list: {
            width: 100
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
      {
        prop: 'order_by',
        name: '排序',
        originprop: 'order_by',
        originfrom: 'list',
        mod: {
          list: {
            width: 80,
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
  }
  getData () {
    return new Promise((resolve, reject) => {
      let postdata = this.getSearch()
      postdata.status = 'showResourceniche'
      api.adminApi(postdata).then(res => {
        this.formatData(res.data.data, res.data.totalCount)
        resolve(res)
      }, err => {
        reject(err)
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
