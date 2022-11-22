const urlDict = {
  gateway: {
    default: 'https://gateway-dev.wuzheng.com.cn/',
    dev: 'https://gateway-dev.wuzheng.com.cn/',
    test: 'https://gateway-test.wuzheng.com.cn/',
    prod: 'https://gateway.wuzheng.com.cn/'
  }
}

const proxy = {
  run: true,
  urlDict: urlDict,
  data: {}
}

const buildProp = function(type, prop) {
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

module.exports = {
  run: proxy.run,
  data: proxy.data,
  buildProp: buildProp
}
