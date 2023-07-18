import _func from 'complex-func'
import { ListData } from 'complex-data'
import api from '@api/index'
import select from "@index/main/select"
import PicView from '@/config/components/mod/PicView.vue'
import UploadPicMultiple from '@/config/components/mod/UploadPicMultiple.vue'
import { mutipleFileUpload } from '@/pages/index/main/complex/utils'
import categoryList from './../../manage/category/maindata'
import resourceList from './../../manage/resource/maindata'
import marketList from './../../manage/market/maindata'

class ItemList extends ListData {
  constructor(option = {}) {
    super(option)
  }
  loadLocalDepend() {
    return _func.promiseAllFinished([categoryList.loadData(), resourceList.loadData(), marketList.loadData()])
  }
  getData () {
    return new Promise((resolve, reject) => {
      this.loadLocalDepend().finally(() => {
        let postdata = this.getSearch()
        const pageData = this.getPageData()
        postdata.pageNumber = pageData.page
        postdata.pageSize = pageData.size
        postdata.status = 'tradeItemList'
        api.itemApi(postdata).then(res => {
          this.formatData(res.data.data.list, Number(res.data.data.trade_num.total))
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    })
  }
  parseEditData(postdata) {
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
  }
  buildItem ({ postdata }) {
    return new Promise((resolve, reject) => {
      postdata.status = 'tradeItemCreate'
      this.parseEditData(postdata)
      api.itemApi(postdata).then(res => {
        _func.showmsg('新增套餐成功！', 'success')
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
      postdata.status = 'tradeItemModify'
      let prop = this.getDictionaryPropData('prop')
      postdata[prop] = targetitem[prop]
      this.parseEditData(postdata)
      api.itemApi(postdata).then(res => {
        _func.showmsg('修改套餐成功！', 'success')
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
  changeDataStatus(valueItem, record) {
    return new Promise((resolve, reject) => {
      api.itemApi({
        status: valueItem.value == 0 ? 'tradeItemOffshelf' : 'tradeItemGrounding',
        commodity_id: record.commodity_id
      }).then(res => {
        _func.showmsg(`${valueItem.label}成功！`, 'success')
        record.sale_status = valueItem
        resolve()
      }, res => {
        reject(res)
      })
    })
  }
}

ItemList.$name = 'ItemList'

// 套餐字段订单在使用,勿改
let itemList = new ItemList({
  name: '套餐',
  prop: 'itemList',
  dictionary: {
    layout: {
      default: {
        grid: 12,
        label: 6,
        content: 18
      }
    },
    id: {
      prop: 'commodity_id',
      data: ''
    },
    list: [
      {
        prop: 'commodity_id',
        name: 'ID',
        originprop: 'commodity_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'sku_id',
        name: '商品编号',
        originprop: 'sku_id',
        originfrom: 'list',
        mod: {
          list: {
            width: 130
          },
          edit: {
            type: 'input',
            required: true,
            option: {
              maxLength: 120
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
        mod: {
          list: {}
        }
      },
      {
        prop: 'commodity_name',
        name: '名称',
        originprop: 'commodity_name',
        originfrom: 'list',
        mod: {
          list: {
            width: 240
          },
          edit: {
            type: 'input',
            required: true,
            option: {
              maxLength: 140
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
          list: {
            width: 80
          },
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
          list: {
            width: 80
          },
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
          list: {
            width: 80
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
        prop: 'evaluate',
        name: '好评度',
        originprop: 'evaluate',
        originfrom: 'list',
        mod: {
          list: {
            width: 80
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
        prop: 'effective_day',
        name: '有效期',
        originprop: 'effective_day',
        originfrom: 'list',
        mod: {
          list: {
            width: 80
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
        prop: 'commodity_zone_id',
        showprop: {
          default: 'value',
          list: 'label'
        },
        name: '专区',
        originprop: 'commodity_zone_id',
        originfrom: 'list',
        func: {
          format(value) {
            return categoryList.select.getItem(value)
          }
        },
        mod: {
          list: {},
          edit: {
            type: 'select',
            required: false,
            option: {
              list: []
            },
            methods: {
              getData() {
                this.option.list = categoryList.select.getList()
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
      {
        prop: 'commodity_resourceniche_id',
        showprop: {
          default: 'value',
          list: 'label'
        },
        name: '资源位',
        originprop: 'commodity_resourceniche_id',
        originfrom: 'list',
        func: {
          format(value) {
            return resourceList.select.getItem(value)
          }
        },
        mod: {
          list: {
            width: 90
          },
          edit: {
            type: 'select',
            required: false,
            option: {
              list: []
            },
            methods: {
              getData() {
                this.option.list = resourceList.select.getList()
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
      {
        prop: 'commodity_marketing',
        name: '销售语:name',
        originprop: 'commodity_marketing',
        originfrom: 'list',
        mod: {
          list: {
            width: 200
          }
        }
      },
      {
        prop: 'commodity_marketing_id',
        showprop: {
          default: 'value',
          list: 'label'
        },
        name: '营销语:当前id对应',
        originprop: 'commodity_marketing_id',
        originfrom: 'list',
        func: {
          format(value) {
            return marketList.select.getItem(value)
          }
        },
        mod: {
          list: {
            width: 200
          },
          edit: {
            type: 'select',
            required: false,
            option: {
              list: []
            },
            methods: {
              getData() {
                this.option.list = marketList.select.getList()
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
      select.getItemByFormat('base', 'itemStatus', {
        prop: 'sale_status',
        name: '状态',
        originprop: 'sale_status',
        originfrom: 'list'
      }, {
        list: {
          color: true,
          switch: {
            operate(valueItem, record, prop) {
              _func.confirm(`确认${valueItem.label}吗？`, '警告', (act) => {
                if (act == 'ok') {
                  itemList.changeDataStatus(valueItem, record)
                }
              })
            }
          }
        },
        edit: {
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
            width: 60
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
        prop: 'main_pic',
        name: 'LOGO',
        originprop: 'main_pic',
        originfrom: 'list',
        mod: {
          list: {
            width: 200,
            customRender(text, record, index) {
              return _func.$EventBus.$createElement(PicView, {
                props: {
                  list: text,
                  itemStyle: {
                    width: '50px',
                    maxHeight: '50px',
                    margin: '0 auto'
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
                return _func.$EventBus.$createElement(UploadPicMultiple, option)
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
            width: 200,
            customRender(text, record, index) {
              return _func.$EventBus.$createElement(PicView, {
                props: {
                  list: text,
                  itemStyle: {
                    width: '50px',
                    maxHeight: '50px',
                    margin: '0 auto'
                  },
                  style: {
                    margin: '0 auto',
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
                return _func.$EventBus.$createElement(UploadPicMultiple, option)
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
          list: {
            width: 80,
            fixed: 'right'
          }
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
      list: [
        {
          prop: 'tab_status',
          name: '状态',
          originprop: 'tab_status',
          mod: {
            build: {
              width: 140,
              type: 'select',
              required: false,
              option: {
                list: [
                  {
                    value: 'grounding',
                    label: '上架'
                  },
                  {
                    value: 'off_shelf',
                    label: '下架'
                  }
                ]
              }
            }
          }
        },
        {
          prop: 'select_trade',
          name: '商品筛选',
          originprop: 'select_trade',
          originfrom: 'list',
          mod: {
            build: {
              type: 'input',
              placeholder: '请输入商品名称/编号',
              width: 200,
              required: false,
              option: {
                maxLength: 120
              }
            }
          }
        },
        {
          prop: 'select_zone',
          name: '专区',
          originprop: 'select_zone',
          mod: {
            build: {
              width: 240,
              type: 'select',
              required: false,
              option: {
                list: []
              },
              methods: {
                getData() {
                  this.option.list = categoryList.select.getList()
                  return Promise.resolve()
                }
              }
            }
          }
        },
      ]
    }
  },
  extradata: {},
  pagination: true
})

export default itemList
