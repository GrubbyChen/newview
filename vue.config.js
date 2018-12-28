module.exports = {
  devServer: {
    port: process.env.VUE_APP_PORT,
    proxy: {
      [process.env.VUE_APP_PROXY_PREFIX]: {
        target: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SERVER_URI_PRO : process.env.VUE_APP_SERVER_URI_DEV,
        changeOrigin: true
      }
    }
  }
}
