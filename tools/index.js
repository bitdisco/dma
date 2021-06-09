/*
 * @Description: 
 * @Autor: 胡涛
 * @Date: 2021-02-20 11:43:06
 * @LastEditors: 朱海良
 * @LastEditTime: 2021-06-09 14:38:32
 */

const config = require("./config.js");
const { swaggerUrls, enumUrl, dictionaryUrl, generateConfig } = config;
const { typesGenertor, apiGenertor, vueGenertor, enumGenertor, dictionaryGenertor, startServer } = require("@cr/tools");


/**
 * 生成API
 */
const creatTypes = function () {
    for (var systemName in swaggerUrls) {
        let swaggerUrl = swaggerUrls[systemName];
        typesGenertor(systemName, swaggerUrl);
    }
}

/**
 * 生成API
 */
const createApi = function () {
    for (var systemName in swaggerUrls) {
        let swaggerUrl = swaggerUrls[systemName];
        let excludes = generateConfig.api.excludes;
        let includes = generateConfig.api.includes;
        if (includes && includes.length > 0) {
            console.log("生成指定的接口");
            apiGenertor(systemName, swaggerUrl, includes, excludes);
        }
        else {
            //生成所有带控制器注解的方法(排除项除外)
            console.log("生成所有带控制器注解的方法(排除项除外)");
            apiGenertor(systemName, swaggerUrl, null, excludes, true);
        }
    }
}

/**
 * 生成VUE页面
 */
const createVue = function () {
    for (var systemName in swaggerUrls) {
        let swaggerUrl = swaggerUrls[systemName];
        let excludes = generateConfig.vue.excludes;
        let includes = generateConfig.vue.includes;
        if (includes && includes.length > 0) {
            console.log("生成指定的页面");
            vueGenertor(systemName, swaggerUrl, includes, excludes);
        }
        else {
            //生成所有带控制器注解的方法(排除项除外)
            console.log("生成所有带控制器注解的方法(排除项除外)");
            vueGenertor(systemName, swaggerUrl, null, excludes, true);
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

    if (checkArgument(arguments, "types")) {
        creatTypes();
    } if (checkArgument(arguments, "api")) {
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