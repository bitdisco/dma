/*
 * @Description: 
 * @Autor: 胡涛
 * @Date: 2021-02-20 11:43:06
 * @LastEditors: 朱海良
 * @LastEditTime: 2021-06-01 14:43:51
 */
/**
 * swagger文档接口地址
 */
const swaggerUrls = {
    dma: "http://36.133.33.128:4003/swagger/v1/swagger.json"
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
         * 是否生成全部模块
         */
        generateAll: false,
        /**
         * 生成所有带控制器注解的模块
         */
        allAnnotation: true,
        /**
         * 要排除生成的模块名配置集合（后端控制器名称）
         * 键值对格式，键名同swaggerUrls配置的键名称一致及
         */
        excludes: {
            /**
          * 营业系统
          */
            charge: ['Enum', 'AbpApiDefinition', 'Stat', 'AbpApplicationConfiguration','AbpTenant','AuditLogging','DictionaryItem','DictionaryItemDetail'],
            /**
             * 平台管理
             */
            platform: ['Enum', 'AbpApiDefinition', 'Stat', 'AbpApplicationConfiguration'],
            /**
             * 消息服务
             */
            message: [],
            meterManagement:['Enum', 'AbpApiDefinition', 'Stat', 'AbpApplicationConfiguration','AbpTenant','AuditLogging','DictionaryItem','DictionaryItemDetail']
        },
        /**
         * 要包含生成的模块名配置集合（后端控制器名称）
         * 键值对格式，键名同swaggerUrls配置的键名称一致及
         */
        includes: {
            /**
             * 营业系统
             */
            charge: ['BadLoansReport','PayHisReport'],
            /**
             * 平台管理
             */
            platform: [],
            /**
             * 消息服务
             */
            message: [],

            meterManagement: ['Manufacturer']
        }
    },
    /**
     * 要生成的VUE模块
     */
    vue: {
        generateAll: false,
        allAnnotation: true,
        excludes: {
            charge: [],
            platform: [],
            message: []
        },
        includes: {
            charge: ['ArchiveInfo'],
            platform: [],
            message: []
        }
    }
}

/**
 * 枚举接口地址
 */
const enumUrl = "http://139.224.255.200:4002/api/utils/enum";


/**
 * 字典接口地址
 */
const dictionaryUrl = {
    /**
     * 接口地址
     */
    url: "http://139.224.255.200:4000/api/dictionary/dictionaryItems",
    /**
     * 要生成的模块名
     */
    moduleName: 'Module.Charge'
};

module.exports = {
    swaggerUrls,
    enumUrl,
    dictionaryUrl,
    generateConfig
};