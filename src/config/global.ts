import { IRightMenuDefine, IUserMenuDefine } from "@cr/types";
import TestLayout from "@/components/testLayout/testLayout.vue";
const CrMessageIcon: any = () =>
  import("@cr/components/layout/components/MessageIcon.vue");

/**
 * 下载客户端组件配置
 */
export const clientData = [
  {
    name: "XXX系统AclientDataPP",
    describe: "app的描述文字",
    version: "V1.0.0",
    appInfo: ["XXX系统APP11111111", "XXX系统APP222222", "XXX系统APP333333"],
    qrCode: ""
  },
  {
    name: "OOOO系统APP",
    describe: "app的描述文字",
    version: "V2.10.01",
    appInfo: ["OOOO系统APP11111111", "OOOO系统APP222222", "OOOO系统APP333333"],
    qrCode: ""
  }
];

/**
 * 右上角导航菜单
 */
export const rightMenus: IRightMenuDefine[] = [
  {
    title: "应用中心",
    icon: "appstore",
    type: "down",
    components: "AppCenter",
    props: { width: "20%" },
    data: []
  },
  {
    title: "规则中心",
    icon: "bulb",
    type: "button",
    components: "",
    props: {},
    data: ""
  },
  {
    title: "下载客户端",
    icon: "desktop",
    type: "down",
    components: "DownClient",
    props: { width: "50%" },
    data: clientData
  },
  // {
  //   title: "测试功能组件",
  //   icon: "bulb",
  //   type: "custom",
  //   components: TestLayout,
  //   props: {width: "50%"},
  //   data: clientData,
  // },
  {
    title: "消息中心",
    icon: "bulb",
    type: "custom",
    components: CrMessageIcon,
    props: {},
    data: ""
  }
];

/**
 * 用户下拉菜单
 */
export const userMenus: IUserMenuDefine[] = [
  {
    title: "个人中心",
    icon: "user",
    type: "click",
    handle: "UserCenter"
  },
  {
    title: "修改密码",
    icon: "form",
    type: "click",
    handle: "UserPassword"
  },
  {
    title: "主题设置",
    icon: "setting",
    type: "click",
    handle: "ChangeTheme"
  },
  {
    title: "点击回调",
    icon: "hourglass",
    type: "click",
    handle: "myCilck"
  },
  {
    title: "退出登录",
    icon: "logout",
    type: "logout",
    handle: "handleLogout"
  }
];
