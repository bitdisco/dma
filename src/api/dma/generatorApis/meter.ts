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
   * 新增
   * @params {dtoTypes.CreateOrUpdateMeterDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateMeterDto): Promise<dtoTypes.MeterDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"meter/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.MeterDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"meter/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"meter/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.MeterDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"meter/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateMeterDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateMeterDto): Promise<dtoTypes.MeterDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"meter/update", {id}), data),

  /**
   * 按条件查询列表
   * @params {object} params 查询参数
   */
  getQueryList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.MeterDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"meter/getQueryList"), params)
};