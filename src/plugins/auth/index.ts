import { checkPermission, isReadyPermission } from "@cr/utils";

/**
 * 检查按钮权限
 * @param el
 * @param permissionName
 * @param context
 */
const checkAction = function(
  el: HTMLElement,
  permissionName: string,
  context: Vue,
) {
  if (isReadyPermission()) {
    if (!checkPermission(permissionName)) {
      el.style.display = "none";
    } else {
      el.style.display = "";
    }
  } else {
    setTimeout(checkAction, 100, el, permissionName, context);
  }
};

/**
 * 权限扩展指令安装入口
 */
export default {
  /**
   *
   * @param Vue
   * @param options
   */
  install(Vue: any, options: any): void {
    Vue.directive("auth", {
      inserted(el: HTMLElement, binding: any, vnode: any) {
        const meta = vnode.context.$route.meta;
        const module = meta.permissionCode || "";
        const action = binding.value.action || "";
        const fullName: boolean = binding.value.action === true;
        const context = vnode.context as Vue;
        const isFullName = fullName || action.indexOf(".") >= 0;
        const permissionName = isFullName ? action : [module, action].join(".");
        checkAction(el, permissionName, context);
      },
    });
  },
};
