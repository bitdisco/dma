/*
 * @Description: 
 * @Autor: 朱海良
 * @Date: 2021-03-16 14:20:47
 * @LastEditors: 朱海良
 * @LastEditTime: 2021-03-17 21:58:29
 */
/**
 * 获取当前运行环境变量
 */
const environment: String | undefined = process.env.NODE_ENV;

/**
 * 判断是否是开发环境：是：true/不是：false
 */
export const isProduction = environment === "production";

/**
 * 是否从本地加载菜单
 */
export const isLoadLocalMenu = false || !isProduction;

/**
 * 判断是否为后台开发人员开发
 */
export const isDotnet = environment === "dotnet";

/**
 * 开发时默认配置文件
 */
export const devBaseConfigUrl =
  "http://139.224.255.200:3011/config/DMA/config.dev.json";
