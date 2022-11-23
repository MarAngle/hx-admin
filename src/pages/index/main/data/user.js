import _func from 'complex-func'
import { InfoData } from 'complex-data'
import api from '@api/index'
import { userDict } from '@index/main/complex/dict/user'

let user = new InfoData({
  name: '用户信息',
  prop: 'userData',
  dictionary: {
    id: {
      prop: 'id',
      data: ''
    },
    list: userDict.getList()
  },
  methods: {
    login(postdata) {
      return this.loadData(true, postdata)
    },
    setInfo(userInfo, unSave) {
      this.formatData(userInfo)
      if (!unSave) {
        _func.setLocalData('userInfo', userInfo)
      }
    },
    refreshData() {
      return new Promise((resolve, reject) => {
        api.userInfo(this.getItem('id')).then(res => {
          if (res.data.data) {
            this.setInfo(res.data.data)
          } else {
            // 用户数据为空进行退出
            this.logoutFinal()
          }
          resolve(res)
        }, err => {
          console.error(err)
          // 用户数据获取失败直接退出
          this.logoutFinal()
          reject(err)
        })
      })
    },
    getData (postdata) {
      return new Promise((resolve, reject) => {
        api.login(postdata).then(res => {
          let userInfo = res.data.data
          this.setInfo(userInfo)
          resolve(res)
        }, err => {
          console.error(err)
          reject(err)
        })
      })
    },
    autoLoad() {
      let userInfo = _func.getLocalData('userInfo')
      if (userInfo) {
        this.setInfo(userInfo, true)
        this.setStatus('loaded', 'load')
      }
    },
    logoutFinal() {
      this.setInfo()
      window.location.reload()
    },
    logout() {
      return new Promise((resolve, reject) => {
        this.setInfo()
        resolve()
      })
    }
  }
})

user.autoLoad()

export default user
