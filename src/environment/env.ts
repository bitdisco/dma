/** 开发代理地址 */
const proxy = {
  baseUrl: "http://139.224.255.200:3011", // 数据接口
};

/** 开发环境配置信息 */
const envConfig = {
  port: 8088,
  proxy,
  appName: "智慧水务平台",
  reportAnalyzer: false, // 是否启用打包分析标识
};

module.exports = envConfig;
