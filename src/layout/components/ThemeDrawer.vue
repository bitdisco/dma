<template>
  <a-drawer :visible="value" @close="onClose" title="页面主题设置">
    <a-descriptions :column="1">
      <a-form>
        <a-form-item label="布局方式">
          <div class="frame-layout-modes">
            <div
              class="frame-layout-mode frame-layout-mode-leftmenu"
              :class="layoutConfig.layout === 'leftmenu' ? 'active' : ''"
              @click="onLayoutModeChanged('leftmenu')"
            >
              <div class="sider"></div>
              <div class="wrapper">
                <div class="banner"></div>
              </div>
            </div>
            <div
              class="frame-layout-mode frame-layout-mode-topmenu"
              :class="layoutConfig.layout === 'topmenu' ? 'active' : ''"
              @click="onLayoutModeChanged('topmenu')"
            >
              <div class="banner"></div>
              <div class="wrapper"></div>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="颜色主题">
          <cr-theme-select
            v-model="layoutConfig.name"
            :themeColors="themeColors"
            @change="changeTheme"
          />
        </a-form-item>
        <a-form-item label="多页签模式">
          <a-checkbox v-model="layoutConfig.multiTab" @change="onLayoutChanged"
            >启用/停用</a-checkbox
          >
        </a-form-item>
        <a-form-item label="切换动画">
          <a-checkbox v-model="layoutConfig.animate" @change="onLayoutChanged"
            >启用/停用</a-checkbox
          >
        </a-form-item>
      </a-form>
    </a-descriptions>
  </a-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { AppModule } from "@/store";
const themeHelper = require("@cr/utils/themes/color.js").default;
import { IThemeConfig, themeColors } from "@/config/theme";
import CrThemeSelect from "@/components/CR/ThemeSelect/Index.vue";
import { IAppLayoutConfig, LayoutMode } from "@cr/types";

@Component({
  name: "",
  components: {
    CrThemeSelect,
  },
})
export default class CrThemeDrawer extends Vue {

  /**
   * 页面布局相关配置
   */
  private get layoutConfig(): IAppLayoutConfig {
    return AppModule.layoutConfig;
  }
  /**
   * 是否显示
   */
  @Prop({ default: false }) public value!: boolean;

  private themeColors: IThemeConfig[] = themeColors;

  /**
   * 修改主题逻辑
   */
  private onThemeChange(item: IThemeConfig) {}

  /**
   * 修改主题配置
   */
  private changeTheme(item: IThemeConfig) {
    themeHelper.changeColor(item.primaryColor).then((res: any) => {});
    this.layoutConfig.name = item.name;
    this.layoutConfig.theme = item.theme;
    this.layoutConfig.primaryColor = item.primaryColor;
    this.layoutConfig.bannerStyle = item.bannerStyle;
    this.layoutConfig.logoBgColor = item.logoBgColor || "";
    this.layoutConfig.menuHighlightColor = item.menuHighlightColor || "";
    this.layoutConfig.bannerImageUrl = item.bannerImageUrl || "";

    AppModule.updateLayout(this.layoutConfig);
  }

  /**
   * 修改布局
   */
  private onLayoutChanged() {
    AppModule.updateLayout(this.layoutConfig);
  }
  /**
   * 修改布局
   */
  private onLayoutModeChanged(layout: LayoutMode) {
    this.layoutConfig.layout = layout;
    AppModule.updateLayout(this.layoutConfig);
  }

  private onClose() {
    this.$emit("input", false);
  }
}
</script>
<style lang="less">
@import "../../../node_modules/ant-design-vue/es/style/themes/default.less";

.frame-layout-modes {
  display: flex;
}
.frame-layout-mode {
  width: 84px;
  height: 64px;
  overflow: hidden;
  border-radius: 7px;
  border: 2px solid #f6f6f6;
  display: flex;
  margin: 0 5px;

  &.active {
    border-color: @primary-color;
  }

  .banner {
    height: 18px;
    background: @primary-color;
  }

  .sider {
    width: 24px;
    background: @primary-color;
  }

  .wrapper {
    background: #eeeeee;
    flex: 1;
  }

  &-topmenu {
    flex-direction: column;
  }
}
</style>
