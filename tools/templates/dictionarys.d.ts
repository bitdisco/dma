/*
 * @Description: 
 * @Autor: 胡涛
 * @Date: 2021-03-11 15:46:12
 * @LastEditors: 胡涛
 * @LastEditTime: 2021-03-11 18:44:23
 */

/**
 * 自动生成字典常量接口约束
 */
export interface IGeneratorDictionaryConstants {
<% dictionarys.forEach(function(item){ %>  <%= item.name %>:string; //<%=item.description%>
<%});%>
}