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
   * @params {dtoTypes.CreateOrUpdateDictionaryItemDetailDto} data 
   */
  itemDetail: (data: dtoTypes.CreateOrUpdateDictionaryItemDetailDto): Promise<dtoTypes.DictionaryItemDetailDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"dictionaryItemDetail/itemDetail"), data),

  /**
   * 
   * @params {object} params 查询参数
   */
  itemDetail: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.DictionaryItemDetailDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItemDetail/itemDetail"), params),

  /**
   * 
   * @params {string} id 
   */
  itemDetail: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"dictionaryItemDetail/itemDetail", {id})),

  /**
   * 
   * @params {string} id 
   */
  itemDetail: (id: string): Promise<dtoTypes.DictionaryItemDetailDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"dictionaryItemDetail/itemDetail", {id})),

  /**
   * 
   * @params {string} id 
   * @params {dtoTypes.CreateOrUpdateDictionaryItemDetailDto} data 
   */
  itemDetail: (id: string,data: dtoTypes.CreateOrUpdateDictionaryItemDetailDto): Promise<dtoTypes.DictionaryItemDetailDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"dictionaryItemDetail/itemDetail", {id}), data)
};