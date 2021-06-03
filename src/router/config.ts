import { RouteConfig } from "vue-router";
import Layout from "@/layout/default/Index.vue";

/**
 * 基础路由
 */
export const indexRoutes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/index",
    meta: {
      permissionCode: "",
      allowAnonymous: false,
      title: "首页",
    },
    children: [
      {
        path: "index",
        name: "index",
        meta: {
          keepAlive: true,
          permissionCode: "",
          allowAnonymous: false,
          title: "首页",
        },
        component: () => import("@/views/dashboard/Index.vue"),
      },
      {
        path: "about",
        name: "about",
        meta: {
          permissionCode: "",
          allowAnonymous: false,
          title: "关于我们",
        },
        component: () => import("@/views/dashboard/About.vue"),
      },
    ],
  },
  {
    path: "/monitorInfo",
    name: "monitorInfo",
    component: Layout,
    redirect: "/realData",
    meta: {
      permissionCode: "",
      allowAnonymous: false,
      title: "监测信息",
    },
    children: [
      {
        path: "realData",
        name: "realData",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.RealData",
          allowAnonymous: false,
          title: "实时数据",
        },
        component: () => import("@/views/dma/monitorInfo/realData/Index.vue"),
      },
      {
        path: "realMeter",
        name: "realMeter",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.RealMeter",
          allowAnonymous: false,
          title: "实时数据",
        },
        component: () => import("@/views/dma/monitorInfo/realMeter/Index.vue"),
      }
    ]
  },
  {
    path: "/leakAnanalysis",
    name: "leakAnanalysis",
    component: Layout,
    redirect: "/sortAnalyze",
    meta: {
      permissionCode: "",
      allowAnonymous: false,
      title: "漏损分析",
    },
    children: [
      {
        path: "sortAnalyze",
        name: "sortAnalyze",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.LeakageSortAnalyze",
          allowAnonymous: false,
          title: "漏损排行榜",
        },
        component: () => import("@/views/dma/leakAnanalysis/sortAnalyze/Index.vue"),
      }
    ]
  },
  {
    path: "/baseInfo",
    name: "baseInfo",
    component: Layout,
    redirect: "/meter",
    meta: {
      permissionCode: "",
      allowAnonymous: false,
      title: "DMA分区配置",
    },
    children: [
      {
        path: "area",
        name: "area",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.Area",
          allowAnonymous: false,
          title: "分区管理",
        },
        component: () => import("@/views/dma/baseInfo/area/Index.vue"),
      },
      {
        path: "meter",
        name: "meter",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.Meter",
          allowAnonymous: false,
          title: "监测点管理",
        },
        component: () => import("@/views/dma/baseInfo/meter/Index.vue"),
      },
      {
        path: "areaMeter",
        name: "areaMeter",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.AreaMeter",
          allowAnonymous: false,
          title: "设备挂接",
        },
        component: () => import("@/views/dma/baseInfo/areaMeter/Index.vue"),
      },
      {
        path: "dmaAlarm",
        name: "dmaAlarm",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.AreaMeter",
          allowAnonymous: false,
          title: "告警配置",
        },
        component: () => import("@/views/dma/baseInfo/dmaAlarm/Index.vue"),
      }
    ],
  },
  {
    path: "/flowAnanalysis",
    name: "flowAnanalysis",
    component: Layout,
    redirect: "/dayFlowQoq",
    meta: {
      permissionCode: "",
      allowAnonymous: false,
      title: "流量分析",
    },
    children: [
      {
        path: "dayAreaFlowQoq",
        name: "dayAreaFlowQoq",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.Area",
          allowAnonymous: false,
          title: "日分区流量环比",
        },
        component: () => import("@/views/dma/baseInfo/area/Index.vue"),
      },
      {
        path: "monthAreaFlowQoq",
        name: "monthAreaFlowQoq",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.Meter",
          allowAnonymous: false,
          title: "月分区流量环比",
        },
        component: () => import("@/views/dma/baseInfo/meter/Index.vue"),
      },
      {
        path: "dayAreaFlow",
        name: "dayAreaFlow",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.AreaMeter",
          allowAnonymous: false,
          title: "日分区流量分析",
        },
        component: () => import("@/views/dma/baseInfo/areaMeter/Index.vue"),
      },
      {
        path: "monthAreaFlow",
        name: "monthAreaFlow",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.AreaMeter",
          allowAnonymous: false,
          title: "月分区流量分析",
        },
        component: () => import("@/views/dma/baseInfo/dmaAlarm/Index.vue"),
      }
    ],
  },
  {
    path: "/waterSupply",
    name: "waterSupply",
    component: Layout,
    redirect: "/meter",
    meta: {
      permissionCode: "DMA.WaterSupply",
      allowAnonymous: false,
      title: "供水量分析",
    },
    children: [
      {
        path: "leakageHour",
        name: "leakageHour",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.LeakageHour",
          allowAnonymous: false,
          title: "分区日供水",
        },
        component: () => import("@/views/dma/waterSupply/leakageHour/Index.vue"),
      }
    ]
  }
];

/**
 * Oidc页面路由
 */
export const oidcRoutes: RouteConfig[] = [
  {
    path: "/oidc-callback",
    name: "oidc-callback",
    meta: {
      allowAnonymous: true,
      title: "单点登录回调页面",
    },
    component: () => import("@/layout/oidc/oidcCallback.vue"),
  },
  {
    path: "/oidc-logout",
    name: "oidc-logout",
    meta: {
      allowAnonymous: true,
      title: "单点退出登录回调",
    },
    component: () => import("@/layout/oidc/oidcLogout.vue"),
  },
  {
    path: "/oidc-renew",
    name: "oidc-renew",
    meta: {
      allowAnonymous: true,
      title: "单点登录其他操作",
    },
    component: () => import("@/layout/oidc/oidcCallbackError.vue"),
  },
];

/**
 * 基础页面路由
 */
export const baseRoutes: RouteConfig[] = [
  {
    path: "/login",
    name: "login",
    meta: {
      allowAnonymous: true,
      title: "登录页",
    },
    component: () => import("@/layout/login/index.vue"),
  },
  {
    path: "/401",
    name: "401",
    meta: {
      allowAnonymous: true,
      title: "error401",
    },
    component: () => import("@/layout/error/error401.vue"),
  },
  {
    path: "/403",
    name: "403",
    meta: {
      allowAnonymous: true,
      title: "error403",
    },
    component: () => import("@/layout/error/error403.vue"),
  },
  {
    path: "*",
    name: "404",
    meta: {
      allowAnonymous: true,
      title: "error404",
    },
    component: () => import("@/layout/error/error404.vue"),
  },
];
