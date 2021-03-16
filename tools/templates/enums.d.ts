/**
 * 枚举处理方法
 */
export interface IEnumModule {
  /**
   * 根据键名获取枚举名称
   * @param key
   * @param value
   */
  enumName(key: string | Object, value: number | Number | string): string;
  /**
   *根据键名获取枚举下拉列表数据源
    * @param key
    */
  enumOptions(key: string | Object): Array<any>;
}

/**
 * 枚举数据项定义
 */
export interface IEnumItem {
  /**
   * 显示名称
   */
  label: string;
  /**
   * 枚举值
   */
  value: Number | number | string;
}

/**
 * 自动生成枚举定义
 */
export interface IGeneratorEnums {<% enums.forEach(function(item){ %>
  /**
   * <%=item.description || item.enumName %>
   */
  <%=item.enumName %>: {<% item.items.forEach(function(enumItem){  %>
    <%= enumItem.name %>: IEnumItem;<%});%>
  };
  <%});%>
}