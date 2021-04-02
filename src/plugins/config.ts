/*
 * @Description: 
 * @Autor: 胡涛
 * @Date: 2021-01-19 20:10:32
 * @LastEditors: 胡涛
 * @LastEditTime: 2021-03-10 16:21:58
 */

import api from "axios";
import configApi from "@/api/platform/config";
import { AppModule } from "@/store";
import {
  isProduction,
  devBaseConfigUrl,
  isDotnet
} from "@/environment/process";
import { defaultBaseConfig } from "@/config";

const baseConfigStorageKey = "CrAntAppBaseConfig";

/**
 * 读取配置URL
 */
const getConfigUrl = function() {
  if (isProduction) {
    const html = document.getElementsByTagName("HTML")[0];
    return html.getAttribute("data-promise-base-config-url") || "";
  } else {
    return devBaseConfigUrl;
  }
};

/**
 * 读取基本配置
 */
export const getBaseConfig = function() {
  const json = sessionStorage.getItem(baseConfigStorageKey);
  if (json && json !== "") {
    return new Promise(resovle => {
      resovle(JSON.parse(json || "{}"));
    });
  } else {
    const url = getConfigUrl();
    return api
      .get(url, { timeout: 1000 })
      .then(res => {
        sessionStorage.setItem(baseConfigStorageKey, JSON.stringify(res.data));
        return res.data;
      })
      .catch(err => {
        return new Promise(resovle => {
          resovle(defaultBaseConfig);
        });
      });
  }
};

/**
 * 根据网关地址读取API对应的baseUrls配置
 */
export const requestBaseUrls = function(gateway: string) {
  let devPath = isDotnet ? "/serverApi.dotnet" : "/serverApi.dev";
  let path = isProduction ? "/serverApi" : devPath;
  const url = gateway + path;
   console.log("baseUrl", url);
  return api.get(url);
};

/**
 * 请求系统基础配置
 */
export const requestSystemConfig = function() {
  configApi.getSystemConfig().then(res => {
    const appConfig = AppModule.appConfig;
    const layoutConfig = AppModule.layoutConfig;

    // APP配置
    appConfig.layoutName = res.layoutName;
    appConfig.areaCode = res.areaCode;
    appConfig.areaName = res.areaName;
    appConfig.sysLogo = res.sysLogo;
    appConfig.sysName = res.sysName;
    appConfig.sysSmallLogo = res.sysSmallLogo;
    appConfig.hideLogoText =
      res.hideLogoText === "true" || res.hideLogoText === true;
    if (res.copyRight) {
      appConfig.copyRight = res.copyRight;
      appConfig.copyRightLink = res.copyRightLink;
    }
    AppModule.updateAppConfig(appConfig);
    // console.log("更新APP配置--> appConfig=" + appConfig);

    if (localStorage.getItem("layoutConfig") === null) {
      layoutConfig.layout = res.layout;
      layoutConfig.theme = res.theme;
      layoutConfig.bannerStyle = res.bannerStyle;
      layoutConfig.bannerImageUrl = res.bannerImageUrl;
      layoutConfig.primaryColor = res.primaryColor;
      layoutConfig.logoBgColor = res.logoBgColor;
      layoutConfig.menuHighlightColor = res.menuHighlightColor;
      layoutConfig.animate = res.animate === "true" || res.animate === true;
      layoutConfig.multiTab = res.multiTab === "true" || res.multiTab === true;
      AppModule.updateLayout(layoutConfig);
      // console.log("更新layoutConfig--> layoutConfig=" + layoutConfig);
    }
  });
};
