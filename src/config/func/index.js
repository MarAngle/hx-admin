import Vue from 'vue'
import _func from 'complex-func'
import { Modal, notification } from 'ant-design-vue'

const defaultMethods = {}


export const init = function(option = {}) {
  _func.page.init()

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
