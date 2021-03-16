<template>
  <div class="cr-themes-container">
    <a-radio-group :value="value" @change="onSelectedChange">
      <div
        class="theme-item"
        :class="item.name === value ? 'theme-item-active' : ''"
        v-for="(item, index) in themeColors"
        :key="index"
        @click="onThemeChange(item)"
      >
        <div class="preview">
          <div class="theme theme-light" v-if="item.theme == 'light'">
            <div
              class="banner"
              :style="{
                background:
                  item.bannerStyle === 'light' ? '#ffffff' : item.primaryColor
              }"
            ></div>
            <div class="wrapper">
              <div class="silder"></div>
              <div class="content"></div>
            </div>
          </div>
          <div class="theme theme-primary" v-else-if="item.theme == 'primary'">
            <div
              class="silder"
              :style="{ background: item.primaryColor }"
            ></div>
            <div class="wrapper">
              <div
                class="banner"
                :style="{
                  background:
                    item.bannerStyle === 'dark'
                      ? '#001529'
                      : item.bannerStyle === 'white'
                      ? '#ffffff'
                      : item.primaryColor
                }"
              ></div>
              <div class="content"></div>
            </div>
          </div>
          <div class="theme theme-dark" v-else>
            <div class="silder" :style="{ background: '#001529' }"></div>
            <div class="wrapper">
              <div
                class="banner"
                :style="{
                  background:
                    item.bannerStyle === 'dark'
                      ? '#001529'
                      : item.bannerStyle === 'white'
                      ? '#ffffff'
                      : item.primaryColor
                }"
              ></div>
              <div class="content"></div>
            </div>
          </div>
        </div>
        <span
          ><a-radio :value="item.name">{{ item.caption }}</a-radio></span
        >
      </div>
    </a-radio-group>
  </div>
</template>
<script lang="ts">
import { IThemeConfig } from "@/config/theme";
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({ name: "" })
export default class CrThemeSelect extends Vue {
  /**
   * 颜色主题
   */
  @Prop({
    default() {
      return [];
    },
  })
  public themeColors!: IThemeConfig[];

  /**
   * 选中主题名称
   */
  @Prop({ default: "" }) public value!: string;

  /**
   *  修改主题事件
   */
  private onThemeChange(item: IThemeConfig) {
    this.$emit("change", item);
  }

  private onSelectedChange(e: any) {
    const themeName = e.target.value;
    this.$emit("input", themeName);
  }
}
</script>
<style lang="less">
@import "~ant-design-vue/es/style/themes/default.less";

.cr-themes-container {
  .ant-radio-group {
    display: flex;
    flex-wrap: wrap;
  }

  .theme-item {
    padding: 5px;
    .preview {
      margin: 0 auto 3px;
      border: 2px solid #f3f3f3;
      border-radius: 7px;
      overflow: hidden;

      .theme {
        width: 80px;
        height: 60px;
        display: flex;

        .silder {
          width: 24px;
        }

        .banner {
          height: 16px;
        }

        .wrapper {
          flex: 1;
          background: #eeeeee;
          display: flex;
          flex-direction: column;
          .content {
            flex: 1;
          }
        }

        &-light {
          flex-direction: column;
          .silder {
            background: #ffffff;
          }
          .wrapper {
            flex-direction: row;
          }
        }
      }
    }

    &-active {
      .preview {
        border-color: @primary-color;
      }
    }
  }
}
</style>
