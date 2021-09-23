const path = require('path')

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
        .set('@', path.join(__dirname, './src'))
    },

    devServer: {
        proxy: 'https://api-hmugo-web.itheima.net/api/public/v1'
    }
}