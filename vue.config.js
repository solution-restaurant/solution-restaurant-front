const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://ec2-52-78-197-10.ap-northeast-2.compute.amazonaws.com:3000/',
      }
    }
  }
}
