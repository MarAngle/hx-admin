const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  configureWebpack: config => {
    config.plugins.push(
      new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'zh-cn']
      })
    )
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@assets', resolve('src/assets'))
      .set('@config', resolve('src/config'))
      .set('@main', resolve('src/main'))
      .set('@style', resolve('src/style'))
      .set('@page', resolve('src/page'))
    // 此处实现正常的非对应文件夹下的svg按照原有loader加载也就是图片进行加载
    config.module.rule('svg').exclude.add(resolve('src/config/icon/data')).end();
    // 此处设置对应文件夹下的svg按照特殊规则进行加载
    config.module.rule('icons').test(/\.svg$/).include.add(resolve('src/config/icon/data')).end().use('svg-sprite-loader').loader('svg-sprite-loader').options({
      symbolId: 'icon-[name]'
    }).end();
  }
})
