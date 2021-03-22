/**
 *  - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-22 17:16:32
 * 接口生成地址：http://localhost:44333/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 
 */
export default {
  /**
   * 
   * @params {dtoTypes.CreateOrUpdateDictionaryItemDto} data 
   */
  dictionary: (data: dtoTypes.CreateOrUpdateDictionaryItemDto): Promise<dtoTypes.DictionaryItemDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"dictionaryItem/dictionary"), data),

  /**
   * 
   */
  dictionary: (): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItem/dictionary")),

  /**
   * 
   * @params {string} id 
   */
  dictionary: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"dictionaryItem/dictionary", {id})),

  /**
   * 
   * @params {string} id 
   */
  dictionary: (id: string): Promise<dtoTypes.DictionaryItemDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItem/dictionary", {id})),

  /**
   * 
   * @params {string} id 
   * @params {dtoTypes.CreateOrUpdateDictionaryItemDto} data 
   */
  dictionary: (id: string,data: dtoTypes.CreateOrUpdateDictionaryItemDto): Promise<dtoTypes.DictionaryItemDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"dictionaryItem/dictionary", {id}), data),

  /**
   * 
   * @params {string} moduleCode 
   */
  all: (moduleCode: string): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItem/all", {moduleCode})),

  /**
   * 
   */
  tree: (): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItem/tree")),

  /**
   * 
   * @params {string} moduleCode 
   */
  tree: (moduleCode: string): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItem/tree", {moduleCode})),

  /**
   * 
   * @params {string} moduleCode 
   * @params {string} itemCode 
   */
  items: (moduleCode: string,itemCode: string): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItem/items", {moduleCode,itemCode})),

  /**
   * 
   * @params {string} itemCode 
   * @params {string} dictionayKey 
   * @params {string} moduleCode 
   */
  value: (itemCode: string,dictionayKey: string,moduleCode: string): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItem/value", {itemCode,dictionayKey,moduleCode})),

  /**
   * 
   */
  clearCache: (): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItem/clearCache")),

  /**
   * 
   * @params {string} moduleCode 
   */
  dictionaryItems: (moduleCode: string): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItem/dictionaryItems"), { moduleCode })
};