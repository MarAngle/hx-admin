import _func from "../func"
import { run, buildProp, urlDict } from "../proxy"

export const getCurrentUrl = function(type) {
  let realEnv = _func.getEnv('real')
  let prop = _func.getEnvMode('data') || 'default'
  let currentUrl
  if (run && realEnv == 'development') {
    currentUrl = buildProp(type, prop) + '/'
  } else {
    currentUrl = urlDict[type][prop]
    if (!currentUrl) {
      currentUrl = urlDict[type].default
    }
  }
  return currentUrl
}

