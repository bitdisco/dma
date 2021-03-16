/**
 * webpack-bundle-analyzer打包文件分析工具
 * 
 * 启动服务：
 * 生产环境查看：npm run build --report 或 正常build 即可启动查看器
 * 开发环境查看：webpack -p --progress 或启动正常devServer服务即可启动查看器!
 * 
 * 
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = new BundleAnalyzerPlugin({});