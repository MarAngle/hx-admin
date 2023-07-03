import _func from 'complex-func'
import { format } from './mock'

let mock = false
mock = true

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
  if (!mock || !option.mock) {
    let promise = _func[method](requireData)
    return promise
  } else {
    return Promise.resolve(format(option.mock(requireData)))
  }
}

export const init = function(data) {
  for (const prop in data) {
    let dataItem = data[prop]
    if (dataItem.auto !== false) {
      api[prop] = function(...args) {
        return parse(dataItem, ...args)
      }
    }
  }
}

export default api
