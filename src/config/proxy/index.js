const urlDict = {
  gateway: {
    default: 'https://tb.ihuanxi.cn',
    dev: 'https://tb.ihuanxi.cn',
    test: 'https://tb.ihuanxi.cn',
    prod: 'https://tb.ihuanxi.cn'
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
