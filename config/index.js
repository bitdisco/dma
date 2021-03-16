const createThemeColorReplacerPlugin = require('./plugin.config');
const MonacoWebpackPlugin = require('./monaco.config');
const BundleAnalyzerPlugin = require('./analyzer.config');
const envConfig = require('../src/environment/env.ts')

/**
 *  配置插件
 * @param {*} configureWebpack 
 */
const configureWebpackPlugins = function (configureWebpack) {
    configureWebpack.plugins.push(createThemeColorReplacerPlugin())
    configureWebpack.plugins.push(MonacoWebpackPlugin);
    if (envConfig.reportAnalyzer) {
        configureWebpack.plugins.push(BundleAnalyzerPlugin);
    }
}

module.exports = configureWebpackPlugins;
