/*
 * @Description: 
 * @Autor: 朱海良
 * @Date: 2021-03-16 14:20:47
 * @LastEditors: 朱海良
 * @LastEditTime: 2021-06-01 14:19:39
 */
import api from "@/api";
import { AppModule } from "@/store";
const serviceName = 'platform';
export default {
  /**
   * 获取平台配置
   * @param params
   */
  getConfiguration(moduleCode?: string) {
    moduleCode =
      moduleCode || AppModule.appConfig.moduleCode || "Module.Platform";
    return api.get(api.getAbsoluteUrl(serviceName,"platform/config", { moduleCode }));
  },
  /**
   * 获取系统配置
   * @param moduleCode
   */
  getSystemConfig(moduleCode?: string) {
    moduleCode =
      moduleCode || AppModule.appConfig.moduleCode || "Module.Platform";
    return api.get(api.getAbsoluteUrl(serviceName,"platform/system_config", { moduleCode }));
  },
  /**
   * 获取配置
   * @param params
   */
  applicationConfiguration: (params: any) =>
    api.get(api.getAbsoluteUrl(serviceName,"platform/application_config"), params),

  /**
   * 获取所有用户列表
   * @param params
   */
  getAllUsers: (params: any) =>
    api.get(api.getAbsoluteUrl(serviceName,"platform/getallusers"), params),

  /**
   * 获取全部组织机构列表
   */
  getAllOrganizes: () => api.get(api.getAbsoluteUrl(serviceName,"platform/getallorganizes"), {}),

  /**
   * 获取所有用户列表
   */
  getOwnsOrginzes: () => api.get(api.getAbsoluteUrl(serviceName,"platform/getownsorgainizes"), {}),

  /**
   * 获取所有用户列表
   */
  getAllDctionarys: (moduleCode?: string) => {
    moduleCode = moduleCode || "Module.Platform";
    return api.get(api.getAbsoluteUrl(serviceName,"platform/getalldictionarys", { moduleCode }));
  },

  /**
   * 获取所有地区列表
   */
  getAllAreaList: () => {
    return api.get(api.getAbsoluteUrl(serviceName,"platform/getallareas"));
  },
  /**
   * 获取所有生产厂站列表
   */
  getAllSiteList: () => {
    return api.get(api.getAbsoluteUrl(serviceName,"platform/getallsites"));
  },
};
