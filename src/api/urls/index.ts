import generatorUrls from "./generatorUrls";
import platformGeneratorUrls from "../platform/generatorUrls";

/**
 * 全局URL配置说明
 */
const urls = {
  /**
   * websocket服务
   */
  websocket: {
    message: "http://139.224.255.200:3026/messasing-hub" // 消息通知服务
  },
  /**
   * 平台管理
   */
  platform: {
    config: "/api/platform/platform-configuration/config/{moduleCode}",
    system_config:
      "/api/platform/platform-configuration/config/system/{moduleCode}",
    application_config: "/api/abp/application-configuration",
    currentuser: "/api/platform/appUser/currentUser",
    getallusers: "/api/platform/appUser/all", // 所有用户列表
    getallorganizes: "/api/platform/organize/all", // 所有机构列表
    getownsorgainizes: "/api/platform/organize/all/my", // 所有用户所拥有机构列表
    getalldictionarys: "/api/platform/dictionary/all/{moduleCode}", // 所有字典列表
    getallareas: "/api/platform/area/GetAllList", // 所有地区列表
    getallsites: "/api/platform/areaSiteInfo/all" // 所有厂站列表
  },
  /**
   * 文件相关
   */
  file: {
    downloadfile: "/api/file-manager/file-info/downloadFile/{id}", // 文件下载或图片预览
    uploadfile: "/api/file-manager/file-info/uploadFile" //上传文件
  },
  /**
   * 平台字典项管理配置
   */
  platform_dictionary: {
    list: "/api/platform/dictionary/items/{moduleCode}/{itemCode}",
    create: "/api/platform/dictionary/itemDetail",
    update: "/api/platform/dictionary/itemDetail/{id}",
    delete: "/api/platform/dictionary/itemDetail/{id}"
  },
  /**
   * 查询方案管理配置
   */
  query_scheme: {
    get: "/api/platform/searchInfomation/searchInfo/{moduleCode}",
    save: "/api/platform/searchInfomation",
    delete: "/api/platform/searchInfomation/{id}"
  },
  ...generatorUrls,
  ...platformGeneratorUrls
};

export default urls;
