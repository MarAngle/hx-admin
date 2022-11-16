import Vue from 'vue'
import _func from 'complex-func'
import { Toast, Dialog } from "vant"

const defaultMethods = {
  $pxToVw(pxData, unit) {
    let vwData = pxData / 375 * 100
    if (unit) {
      vwData = vwData + 'vw'
    }
    return vwData
  }
}


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
        showmsg: function (content, type = "text", duration = 3) {
          if (type == "error" || type == "warn" || type == "warning") {
            type = "fail";
          }
          Toast({
            type: type,
            message: content,
            duration: duration * 1000,
          });
        }, 
        alert: function (content, title, next, okText = "确认") {
          Dialog.alert({
            title: title,
            message: content,
            confirmButtonText: okText,
          }).then(() => {
            if (next) {
              next("ok");
            }
          });
        },
        confirm: function (
          content,
          title,
          next,
          okText = "确认",
          cancelText = "取消"
        ) {
          Dialog.confirm({
            title: title,
            message: content,
            confirmButtonText: okText,
            cancelButtonText: cancelText,
          })
            .then(() => {
              if (next) {
                next("ok");
              }
            })
            .catch(() => {
              if (next) {
                next("cancel");
              }
            });
        },
      }
    },
    require: option.require
  })

}
