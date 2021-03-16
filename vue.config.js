const consoleInfo = require('./console')
const envConfig = require('./src/environment/env.ts')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const Timestamp = new Date().getTime();
const configureWebpackPlugins = require("./config/index")

const vueConfig = {
  publicPath: "./",
  outputDir: "dist/platform",
  lintOnSave: false,
  productionSourceMap: false,
  filenameHashing: false,
  runtimeCompiler: true,
  pages: {
    index: {
      entry: 'src/main.ts',
      filename: 'index.html',
      template: "public/index.html",
      title: envConfig.appName
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 给js和css配置版本号
      config.output.filename('js/[name].' + Timestamp + '.js').end();
      config.output.chunkFilename('js/[name].' + Timestamp + '.js').end();
      config.plugin('extract-css').tap(args => [{
        filename: `css/[name].${Timestamp}.css`,
        chunkFilename: `css/[name].${Timestamp}.css`
      }])
    }
  },
  configureWebpack: {
    plugins: [],
    resolve: {
      alias: {},
    },
    externals: {
      "moment": "moment"
    },
  },
  devServer: {
    port: envConfig.port,
    host: '0.0.0.0',
    https: false,
    open: true,
    // 接口跨域处理
    proxy: {
      "/api": {
        target: envConfig.proxy.baseUrl,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/'
        // }
      }
    },
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
};

//配置webpack插件
configureWebpackPlugins(vueConfig.configureWebpack)

module.exports = vueConfig
