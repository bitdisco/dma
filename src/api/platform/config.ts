import api from "@/api";
import { AppModule } from "@/store";
export default {
  /**
   * 获取平台配置
   * @param params
   */
  getConfiguration(moduleCode?: string) {
    moduleCode =
      moduleCode || AppModule.appConfig.moduleCode || "Module.Platform";
    return api.get(api.getUrl("platform/config", { moduleCode }));
  },
  /**
   * 获取系统配置
   * @param moduleCode
   *
   */
  getSystemConfig(moduleCode?: string) {
    moduleCode =
      moduleCode || AppModule.appConfig.moduleCode || "Module.Platform";
    return api.get(api.getUrl("platform/system_config", { moduleCode }));
  },
  /**
   * 获取配置
   * @param params
   */
  applicationConfiguration: (params: any) =>
    api.get(api.getUrl("platform/application_config"), params),

  /**
   * 获取所有用户列表
   * @param params
   */
  getAllUsers: (params: any) =>
    api.get(api.getUrl("platform/getallusers"), params),

  /**
   * 获取全部组织机构列表
   */
  getAllOrganizes: () => api.get(api.getUrl("platform/getallorganizes"), {}),

  /**
   * 获取所有用户列表
   */
  getOwnsOrginzes: () => api.get(api.getUrl("platform/getownsorgainizes"), {}),

  /**
   * 获取所有用户列表
   */
  getAllDctionarys: (moduleCode?: string) => {
    moduleCode = moduleCode || "Module.Platform";
    return api.get(api.getUrl("platform/getalldictionarys", { moduleCode }));
  },

  /**
   * 获取所有地区列表
   */
  getAllAreaList: () => {
    return api.get(api.getUrl("platform/getallareas"));
  },
  /**
   * 获取所有生产厂站列表
   */
  getAllSiteList: () => {
    return api.get(api.getUrl("platform/getallsites"));
  },
};
