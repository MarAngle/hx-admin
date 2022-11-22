import _func from "../func"
import { buildProp } from "../proxy"


export const urlDict = {
  gateway: {
    default: 'https://gateway-dev.wuzheng.com.cn/',
    dev: 'https://gateway-dev.wuzheng.com.cn/',
    test: 'https://gateway-test.wuzheng.com.cn/',
    prod: 'https://gateway.wuzheng.com.cn/'
  }
}

export const getCurrentUrl = function(type) {
  let realEnv = _func.getEnv('real')
  let prop = _func.getEnvMode('data') || 'default'
  let currentUrl
  if (realEnv == 'development') {
    currentUrl = buildProp(type, prop) + '/'
  } else {
    currentUrl = urlDict[type][prop]
    if (!currentUrl) {
      currentUrl = urlDict[type].default
    }
  }
  return currentUrl
}

