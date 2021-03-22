import {RouteConfig} from "vue-router";
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
        path: "meter",
        name: "meter",
        meta: {
          keepAlive: true,
          permissionCode: "DMA.Meter",
          allowAnonymous: false,
          title: "首监测点配置页",
        },
        component: () => import("@/views/dma/baseInfo/meter/Index.vue"),
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
