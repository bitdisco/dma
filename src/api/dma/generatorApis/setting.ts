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
   * @params {string} id 
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"setting/delete", {id})),

  /**
   * 
   * @params {string} id 
   */
  get: (id: string): Promise<dtoTypes.SettingDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"setting/get", {id})),

  /**
   * 
   * @params {object} params 查询参数
   */
  getInfoByName: (params: object): Promise<dtoTypes.SettingDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"setting/getInfoByName"), params),

  /**
   * 
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.SettingDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"setting/getPageList"), params),

  /**
   * 
   * @params {dtoTypes.CreateOrUpdateDto} data 
   */
  create: (data: dtoTypes.CreateOrUpdateDto): Promise<any> =>
    api.post(api.getAbsoluteUrl(serviceName,"setting/create"), data),

  /**
   * 
   * @params {any} data 
   */
  batchSet: (data: any): Promise<any> =>
    api.post(api.getAbsoluteUrl(serviceName,"setting/batchSet"), data),

  /**
   * 
   * @params {any} data 
   */
  setList: (data: any): Promise<any> =>
    api.post(api.getAbsoluteUrl(serviceName,"setting/setList"), data),

  /**
   * 
   */
  mySetting: (): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"setting/mySetting"))
};