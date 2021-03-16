import "@/types";

import api from "@/api";
import ui from "./ui";
import auth from "./auth/index";
import navtabs from "./navtabs";
import { AppModule, UserModule } from "@/store";

import enumModule, { enums } from "./enums/index";
import { getAreaName, getUserName, getOrganizeName } from "@cr/utils";
import {
  dictionaryConstants,
  dictionary,
  dictionaryName,
  dictionaryOptions,
} from "./dictionary/index";
import { commonConstants } from "./consts/index";
import { createSelectOptions } from "./common";
import vxePlugins from "./vxe-table";
import {
  initAreas,
  initSites,
  initDictionarys,
  initOrganizes,
  initAllUsers,
} from "./configuration";
const infiniteScroll = require("vue-infinite-scroll");

/**
 * 导入图标资源
 */
require("@cr/icons");

/**
 * 注册、供@cr库使用
 */
require("./register");

/**
 * VUE插件安装入口
 */
export default {
  /**
   *
   * @param Vue
   * @param options
   */
  install(Vue: any, options: any) {

    import("@cr/icons/iconfont");

    AppModule.loadLayout();
    UserModule.loadToken();

    Vue.use(infiniteScroll);

    Vue.use(vxePlugins);

    Vue.use(ui);
    Vue.use(auth);
    Vue.use(navtabs);
    Vue.prototype.$api = api;
    Vue.prototype.$consts = commonConstants;
    Vue.prototype.$dictconsts = dictionaryConstants;
    Vue.prototype.$dictionary = dictionary;
    Vue.prototype.$dictionaryName = dictionaryName;
    Vue.prototype.$dictionaryOptions = dictionaryOptions;
    Vue.prototype.$enums = enums;
    Vue.prototype.$enumName = enumModule.enumName;
    Vue.prototype.$enumOptions = enumModule.enumOptions;
    Vue.prototype.$enumValuesForFlags = enumModule.enumValuesForFlags;
    Vue.prototype.$areaName = getAreaName;
    Vue.prototype.$userName = getUserName;
    Vue.prototype.$organizeName = getOrganizeName;
    Vue.prototype.$createSelectOptions = createSelectOptions;
    Vue.prototype.$initAreas = initAreas;
    Vue.prototype.$initSites = initSites;
    Vue.prototype.$initDictionarys = initDictionarys;
    Vue.prototype.$initOrganizes = initOrganizes;
    Vue.prototype.$initAllUsers = initAllUsers;
  },
};
