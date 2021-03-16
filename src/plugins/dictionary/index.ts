/*
 * @Description:
 * @Autor: 胡涛
 * @Date: 2021-01-12 19:05:26
 * @LastEditors: 胡涛
 * @LastEditTime: 2021-03-11 16:46:39
 */
import { IDictionaryConstants } from "@/types/dictionarys";
import { generatorDictionaryConstants } from "./generators";
import { dictionary, dictionaryName, dictionaryOptions } from "@cr/utils";

/**
 *字典名称常量值定义
 */
const dictionaryConstants: IDictionaryConstants = {
  ...generatorDictionaryConstants,
  ROLEWRITEUSER: "WriteUser"
};

export { dictionaryConstants, dictionary, dictionaryName, dictionaryOptions };
