import { RouteConfig } from "vue-router";
import Layout from "@/layout/default/Index.vue";

export const generatorsRoutes: RouteConfig[] = [
  {
    path: "/generators",
    name: "Generators",
    component: Layout,
    redirect: "<%=model.FirstPath %>",
    meta: {
      permissionCode: "",
      allowAnonymous: true,
      title: "自动生成页面",
    },
    children: [  <% model.routes.forEach(function(item){ %>
      {
        path: "<%=item.path %>",
        name: "<%=item.name %>",
        component:  () => import("<%=item.component %>"),
        meta: {
          permissionCode: "",
          allowAnonymous: false,
          title: "<%= item.description || item.name %>",
        },
      },
      <% }); %>
    ],
  },
];
