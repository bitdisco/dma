import Vue from "vue";
import { AppModule } from "@/store";

export default {
  /**
   *
   * @param Vue
   * @param options
   */
  install(Vue: any, options: any): void {
    /**
     * 打开选项卡
     */
    Vue.prototype.$openTabItem = function(url: string, title: string) {
      if (-1 === AppModule.currentNavTabs.findIndex((x) => x.url === url)) {
        AppModule.addNavTabItem({ url, title });
      }
      this.$router.push({ path: url });
    };

    /**
     * 关闭所有选项卡
     */
    Vue.prototype.$closeAllTabs = function() {
      AppModule.clearNavTabItem();
      this.$router.push({ path: "" });
    };
  },
};
