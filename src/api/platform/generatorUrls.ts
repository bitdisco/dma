/**
 * 全局URL配置说明 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-1-18 16:20:55
 * 接口生成地址：http://139.224.255.200:4000/swagger/v1/swagger.json
 */
export default {
  /**
   * 新闻公告
   */
  news: {
    create: "/api/platform/news",
    getPageList: "/api/platform/news",
    delete: "/api/platform/news/{id}",
    get: "/api/platform/news/{id}",
    update: "/api/platform/news/{id}",
    topN: "/api/platform/news/topN",
    topNList: "/api/platform/news/topN/{moduleCode}",
    getStat: "/api/platform/news/getStat",
    sendsms: "/api/platform/news/sendsms",
  },
  /**
   * 系统角色
   */
  role: {
    platformAll: "/api/platform/roles/all",
    platformRoles: "/api/platform/roles",
    platformRolesList: "/api/platform/roles/{id}",
    identityAll: "/api/identity/roles/all",
    identityRoles: "/api/identity/roles",
    identityRolesList: "/api/identity/roles/{id}",
  },
  /**
   * 用户管理
   */
  appUser: {
    update: "/api/platform/appUser/{id}",
    get: "/api/platform/appUser/{id}",
    getPageList: "/api/platform/appUser",
    createAsync: "/api/platform/appUser/CreateAsync",
    deleteAsync: "/api/platform/appUser/DeleteAsync",
    deleteUser: "/api/identity/users/{id}",
    getAllUser: "/api/platform/appUser/GetAllUser",
    all: "/api/platform/appUser/all",
    getUserByIdList: "/api/platform/appUser/GetUserByIdList",
    getOrganizeUserTree: "/api/platform/appUser/GetOrganizeUserTree",
    getAllUserByRoleIdAsync: "/api/platform/appUser/GetAllUserByRoleIdAsync",
    getTotal: "/api/platform/appUser/getTotal",
    currentUser: "/api/platform/appUser/currentUser",
    resetPassword: "/api/platform/appUser/resetPassword",
    changePassword: "/api/platform/appUser/changePassword",
    getAllList: "/api/platform/appUser/GetAllList",
    lockUser: "/api/platform/appUser/LockUser/{userId}/{to}",
    unLockUser: "/api/platform/appUser/UnLockUser/{userId}",
  },
  /**
   * 统计信息
   */
  stat: {
    stats: "/api/platform/stats", // 获取统计数据，缓存1分钟
  },
  /**
   * 审计日志
   */
  quartz: {
    getPageList: "/api/platform/quartz",
    get: "/api/platform/quartz/{id}",
    add: "/api/platform/quartz",
    edit: "/api/platform/quartz/{id}",
    delete: "/api/platform/quartz/{id}",
    getdetail: "​/api​/platform​/quartz​/getDetail",
    getloglist: "/api/platform/quartz/getLogList",
    updatetaskstatus: "/api/platform/quartz/updateTaskStatus",
    update: "/api/platform/quartz/update",
    addjoblog: "/api/platform/quartz/addJobLog",
  },
};
