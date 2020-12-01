const port = 8002

module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: port,
    https: false,
    hotOnly: false,
    // http 代理配置
    proxy: {
      '/api': {
        target: 'process.env.Vue_APP_URL',
        changeOrigin: true
      }
    },
    before: (app) => { }
  },
  // 第三方插件配置
  pluginOptions: {

  }
}
