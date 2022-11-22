import _func from "../func"


const dict = {
  gateway: {
    default: 'https://gateway-dev.wuzheng.com.cn/',
    dev: 'https://gateway-dev.wuzheng.com.cn/',
    test: 'https://gateway-test.wuzheng.com.cn/',
    prod: 'https://gateway.wuzheng.com.cn/'
  }
}

export const getCurrentUrl = function(prop) {
  let realEnv = _func.getEnv('real')
  let type = _func.getEnvMode('data') || 'default'
  let currentUrl
  if (realEnv == 'development') {
    currentUrl = '/' + prop + '_' + type + '/'
  } else {
    currentUrl = dict[prop][type]
    if (!currentUrl) {
      currentUrl = dict[prop].default
    }
  }
  return currentUrl
}

