import { init } from "@/config/func";
import { getCurrentUrl } from '@/config/url';

let currentUrl = getCurrentUrl('gateway')

let _func = init({
  page: 'default',
  require: {
    api: {
      baseURL: currentUrl
    },
    option: {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    },
    rule: [
      {
        name: '基本',
        prop: 'default',
        token: {
          check: true,
          fail: function (tokenName, ruleItem) {
            console.error(tokenName, ruleItem)
          },
          data: {}
        },
        methods: {
          checkUrl(url) {
            if (url.indexOf(currentUrl) > -1) {
              return true
            } else {
              return false
            }
          },
          check (response) {
            let res = {
              status: 'fail'
            }
            if (response.data) {
              res.data = response.data
              if (response.data.result == 'SUCCEED') {
                res.status = 'success'
                res.msg = response.data.errorMessage
              } else if (response.data.result == 'LOGIN') {
                res.status = 'login'
                res.code = response.data.errorCode
                res.msg = response.data.errorMessage
              } else {
                res.code = response.data.errorCode
                res.msg = response.data.errorMessage || '接口请求返回失败且无错误信息！'
              }
            }
            return res
          },
          failMsg (errRes) {
            if (errRes.error.response) {
              if (errRes.error.response.data && errRes.error.response.data.message) {
                // return errRes.error.response.data.message
              }
            }
          }
        }
      }
    ]
  }
})

export default _func