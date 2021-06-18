/*
 * @Description: 
 * @Autor: 胡涛
 * @Date: 2021-02-20 11:43:06
 * @LastEditors: 朱海良
 * @LastEditTime: 2021-06-09 16:36:44
 */
/**
 * swagger文档接口地址
 */
const swaggerUrls = {
    dma: "http://36.133.33.128:4003/swagger/v1/swagger.json",
};

/**
 * 包含要生成的控制器名，为空则生成全部
 */
const generateConfig = {
    /**
     * 要生成的API模块
     */
    api: {
        /**
         * 要排除生成的模块名配置集合（后端控制器名称）
         * 键值对格式，键名同swaggerUrls配置的键名称一致及
         */
        excludes: ['Enum', 'AbpApiDefinition', 'Stat', 'AbpApplicationConfiguration','ApiResource','AbpTenant','AuditLogging','DictionaryItem','DictionaryItemDetail','PermissionDefine','Profile','IdentityResource','ClaimType'],
        /**
         * 指定生成控制器的集合（后端控制器名称）
         * 键值对格式，键名同swaggerUrls配置的键名称一致及
         */
        includes: []
    },
    /**
     * 要生成的VUE模块
     */
    vue: {
        /**
         * 要排除生成的模块名配置集合（后端控制器名称）
         * 键值对格式，键名同swaggerUrls配置的键名称一致及
         */
         excludes: ['Enum', 'AbpApiDefinition', 'Stat', 'AbpApplicationConfiguration','ApiResource','AbpTenant','AuditLogging','DictionaryItem','DictionaryItemDetail','PermissionDefine','Profile','IdentityResource','ClaimType'],
         /**
          * 指定生成控制器的集合（后端控制器名称）
          * 键值对格式，键名同swaggerUrls配置的键名称一致及
          */
         includes: []
    }
}

/**
 * 枚举接口地址
 */
const enumUrl = "http://36.133.33.128:4003/api/utils/enum";


/**
 * 字典接口地址
 */
const dictionaryUrl = {
    /**
     * 接口地址
     */
    url: "http://36.133.33.128:4000/api/dictionary/dictionaryItems",
    /**
     * 要生成的模块名
     */
    moduleName: 'Module.DMA'
};

module.exports = {
    swaggerUrls,
    enumUrl,
    dictionaryUrl,
    generateConfig
};