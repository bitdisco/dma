/**
 * 分区配置项 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-18 11:21:04
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 分区配置项
 */
export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateAreaItemDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateAreaItemDto): Promise<dtoTypes.AreaItemDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"areaItem/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.AreaItemDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"areaItem/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"areaItem/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.AreaItemDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"areaItem/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateAreaItemDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateAreaItemDto): Promise<dtoTypes.AreaItemDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"areaItem/update", {id}), data),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  getInfoByAreaIdAsync: (id: string): Promise<dtoTypes.AreaItemDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"areaItem/getInfoByAreaIdAsync"), { id }),

  /**
   * 按条件查询列表
   * @params {object} params 查询参数
   */
  getQueryList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.AreaItemDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"areaItem/getQueryList"), params)
};