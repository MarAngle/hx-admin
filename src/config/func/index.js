import Vue from 'vue'
import _func from 'complex-func'
import { Select, Modal, notification } from 'ant-design-vue'
import SelectSwitch from '@/config/components/mod/SelectSwitch.vue'

const defaultMethods = {
  isUrlPre: function (url) {
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      return true
    } else {
      return false
    }
  },
  formatApi: function (url, payload = {}) {
    let preUrl = payload.pre || ''
    if (!this.isUrlPre(url)) {
      if (this.isUrlPre(preUrl)) {
        return preUrl + url
      }
      return preUrl + url
    } else {
      return url
    }
  },
  setTitle(defaultTitle, routeName, routeTitle) {
    document.title = defaultTitle + '-' + routeName
  },
  changeFunc(func, before, after) {
    if (before) {
      let nextFunc = func
      func = function(data, payload) {
        data = before(data, payload)
        return nextFunc(data, payload)
      }
    }
    if (after) {
      let currentFunc = func
      func = function(data, payload) {
        let res = currentFunc(data, payload)
        return after(res, data, payload)
      }
    }
    return func
  },
  initDictionaryFormat(format) {},
  buildDictionaryItemBySelect(selectData, initOption, option = {}) {
    if (selectData.constructor.$name == 'SelectData') {
      selectData = selectData.getModule('select')
    }
    let prop = initOption.prop
    let valueProp = option.value || 'value'
    let labelProp = option.label || 'label'
    let color = option.color
    let format = option.format || {}
    let listOption = option.list
    let editOption = option.edit
    let formatFunc = this.changeFunc(function(data) {
      return selectData.getItem(data)
    }, format.before, format.after)
    let data = {
      showprop: {
        list: labelProp,
        default: valueProp
      },
      func: {
        format: formatFunc
      },
      mod: {}
    }
    if (listOption) {
      data.mod.list = {}
      if (listOption.color) {
        data.mod.list.customCell = function(record) {
          let value = record[prop]
          return {
            style: {
              color: value.color
            }
          }
        }
      }
      if (listOption.switch) {
        data.mod.list.customRender = function (text, record, index) {
          return _func.$EventBus.$createElement(SelectSwitch, {
            props: {
              value: record[prop],
              operate: !!listOption.switch.operate
            },
            on: {
              change(currentValue) {
                let list = selectData.getList()
                for (let i = 0; i < list.length; i++) {
                  const item = list[i]
                  if (item._switch === currentValue) {
                    listOption.switch.operate(item, record, prop)
                    break
                  }
                }
              }
            }
          })
        }
      } else if (listOption.select) {
        if (listOption.select === true) {
          listOption.select = {}
        }
        data.mod.list.customRender = function (text, record, index) {
          let optionsList = selectData.getList(listOption.select.list)
          let options = {
            props: {
              value: record[prop].value,
              options: optionsList,
              disabled: !listOption.select.operate,
              ...listOption.select.props
            },
            on: {}
          }
          if (listOption.select.operate) {
            options.on.change = function(currentValue) {
              for (let i = 0; i < optionsList.length; i++) {
                const item = optionsList[i]
                if (item.value === currentValue) {
                  listOption.select.operate(item, record, prop)
                  break
                }
              }
            }
          }
          options.on = {
            ...options.on,
            ...listOption.select.on
          }
          return _func.$EventBus.$createElement(Select, options)
        }
      }
    }
    if (editOption) {
      for (const editProp in editOption) {
        if (editOption[editProp]) {
          if (editOption[editProp] === true) {
            editOption[editProp] = {}
          }
          data.mod[editProp] = {
            formatType: 'edit',
            type: 'select',
            width: editOption.width,
            option: {
              list: selectData.getList(editOption[editProp].list),
              optionValue: valueProp,
              optionLabel: labelProp
            }
          }
        }
      }
    }
    let selectDefaultDictionary = selectData.getExtra('dictionary')
    if (!selectDefaultDictionary) {
      return _func.mergeData(data, initOption)
    } else {
      if (typeof selectDefaultDictionary == 'function') {
        selectDefaultDictionary = selectDefaultDictionary({ prop: initOption.prop })
      }
      return _func.mergeData(data, selectDefaultDictionary, initOption)
    }
  }
}

_func.setEnvMode(process.env.VUE_APP_APITYPE, 'real')
_func.setEnvMode(process.env.VUE_APP_APITYPE, 'data')

export const init = function(option = {}) {
  if (option.page === 'default') {
    _func.page.style = {
      default: {},
      current: {}
    }
    _func.page.initDefaultStyle = function(style) {
      this.style.default = style || {}
    }
    _func.page.setStyle = function(style) {
      if (style) {
        this.style.current = style
      } else {
        this.style.current = this.style.default
      }
    }
    _func.page.installMod('sider', {
      type: 'default',
      width: 200,
      change(type) {
        this.type = type
        this.width = type == 'mini' ? 80 : 200
      },
      recount(extra) {
        extra.width = extra.width + this.width
        return extra
      }
    })
    _func.page.installMod('header', {
      height: 60,
      recount(extra) {
        extra.height = extra.height + this.height
        return extra
      }
    })
    _func.page.initDefaultStyle({
      backgroundColor: '#fff'
    })
    _func.page.init()
  } else if (option.page) {
    option.page(_func.page, _func)
  } else {
    _func.page.init()
  }

  let methods = {
    ...defaultMethods,
    ...option.methods
  }

  Vue.use(_func, {
    root: {
      $EventBus: new Vue(),
      ...option.root
    },
    data: {
      ...option.data
    },
    methods: methods,
    notice: {
      methods: {
        showmsg: function (content, type = 'open', title = '通知', duration = 3) {
          this.setmsg({
            message: title,
            description: content,
            duration: duration
          }, type)
        },
        setmsg: function (option, type = 'open') {
          if (notification[type]) {
            notification[type](option)
          } else {
            console.error('notification type is not defined, type reset open')
            notification.open(option)
          }
        },
        alert: function (content, title = '警告', next, okText = '确认') {
          this.setmodal({
            title: title,
            content: content,
            okText: okText,
            onOk: function () {
              if (next) {
                next('ok')
              }
            }
          }, 'error')
        },
        confirm: function (content, title = '警告', next, okText = '确认', cancelText = '取消') {
          this.setmodal({
            title: title,
            content: content,
            okText: okText,
            cancelText: cancelText,
            onCancel: function () {
              if (next) {
                next('cancel')
              }
            },
            onOk: function () {
              if (next) {
                next('ok')
              }
            }
          }, 'confirm')
        },
        setmodal: function (option, type = 'info') {
          if (Modal[type]) {
            Modal[type](option)
          } else {
            console.error('modal type is not defined, type reset info')
            Modal.info(option)
          }
        }
      }
    },
    require: option.require
  })
  _func.setLocalDataPre(option.localPre || 'pure-admin-')
  return _func
}

export default _func