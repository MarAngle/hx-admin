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
    setInfo(userInfo, unSave) {
      this.formatData(userInfo)
      if (!unSave) {
        _func.setLocalData('userInfo', userInfo)
      }
    },
    getUserInfo(userId) {
      return new Promise((resolve, reject) => {
        api.userInfo(userId).then(res => {
          if (res.data.data) {
            resolve({ status: 'success', data: res.data.data })
          } else {
            reject({ status: 'fail', code: 'empty' })
          }
        }, err => {
          reject(err)
        })
      })
    },
    getData () {
      return new Promise((resolve, reject) => {
        this.getUserInfo(this.getItem('id')).then(res => {
          this.setInfo(res.data)
          resolve(res)
        }, err => {
          console.error(err)
          // 用户数据获取失败直接退出
          this.logoutFail()
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
    logoutFail() {
      this.logout()
    },
    logout() {
      return new Promise((resolve, reject) => {
        this.setInfo()
        window.location.reload()
        resolve()
      })
    }
  }
})

user.autoLoad()

export default user
