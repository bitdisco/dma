/**
 * 自动生成菜单项
 */
const generator_menus: Array<any> = [
  {
    key: "GENERATOR",
    icon: "home",
    title: "代码生成模块",
    permissionCode: "",
    url: "",
    children: [<% model.routes.forEach(function(item){ %>
      {
        key: "GENERATOR-<%=item.path%>",
        icon: "",
        title: "<%=item.path%>",
        url: "/generators/<%=item.path%>",
      },<% }); %> 
    ],
  },
];

export default generator_menus;
