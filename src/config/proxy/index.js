import { urlDict } from "../url"

export const proxy = {
  run: true,
  data: {}
}

export const buildProp = function(type, prop) {
  return `/${type}_${prop}`
}

if (proxy.run) {
  for (const type in urlDict) {
    for (const prop in urlDict[type]) {
      let currentProp = buildProp(type, prop)
      proxy.data[currentProp] = {
        target: urlDict,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^' + currentProp]: ''
        }
      }
    }
  }
}
