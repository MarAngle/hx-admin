const urlDict = {
  gateway: {
    default: 'https://wxz-forage-gateway-test.wuzheng.com.cn/',
    dev: 'https://wxz-forage-gateway-test.wuzheng.com.cn/',
    test: 'https://wxz-forage-gateway-test.wuzheng.com.cn/',
    prod: 'https://wxz-forage-gateway.wuzheng.com.cn/'
  }
}

const proxy = {
  run: false,
  urlDict: urlDict,
  data: {}
}

// proxy.run = true

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
  urlDict: urlDict,
  buildProp: buildProp
}
