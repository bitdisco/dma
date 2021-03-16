import { oidcRegister, requestRegister } from "@cr/utils";
import { requestSettings } from "../config/request";
import { getBaseConfig, requestBaseUrls, requestSystemConfig } from "./config";
import { AppModule } from "@/store";
import api from "@/api";
import { isProduction } from "@/environment/process";

/**
 * 请求基本配置信息并配置框架基础参数、注册配置信息到CR库
 */
export const registerConfig = async function() {
  try {
    // 基础配置
    const config: any = await getBaseConfig();

    // console.log("config", config);

    // URL接口调用配置
    const baseUrls: any = await requestBaseUrls(config.gateway);
    // console.log("baseUrls", baseUrls);

    // 更新框架基础配置
    const baseConfig = AppModule.baseConfig;
    baseConfig.gateway = config.gateway;
    baseConfig.envType = config.envType;
    baseConfig.oidc = { ...config.oidc };
    baseConfig.moduleCode = config.moduleCode;
    baseConfig.baseUrls = { ...baseUrls };
    AppModule.updateBaseConfig(baseConfig);
    console.log("更新APP - baseConfig配置--> baseUrls=", baseUrls);

    const loginCallBack = function() {};
    const logoutCallBack = function() {};

    // 更新APP配置
    const appConfig = AppModule.appConfig;
    appConfig.moduleCode = config.moduleCode;
    AppModule.updateAppConfig(appConfig);
    console.log(
      "更新APP - moduleCode配置--> moduleCode=" + appConfig.moduleCode
    );

    // 配置网关
    const baseUrl: string = isProduction ? config.gateway || "" : "";
    api.config({ baseURL: baseUrl });
    let requestUrls = requestSettings();
    requestUrls.messageUrl = baseUrls.messageSignalR;
    console.log("配置网关成功--> baseUrl=" + baseUrl);

    // 请求系统基础配置
    requestSystemConfig();

    const oidc = Object.assign({ loginCallBack, logoutCallBack }, config.oidc);
    /**
     * oidc==>单点登陆配置
     */
    oidcRegister(oidc);

    /**
     * request==>请求地址、接口配置
     */
    requestRegister(requestUrls);
  } catch (err) {}
};

registerConfig();
