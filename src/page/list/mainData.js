import _func from 'complex-func'
import { BaseData } from 'complex-data'
import Vue from 'vue'
import localData from './localData'

let mainData = new BaseData({
  name: 'ListData',
  prop: 'ListData',
  data: {
    current: undefined,
    data: {}
  },
  methods: {
    getData() {
      return new Promise((resolve) => {
        let defaultProp
        for (let i = 0; i < localData.length; i++) {
          const item = localData[i]
          Vue.set(this.data.data, item.prop, item)
          if (item.default) {
            defaultProp = item.prop
          }
          this.formatLocalItem(item)
        }
        if (!defaultProp) {
          defaultProp = localData[0].prop
        }
        if (!this.data.current) {
          this.setCurrent(defaultProp)
        }
        resolve()
      })
    },
    formatLocalItem(item) {
      for (let i = 0; i < item.type.data.length; i++) {
        const prop = item.type.data[i];
        if (item.type[prop].id) {
          this.getUrlById(item.type[prop]).then(() => {}, () => {})
        }
      }
    },
    getUrlById(typeData) {
      return new Promise((resolve, reject) => {
        _func.post({
          url: 'vehicle/business/static/app/update_version',
          data: {
            "appType": typeData.type || 1,                //类型：Number  必有字段  备注：app类型(1:安卓, 2: ios)
            "appProviderType": typeData.id                //类型：Number  必有字段  备注：用户标识（1：车主app；2;其他）
          }
        }).then(res => {
          if (res.data.data.appDownUrl) {
            let url = res.data.data.appDownUrl
            if (url.indexOf('https://') == 0 || url.indexOf('http://') == 0) {
              // 正常链接不需要修正
            } else {
              url = 'http://android-upgrade.wuzheng.com.cn' + url
            }
            typeData.src = url
            resolve(res)
          } else {
            _func.showmsg('获取到的下载链接为空！')
            reject(res)
          }
        }, err => {
          console.error(err)
          reject(err)
        })
      })

    },
    setCurrent(current) {
      this.data.current = current
    },
    syncCurrent(current) {
      if (current && this.data.current != current) {
        this.setCurrent(current)
      }
    }
  }
})

export default mainData
