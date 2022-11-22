import _func from 'complex-func'
import config from './config'

function appendProp(requireData, propList, args) {
  if (propList && propList.length > 0 && args && args.length > 0) {
    for (let i = 0; i < propList.length; i++) {
      const prop = propList[i]
      const data = args[i]
      if (data) {
        if (prop != 'url') {
          requireData[prop] = data
        } else {
          requireData.url += data
        }
      }
    }
  }
}

let api = {}

function parse(option, ...args) {
  let method = option.method || 'get'
  let url = _func.formatApi(option.url, option.urlConfig)
  let requireData = {
    url: url,
    token: option.token
  }
  appendProp(requireData, option.data, args)
  let promise = _func[method](requireData)
  if (!option.urlConfig.sync || _func.getEnvMode('data') == 'online') {
    return promise
  } else {
    // 需要同步且为站点模式时进行同步操作
    return new Promise((resolve, reject) => {
      let spin = option.urlConfig.sync.spin
      if (spin) {
        _func.showSpin(spin.self)
      }
      promise.then(res => {
        if (spin) {
          _func.changeSpinContent(spin.sync)
        }
        let name = option.urlConfig.sync.name
        let syncArgs = []
        if (option.urlConfig.sync.args) {
          if (typeof option.urlConfig.sync.args == 'function') {
            syncArgs = option.urlConfig.sync.args(res, args)
          }
        }
        api[name](...syncArgs).then(syncRes => {
          if (spin) {
            _func.hiddenSpin()
          }
          resolve(res)
          _func.showmsg('服务器数据同步成功！', 'success')
        }, syncErr => {
          if (spin) {
            _func.hiddenSpin()
          }
          console.error(syncErr)
          resolve(res)
          _func.showmsg('服务器数据同步失败！', 'warn')
        })
      }, err => {
        if (spin) {
          _func.hiddenSpin()
        }
        reject(err)
      })
    })
  }
}


for (const prop in config) {
  let configItem = config[prop]
  if (configItem.auto !== false) {
    api[prop] = function(...args) {
      return parse(configItem, ...args)
    }
  }
}


export default api
