/*
 * @Description:
 * @Autor: 朱海良
 * @Date: 2021-03-16 14:20:47
 * @LastEditors: 朱海良
 * @LastEditTime: 2021-03-17 21:58:59
 */
/** 开发代理地址 */
const proxy = {
  baseUrl: "http://36.133.33.128:3011", // 数据接口
  //baseUrl: "http://localhost:44333/", // 本地开发数据接口
};

/** 开发环境配置信息 */
const envConfig = {
  port: 8093,
  proxy,
  appName: "DMA分区管理系统",
  reportAnalyzer: false, // 是否启用打包分析标识
};

module.exports = envConfig;
