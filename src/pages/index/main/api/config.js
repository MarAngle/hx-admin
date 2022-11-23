import _func from 'complex-func'

const _data = require.context('./data', false, /\.js$/)

let api = {}

_func.loadContents(_data, (moditem) => {
  for (const prop in moditem.default) {
    if (!api[prop]) {
      api[prop] = moditem.default[prop]
    } else {
      _func.exportMsg(`存在重复api(${prop})!`)
    }
  }
})

function checkApi() {
  let keys = Object.keys(api)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    let item = api[key]
    checkApiNext(item, keys, i, key)
  }
}
function checkApiNext(item, keys, index, key) {
  for (let i = index + 1; i < keys.length; i++) {
    const nextKey = keys[i]
    let nextItem = api[nextKey]
    if (item.url == nextItem.url && item.urlConfig.local == nextItem.urlConfig.local && item.urlConfig.type == nextItem.urlConfig.type && item.urlConfig.sync == nextItem.urlConfig.sync) {
      _func.exportMsg(`存在重复api(${key}/${nextKey})!`)
    }
  }
}

if (_func.getEnv('real') == 'development') {
  // 真实环境为开发环境时检查api的重复性
  checkApi()
}

export default api