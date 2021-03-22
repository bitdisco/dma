/**
 * 分区管理相关 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-22 17:16:32
 * 接口生成地址：http://localhost:44333/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 分区管理相关
 */
export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateAreaDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateAreaDto): Promise<dtoTypes.AreaDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"area/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.AreaDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"area/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"area/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.AreaDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"area/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateAreaDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateAreaDto): Promise<dtoTypes.AreaDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"area/update", {id}), data),

  /**
   * 获取分区树型列表
   * @params {object} params 查询参数
   */
  getAreaTree: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"area/getAreaTree"), params),

  /**
   * 获取分区流量计树型列表
   * @params {object} params 查询参数
   */
  getAreaMeterTree: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"area/getAreaMeterTree"), params),

  /**
   * 按条件查询列表
   * @params {object} params 查询参数
   */
  getQueryList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.AreaDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"area/getQueryList"), params)
};