import Vue from "vue";
import VueRouter, { RawLocation, Route, RouteConfig } from "vue-router";
import { indexRoutes, baseRoutes, oidcRoutes } from "./config";
import { generatorsRoutes } from "./generators";
import { getToken, appUrl } from "@cr/utils";
import { checkPermission, isReadyPermission } from "@cr/utils";
import { UserModule } from "@/store";
import { initAppConfiguration } from "@/plugins/configuration";

Vue.use(VueRouter);

/**
 *处理导航跳转时跳转地址为当前页面时 - 屏蔽错误提示
 */
const originalPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(
  location: RawLocation,
): Promise<Route> {
  return originalPush.call(this, location).catch((err: any) => err);
};

/**
 * 获取路由信息
 */
const getRoutes = () => {
  let routes: RouteConfig[] = [];
  routes = routes.concat(indexRoutes);
  routes = routes.concat(baseRoutes);
  routes = routes.concat(oidcRoutes);
  routes = routes.concat(generatorsRoutes);

  return routes;
};

const routes = getRoutes();

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

/**
 * 路由处理逻辑
 */
router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.allowAnonymous === true) {
    // 允许匿名访问路由
    next();
    return;
  }
  const token = await getToken();
  if (!token && to.path !== "/login") {
    appUrl.setUrl();
    next({
      path: "/login",
    });
  } else {
    // 其它需要做权限验证路由
    if (!isReadyPermission()) {
      if (token && token !== "") {
        await initAppConfiguration();
      }
    }
    const permissionsCode = to.meta?.permissionCode || "";
    if (permissionsCode === "" || checkPermission(permissionsCode)) {
      if (to.path === "" || to.path === "/") {
        // 首页路由
        next({
          path: "/index",
        });
      } else {
        next();
      }
    } else {
      next({
        path: "/403",
      });
    }
  }
});

export default router;
