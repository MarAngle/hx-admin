import Vue from 'vue'
import _func from 'complex-func'
import { Modal, notification } from 'ant-design-vue'

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
  }
}

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
    data: option.data || {},
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

}
