import { BannerStyleType, IAppLayoutConfig, SilderThemeMode } from "@cr/types";

const layoutConfig = {
  layout: "leftmenu",
  theme: "dark",
  multiTab: true,
};

const primaryColor: string = "";

/**
 * 颜色主题配置参数
 */
export interface IThemeConfig {
  name: string;
  caption: string;
  thumburl?: string;
  theme: SilderThemeMode; // 侧边栏风格 (白色、黑色、主颜色)
  bannerStyle?: BannerStyleType; // 版头风格（主色调、白色、主颜色）
  primaryColor: string; // 主颜色值
  logoBgColor?: string | null; // LOGO背景色值
  menuHighlightColor?: string | null; // 导航菜单高颜色
  bannerImageUrl?: string;
}

const themeColors: IThemeConfig[] = [
  {
    name: "theme_red",
    caption: "红色1",
    theme: "primary",
    bannerStyle: "primary",
    primaryColor: "#B80000",
    logoBgColor: "#D10505",
    menuHighlightColor: "#F69D3E",
    bannerImageUrl: "./img/banner_img.png",
  },
  {
    name: "theme_red_light",
    caption: "红色2",
    theme: "light",
    bannerStyle: "primary",
    primaryColor: "#B80000",
    logoBgColor: "",
    menuHighlightColor: "",
    bannerImageUrl: "./img/banner_img.png",
  },
  {
    name: "theme_red_light2",
    caption: "红色3",
    theme: "primary",
    bannerStyle: "white",
    primaryColor: "#B80000",
    logoBgColor: "#D10505",
    menuHighlightColor: "#F69D3E",
  },
  {
    name: "theme_blue",
    caption: "蓝色1",
    theme: "primary",
    bannerStyle: "primary",
    primaryColor: "#1991FF",
    logoBgColor: "#28a0ff",
    menuHighlightColor: "",
  },
  {
    name: "theme_blue_light",
    caption: "蓝色2",
    thumburl: "",
    theme: "light",
    bannerStyle: "primary",
    primaryColor: "#1991FF",
    logoBgColor: "#28a0ff",
    menuHighlightColor: "",
  },
  {
    name: "theme_blue_dark",
    caption: "蓝色3",
    thumburl: "",
    theme: "dark",
    bannerStyle: "primary",
    primaryColor: "#1991FF",
    logoBgColor: "#28a0ff",
    menuHighlightColor: "",
  },
  {
    name: "theme_blue_dark2",
    caption: "蓝色4",
    thumburl: "",
    theme: "dark",
    bannerStyle: "white",
    primaryColor: "#1991FF",
    logoBgColor: "#28a0ff",
    menuHighlightColor: "",
  },
  {
    name: "theme_blue_dark3",
    caption: "蓝黑1",
    thumburl: "",
    theme: "dark",
    bannerStyle: "dark",
    primaryColor: "#1991FF",
    logoBgColor: "#28a0ff",
    menuHighlightColor: "",
  },
  
  {
    name: "theme_blue_dark4",
    caption: "蓝黑2",
    thumburl: "",
    theme: "dark",
    bannerStyle: "primary",
    primaryColor: "#1991FF",
    logoBgColor: "#28a0ff",
    menuHighlightColor: "",
  },
  {
    name: "theme_green",
    caption: "绿色",
    thumburl: "",
    theme: "light",
    bannerStyle: "primary",
    primaryColor: "#41C486",
    logoBgColor: "#67C08B",
    menuHighlightColor: "",
  },
];

export { primaryColor, themeColors, layoutConfig };
