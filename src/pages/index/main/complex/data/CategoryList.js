import _func from 'complex-func'
import { ListData, SelectList } from 'complex-data'
import api from '@api/index'
import select from "@index/main/select"
import PicView from '@/config/components/mod/PicView.vue'
import UploadPic from '@/config/components/mod/UploadPic.vue'
import { fileUpload } from '../utils'

const defaultInitOption = {
  name: '专区',
  prop: 'categoryList',
  dictionary: {
    layout: {
      default: {
        label: 6,
        content: 18
      }
    },
    id: {
      prop: 'zone_id',
      data: ''
    },
    list: [
      {
        prop: 'zone_id',
        name: 'ID',
        originprop: 'zone_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'zone_name',
        name: '名称',
        originprop: 'zone_name',
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
        prop: 'zone_picture',
        name: '详情',
        originprop: 'zone_picture',
        originfrom: 'list',
        mod: {
          list: {
            width: 66,
            customRender(text, record, index) {
              return _func.$EventBus.$createElement(PicView, {
                props: {
                  list: [text],
                  itemStyle: {
                    width: '50px'
                  }
                },
                style: {
                  margin: '0 auto',
                  width: '50px'
                }
              })
            }
          },
          edit: {
            type: 'file',
            slot: {
              type: 'model',
              render({ option }) {
                return _func.$EventBus.$createElement(UploadPic, option)
              }
            },
            placeholder: '请上传照片',
            required: true,
            option: {
              accept: '.jpg,.jpeg,.png',
              maxSize: 10,
              upload: true,
              fileUpload({ file }) {
                return fileUpload(file)
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

class CategoryList extends ListData {
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
        label: item.zone_name
      })
    }
    this.select.setList(select)
  }
  getData () {
    return new Promise((resolve, reject) => {
      let postdata = this.getSearch()
      postdata.status = 'showZone'
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
      postdata.status = 'setZone'
      api.adminApi(postdata).then(res => {
        _func.showmsg('新增专区成功！', 'success')
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
      postdata.status = 'editZone'
      let prop = this.getDictionaryPropData('prop')
      postdata[prop] = targetitem[prop]
      api.adminApi(postdata).then(res => {
        _func.showmsg('修改专区成功！', 'success')
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

CategoryList.$name = 'CategoryList'

export default CategoryList
