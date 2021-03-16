import { api } from "@cr/utils";
import urls from "./urls/index";

/**
 * 配置urls全局路由参数
 */
api.configUrls(urls);

/**
 * 配置全局网络请求参数
 */
api.config({
  baseURL: "",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  data: {},
  method: "GET",
  responseType: "json",
});

export default api;
