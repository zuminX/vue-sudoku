const webpack = require('webpack')

let proxyObj = {};

proxyObj['/'] = {
  ws: false,
  target: 'http://localhost:8081',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}

module.exports = {
  // 打包时不生成map文件
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  },
}
