import generator_menus from "./generator_menu";

const menus: any[] = [
  {
    key: "1",
    icon: "home",
    title: "首页",
    permissionCode: "System",
    url: "",
    children: [
      {
        key: "1-1",
        icon: "",
        title: "首页",
        url: "/index",
      },
      {
        key: "1-2",
        icon: "",
        title: "关于我们",
        url: "/about",
      },
    ],
  },
  ...generator_menus,
];

/**
 *  将接口返回数据格式转换成导航菜单组件需要的格式
 * @param menus
 */
const convertNavMenus = function(menus: any[]) {
  const arrs: any[] = [];
  menus.map((x) => {
    const item: any = {
      key: x.id,
      title: x.displayName,
      permissionCode: x.name,
      icon: x.icon,
      url: x.url,
    };
    if (x.children && x.children.length) {
      item.children = convertNavMenus(x.children);
    }
    arrs.push(item);
  });
  return arrs;
};

/**
 * 获取当前登录用户菜单逻辑，目前为模拟返回代码 。
 */
const getAppMenus = function() {
  return new Promise<any>((resolve, reject) => {
    resolve(menus);
  });
};

export { getAppMenus };
