<template>
  <div :class="getAppLayout">
    <!-- 头部菜单栏 -->
    <sildebar
      :class="getSilderClassName"
      :fold="fold"
      v-if="layoutConfig.layout === 'leftmenu'"
      :theme="layoutConfig.theme"
      :layoutConfig="layoutConfig"
    >
      <template slot="menu">
        <nav-menu
          mode="inline"
          :collapsed="fold"
          :menus="menus"
          :theme="layoutConfig.theme"
          @changeTab="changeTab"
        />
      </template>
    </sildebar>
    <!-- 主题、主体部分 -->
    <div
      class="sunary-layout-inside"
      :class="
        layoutConfig.layout === 'leftmenu'
          ? 'sunary-layout-inside-fix-with-sider'
          : ''
      "
    >
      <layout-header
        :rightMenu="rightMenu"
        :userMenu="userMenu"
        :class="getHeaderClassName"
        :sider="siderVisble"
        @siderChanged="onSiderVisble"
        @handleClick="handleClick"
        :topmenu="topmenu"
        :layoutConfig="layoutConfig"
      >
        <nav-menu
          slot="left-menu"
          mode="horizontal"
          :menus="menus"
          v-if="topmenu"
          :theme="layoutConfig.theme"
          @changeTab="changeTab"
        />
      </layout-header>
      <nav-tabs
        v-if="layoutConfig.multiTab"
        :tabArr="tabs"
        :class="fold ? 'nav-bar-fold' : ''"
        @changeTab="changeTab"
        ref="tabs"
        @refresh="onRefresh"
      />
      <div :class="getWrapperClassName">
        <div class="sunary-layout-content-wrapper" v-if="!requireRefresh">
          <keep-alive :max="15">
            <transition name="fade" v-if="layoutConfig.animate">
              <router-view v-if="keepAlive" />
            </transition>
            <router-view v-else-if="keepAlive" />
          </keep-alive>
          <transition name="fade" v-if="layoutConfig.animate && !keepAlive">
            <router-view />
          </transition>
          <router-view v-else-if="!keepAlive" />
        </div>
        <layout-footer />
      </div>
    </div>
    <!-- 操作交互部分 -->
    <div class="layout-mutual">
      <UserCenter
        v-bind="userMenuItem"
        :userId="userId"
        :visibleData="userCenterModal"
        @closeUserCenter="closeUserCenter"
      />
      <user-password
        v-bind="userMenuItem"
        :userId="userId"
        :visibleData="userPasswordModal"
        @closeUserPassword="closeUserPassword"
      />
      <cr-theme-drawer v-model="themeSelectVisible" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import {
  LayoutHeader,
  Sildebar,
  LayoutFooter,
  NavMenu,
  NavTabs,
} from "@cr/components/layout";
import { AppModule } from "@/store";
import UserCenter from "../components/UserCenter.vue";
import UserPassword from "../components/UserPassword.vue";
import CrThemeDrawer from "../components/ThemeDrawer.vue";

const themeColor = require("@cr/utils/themes/color.js").default;
import { getAppMenus } from "@/config/menu";
import { IRightMenuDefine, IUserMenuDefine, IMenuDataItem } from "@cr/types";
import { rightMenus, userMenus } from "@/config/global";
import { getToken, createMenuTree } from "@cr/utils";
import { isLoadLocalMenu } from "@/environment/process";
@Component<LayoutPage>({
  name: "LayoutPage",
  components: {
    // 主体组件
    LayoutHeader,
    LayoutFooter,
    Sildebar,
    NavMenu,
    NavTabs,
    // 业务交互组件
    UserPassword,
    UserCenter,
    CrThemeDrawer,
  },
})
export default class LayoutPage extends Vue {

  private get keepAlive() {
    const keep = this.layoutConfig.multiTab && (this.$route.meta || {}).keepAlive;
    return keep;
  }

  private get tabs() {
    return AppModule.currentNavTabs;
  }

  /**
   * 页面布局配置
   */
  private get layoutConfig() {
    return AppModule.layoutConfig;
  }

  /**
   * 侧边栏样式
   */
  private get getSilderClassName() {
    if (
      this.layoutConfig.bannerStyle === "white" &&
      this.layoutConfig.theme == "light"
    ) {
      return "sunary-layout-sider-white";
    }
    return "";
  }

  /**
   *  头部样式
   */
  private get getHeaderClassName() {
    if (this.layoutConfig.bannerStyle === "white") {
      return "sunary-layout-header-white";
    } else if (this.layoutConfig.bannerStyle === "dark") {
      return "sunary-layout-header-dark";
    } else {
      return "";
    }
  }

  /**
   * 内容区域容器样式
   */
  private get getWrapperClassName() {
    return this.layoutConfig.multiTab
      ? "sunary-layout-content sunary-layout-content-fix-with-tabs"
      : "sunary-layout-content sunary-layout-content-fix-with-header";
  }

  /**
   * 是否折叠
   */
  private get fold() {
    return !this.siderVisble;
  }

  /**
   * 是否上下布局
   */
  private get topmenu() {
    return this.layoutConfig.layout === "topmenu";
  }

  /**
   * 获取页面框架层级布局样式
   */
  private get getAppLayout() {
    return this.topmenu
      ? "sunary-layout sunary-layout-topmenu"
      : "sunary-layout sunary-layout-leftmenu";
  }
  /**
   * 侧边栏显示状态
   */
  private siderVisble: boolean = true;
  private menus: IMenuDataItem[] = [];
  private rightMenu: IRightMenuDefine[] = rightMenus;
  private userMenu: IUserMenuDefine[] = userMenus;
  private userId: string = "";

  private userMenuItem: Object = {};
  private userCenterModal: boolean = false;
  private userPasswordModal: boolean = false;
  private requireRefresh: boolean = false;
  private themeSelectVisible: boolean = false;

  public async created() {
    if (isLoadLocalMenu) {
      this.menus = await getAppMenus();
    }
    this.changeThemeColor(AppModule.layoutConfig.primaryColor || "#F5222D");
    await this.init();
    if (!isLoadLocalMenu) {
      this.menus = createMenuTree();
    }
    this.$forceUpdate();
  }

  private onRefresh() {
    this.requireRefresh = true;
    setInterval(() => {
      this.requireRefresh = false;
    }, 100);
    setTimeout(() => {
      const navTabs: any = this.$refs.tabs;
      navTabs.successRefresh();
    }, 1000);
  }

  /**
   * 点击用户下拉菜单type为'click'的回调
   */
  private handleClick(data: any, userInfo: any) {
    this.userMenuItem = data;
    this.userId = userInfo.id;
    if (data.handle === "UserCenter") {
      this.userCenterModal = true;
    }
    if (data.handle === "UserPassword") {
      this.userPasswordModal = true;
    }
    if (data.handle === "ChangeTheme") {
      this.themeSelectVisible = true;
    }
  }

  /**
   * 关闭个人中心弹出框
   * */
  private closeUserCenter(val: boolean) {
    this.userCenterModal = val;
  }

  /**
   * 关闭修改密码弹出框
   * */
  private closeUserPassword(val: boolean) {
    this.userPasswordModal = val;
  }

  /**
   * 初始化应用及权限相关配置
   */
  private async init() {
    const token = await getToken();
    if (token && token !== "") {
      await this.$initAreas();
      await this.$initSites();
      await this.$initDictionarys();
      await this.$initOrganizes();
      await this.$initAllUsers();
    }
  }

  /**
   * 操作tab的状态管理数据
   * */
  private changeTab(type: string, data?: any) {
    if (type === "add") {
      AppModule.addNavTabItem(data);
    } else if (type === "remove") {
      AppModule.removeNavTabItem(data);
    } else if (type === "clear") {
      AppModule.clearNavTabItem();
    }
  }

  /**
   * 修改主题颜色
   */
  private changeThemeColor(color: string) {
    themeColor.changeColor(color).then((res: any) => {});
  }

  /**
   * 侧边栏显示状态
   */
  private onSiderVisble(visible: boolean) {
    this.siderVisble = visible;
  }
}
</script>
<style lang="less">
@keyframes fadeInLeft {
  from {
    transform: translate3d(-40px, 0, 0);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.fade-leave-to {
  opacity: 0;
  transition: opacity 0.3s;
}

.fade-enter {
  opacity: 0;
  transform: translate3d(-40px, 0, 0);
}

.fade-enter-to {
  opacity: 0;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: fadeInLeft;
}

.layout-mutual {
  position: fixed;
  top: 0;
  background: #000c17;
}
</style>
