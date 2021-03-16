/*
 * @Description: 
 * @Autor: 胡涛
 * @Date: 2021-03-11 15:46:12
 * @LastEditors: 胡涛
 * @LastEditTime: 2021-03-11 18:45:13
 */
import { IGeneratorDictionaryConstants } from "@/types/generator_dictionarys";

/**
 * 自动生成字典常量值
 */
 export const generatorDictionaryConstants:   IGeneratorDictionaryConstants = {
<% dictionarys.forEach(function(item){ %>  <%= item.name %>:"<%= item.value %>", //<%=item.description%>
<%});%>
}