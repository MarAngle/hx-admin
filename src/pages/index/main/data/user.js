import _func from 'complex-func'
import { InfoData } from 'complex-data'
import api from '@api/index'
import { userDict } from '@index/main/complex/dict/user'

let user = new InfoData({
  name: '用户信息',
  prop: 'userData',
  status: {
    list: [
      {
        prop: 'login',
        data: {
          list: [
            {
              value: 'unlogin',
              label: '未登录'
            },
            {
              value: 'logining',
              label: '登录中'
            },
            {
              value: 'logined',
              label: '已登录'
            }
          ]
        }
      },
    ]
  },
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
        this.setStatus('logining', 'login')
        api.login(postdata).then(res => {
          let userInfo = {
            id: '',
            name: postdata.mobile,
            platform: 'admin',
            status: 1
          }
          let token = res.data.data.token
          _func.setToken('AUTHORIZATION', token)
          this.setInfo(userInfo)
          this.setStatus('logined', 'login')
          this.loadData(true, true).then(res => {
            resolve(res)
          })
        }, err => {
          this.setStatus('unlogin', 'login')
          console.error(err)
          reject(err)
        })
      })
    },
    clearInfo() {
      this.formatData(null)
      _func.setLocalData('userInfo', null)
    },
    setInfo(userInfo, unSave) {
      this.formatData(userInfo)
      if (!unSave) {
        _func.setLocalData('userInfo', userInfo)
      }
    },
    getUserInfo(userId) {
      return new Promise((resolve, reject) => {
        api.userInfo({
          id: userId
        }).then(res => {
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
    getData (fromLogin) {
      return new Promise((resolve, reject) => {
        // if (!fromLogin) {
        //   this.getUserInfo(this.getItem('id')).then(res => {
        //     this.setInfo(res.data)
        //     resolve(res)
        //   }, err => {
        //     console.error(err)
        //     // 用户数据获取失败直接退出
        //     this.logoutFail()
        //     reject(err)
        //   })
        // } else {
        //   resolve({ status: 'success' })
        // }
        resolve({ status: 'success' })
      })
    },
    autoLoad() {
      let userInfo = _func.getLocalData('userInfo')
      if (userInfo && _func.getToken('AUTHORIZATION')) {
        this.setInfo(userInfo, true)
        this.setStatus('logined', 'login')
      }
    },
    logoutFail() {
      this.logout()
    },
    logout() {
      return new Promise((resolve, reject) => {
        this.reset()
        window.location.reload()
        resolve()
      })
    }
  }
})

user.onLife('reseted', {
  data: (instantiater, resetOption) => {
    user.clearInfo()
    _func.setToken('AUTHORIZATION', undefined)
  }
})

user.autoLoad()

export default user
