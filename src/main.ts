
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import plugins from "./plugins";
import {api} from "@cr/utils";

import "@/styles/global.less";
require("ant-design-vue/lib/style.js");

Vue.config.productionTip = false;

/**
 * 注册插件
 */
Vue.use(plugins);

const vueApp = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

/**
 * 注册HTTP请求拦截器
 */
api.interceptors(store, vueApp);
