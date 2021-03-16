import { IGeneratorEnums } from "@/types/enums";

/**
 * 自动生成枚举项定义
 */
const generatorEnums: IGeneratorEnums = {<% enums.forEach(function(item){ %>
  /**
   * <%=item.description || item.enumName %>
   */
  <%=item.enumName %>: {<% item.items.forEach(function(enumItem){ %>
    <%= enumItem.name %>:{ label: "<%= enumItem.label %>", value: <%= enumItem.value %> },<%});%>
  },<%});%>
};

export default generatorEnums;
