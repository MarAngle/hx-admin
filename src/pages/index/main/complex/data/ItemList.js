import _func from 'complex-func'
import { ListData } from 'complex-data'
import api from '@api/index'
import select from "@index/main/select"
import PicView from '@/config/components/mod/PicView.vue'
import UploadPic from '@/config/components/mod/UploadPic.vue'

function mutipleFileUpload(fileList) {
  return new Promise((resolve) => {
    let resList = []
    function next(fileList, index) {
      if (index < fileList.length) {
        fileUpload(fileList[index]).then(res => {
          resList.push(res)
          next(fileList, index + 1)
        }, err => {
          next(fileList, index + 1)
        })
      } else {
        resolve(resList)
      }
    }
    next(fileList, 0)
  })
}
function fileUpload(file) {
  return new Promise((resolve, reject) => {
    api.itemImgUpload({
      status: 'pictureUpload',
      file: file
    }).then(res => {
      resolve({
        data: res.data.data.path,
        url: res.data.data.path,
        name: file.name
      })
    }, err => {
      reject(err)
    })
  })
}

const defaultInitOption = {
  name: '产品',
  prop: 'itemList',
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
    list: [
      {
        prop: 'id',
        name: 'ID',
        originprop: 'commodity_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'commodity_zone_id',
        name: 'commodity_zone_id',
        originprop: 'commodity_zone_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'sku_id',
        name: '商品SKU',
        originprop: 'sku_id',
        originfrom: 'list',
        mod: {
          list: {},
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
        prop: 'model_id',
        name: 'model_id',
        originprop: 'model_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'name',
        name: '名称',
        originprop: 'commodity_name',
        originfrom: 'list',
        mod: {
          list: {},
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
        prop: 'original_price',
        name: '原价',
        originprop: 'original_price',
        originfrom: 'list',
        func: {
          format(value) {
            return value / 100
          },
          unedit(value) {
            return value * 100
          }
        },
        mod: {
          list: {},
          edit: {
            type: 'inputNumber',
            required: true,
            option: {
              min: 0,
              precision: 2,
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
        prop: 'selling_price',
        name: '售价',
        originprop: 'selling_price',
        originfrom: 'list',
        func: {
          format(value) {
            return value / 100
          },
          unedit(value) {
            return value * 100
          }
        },
        mod: {
          list: {},
          edit: {
            type: 'inputNumber',
            required: true,
            option: {
              min: 0,
              precision: 2,
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
        prop: 'sold_quantity',
        name: '销量',
        originprop: 'sold_quantity',
        originfrom: 'list',
        mod: {
          list: {},
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
        prop: 'effective_day',
        name: '有效期天数',
        originprop: 'effective_day',
        originfrom: 'list',
        mod: {
          list: {},
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
        prop: 'commodity_marketing',
        name: '销售语',
        originprop: 'commodity_marketing',
        originfrom: 'list',
        mod: {
          list: {}
        }
      },
      select.getItemByFormat('base', 'itemStatus', {
        prop: 'status',
        name: '状态',
        originprop: 'sale_status',
        originfrom: 'list'
      }, {
        list: {
          color: true,
          switch: {
            operate: false
          }
        },
        edit: {
          change: true,
          build: true
        }
      }),
      {
        prop: 'main_pic',
        name: 'LOGO',
        originprop: 'main_pic',
        originfrom: 'list',
        mod: {
          list: {
            customRender(text, record, index) {
              return _func.$EventBus.$createElement(PicView, {
                props: {
                  list: text,
                  itemStyle: {
                    width: '50px'
                  }
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
              multiple: true,
              maxNum: 10,
              maxSize: 10,
              upload: true,
              fileUpload({ file }) {
                return mutipleFileUpload(file)
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
      {
        prop: 'detail_pic',
        name: '详情',
        originprop: 'detail_pic',
        originfrom: 'list',
        mod: {
          list: {
            customRender(text, record, index) {
              return _func.$EventBus.$createElement(PicView, {
                props: {
                  list: text,
                  itemStyle: {
                    width: '50px'
                  }
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
              multiple: true,
              maxNum: 10,
              maxSize: 10,
              upload: true,
              fileUpload({ file }) {
                return mutipleFileUpload(file)
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

class ItemList extends ListData {
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
      postdata.status = 'tradeItemList'
      // postdata.pageNo = this.getPageData('page')
      // postdata.pageSize = this.getPageData('size')
      api.itemApi(postdata).then(res => {
        this.formatData(res.data.data, res.data.totalCount)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
  buildItem ({ postdata }) {
    return new Promise((resolve, reject) => {
      postdata.status = 'tradeItemCreate'
      postdata.evaluate = 0 // 评价
      postdata.commodity_marketing_id = 1 // 营销语id
      postdata.commodity_resourceniche_id = 1 // 资源位id
      postdata.order_by = 1
      postdata.pic = {
        main_list: postdata.main_pic.map(pic => {
          return {
            path: pic
          }
        }),
        detail_list: postdata.detail_pic.map(pic => {
          return {
            path: pic
          }
        })
      }
      delete postdata.main_pic
      delete postdata.detail_pic
      api.itemApi(postdata).then(res => {
        _func.showmsg('新增产品成功！', 'success')
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
      api.itemApi(postdata).then(res => {
        _func.showmsg('修改产品成功！', 'success')
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

ItemList.$name = 'ItemList'

export default ItemList
