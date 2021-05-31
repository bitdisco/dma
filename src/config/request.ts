import { IOidcDefine, IRequestDefine } from "@cr/types";
import api from "@/api";

/**
 * OIDC设置
 */
export const oidcSettings: IOidcDefine = {
  authority: "http://36.133.33.128:3010",
  clientId: "platform-vue",
  redirectUri: "http://localhost:8088/#/oidc-callback",
  silentRedirectUri: "http://localhost:8088/#/oidc-callback",
  postLogoutRedirectUri: "http://localhost:8088/#/oidc-logout",
  responseType: "code",
  scope:
    "address phone email openid profile role BackendAdminAppGateway PlatformService FileService",
  loginCallBack: () => {
    console.log(909090, "loginCallBack");
  },
  logoutCallBack: () => {
    console.log(8080808, "logoutCallBack");
  },
};

/**
 * CR库公共URL接口配置定义
 */
export const requestSettings = (): IRequestDefine => {
  return {
    baseUrl: api.getBaseUrl(),
    messageUrl: api.getBaseUrl("messageSignalR"),
    uploadFile: api.getAbsoluteUrl("file", "file/uploadfile"),
    downloadFile: api.getAbsoluteUrl("file", "file/downloadfile"),
    dictionary: {
      list: api.getAbsoluteUrl("platform", "platform_dictionary/list"),
      create: api.getAbsoluteUrl("platform", "platform_dictionary/create"),
      update: api.getAbsoluteUrl("platform", "platform_dictionary/update"),
      delete: api.getAbsoluteUrl("platform", "platform_dictionary/delete")
    },
    queryScheme: {
      get: api.getAbsoluteUrl("platform", "query_scheme/get"),
      save: api.getAbsoluteUrl("platform", "query_scheme/save"),
      delete: api.getAbsoluteUrl("platform", "query_scheme/delete")
    }
  };
};
