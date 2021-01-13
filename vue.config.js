const Webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

function resolve(dir) {
  // eslint-disable-next-line no-undef
  return path.join(__dirname, dir)
}

const production = process.env.NODE_ENV === 'production'

// 反向代理
const proxyObj = {}
proxyObj['/'] = {
  ws: false,
  target: 'http://localhost:8081',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}

// eslint-disable-next-line no-undef
module.exports = {
  // 打包时不生成map文件
  productionSourceMap: false,
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack: (config) => {
    config.plugins = [...config.plugins,
      // 设置Jquery
      new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      }),
      // 打包zip压缩
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.jpg$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
    // 打包优化，去除console.log
    config.optimization.minimizer.push(new UglifyJsPlugin({
      sourceMap: false,
      // 开启多线程提高打包速度
      parallel: true,
      uglifyOptions: {
        compress: {
          drop_console: true,
          drop_debugger: false,
          // 生产环境自动删除console
          pure_funcs: ['console.log']
        },
        warnings: false
      }
    }))
  },
  publicPath: production ? '/home/' : '/',
  // 测试时的端口和反向代理到服务器
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}
