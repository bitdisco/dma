/*
 * @Description: 
 * @Autor: 胡涛
 * @Date: 2021-02-20 11:43:06
 * @LastEditors: 胡涛
 * @LastEditTime: 2021-03-16 09:35:45
 */

const config = require("./config.js");
const { swaggerUrls, enumUrl, dictionaryUrl, generateConfig } = config;
const { apiGenertor, vueGenertor, enumGenertor, dictionaryGenertor, startServer } = require("@cr/tools");


/**
 * 生成API
 */
const createApi = function () {
    for (var systemName in swaggerUrls) {
        let swaggerUrl = swaggerUrls[systemName];
        let excludes = generateConfig.api.excludes[systemName];
        if (generateConfig.api.generateAll) {
            apiGenertor(systemName, swaggerUrl, null, excludes);
        } else {
            let includes = generateConfig.api.includes[systemName];
            if (!includes || includes.length === 0) {
                console.log(`配置错误：当参数generateAll=false,必须配置includes.${systemName}参数`)
                return;
            }
            apiGenertor(systemName, swaggerUrl, includes, excludes);
        }
    }
}

/**
 * 生成VUE页面
 */
const createVue = function () {
    for (var systemName in swaggerUrls) {
        let swaggerUrl = swaggerUrls[systemName];
        if (generateConfig.vue.generateAll) {
            vueGenertor(systemName, swaggerUrl);
        } else {
            let includes = generateConfig.vue.includes[systemName];
            if (!includes || includes.length === 0) {
                console.log(`配置错误：当参数generateConfig.api.generateAll=false,必须配置generateConfig.api.includes.${systemName}参数`)
                return;
            }
            let excludes = generateConfig.api.excludes[systemName];
            vueGenertor(systemName, swaggerUrl, includes, excludes);
        }
    }
}

/**
 * 生成枚举
 */
const createEnum = function () {
    enumGenertor(enumUrl);
}

/**
 * 生成字典常量
 */
const createDictionary = function () {
    dictionaryGenertor(dictionaryUrl.url, dictionaryUrl.moduleName)
}

/**
 * 启动UI服务
 */
const startUiServer = function () {
    startServer(config, 3000);
}

const checkArgument = function (arguments, action) {
    return (arguments.find(x => x === '-' + action)) ? true : false;
}

/**
 * 生成器入口
 */
const genertorCode = function () {
    var arguments = process.argv.splice(2);

    if (checkArgument(arguments, "api")) {
        createApi();
    }
    if (checkArgument(arguments, "vue")) {
        createVue();
    }
    if (checkArgument(arguments, "enum")) {
        createEnum();
    }
    if (checkArgument(arguments, "dict")) {
        createDictionary();
    }
    if (checkArgument(arguments, "serve") ||
        checkArgument(arguments, "ui")) {
        startUiServer();
    }
}

genertorCode();