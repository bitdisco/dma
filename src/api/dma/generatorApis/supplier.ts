/**
 * 供应商管理相关 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 供应商管理相关
 */
export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateSupplierDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateSupplierDto): Promise<dtoTypes.SupplierDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"supplier/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.SupplierDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"supplier/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"supplier/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.SupplierDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"supplier/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateSupplierDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateSupplierDto): Promise<dtoTypes.SupplierDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"supplier/update", {id}), data),

  /**
   * 
   * @params {object} params 查询参数
   */
  getPageListByFilter: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.SupplierDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"supplier/getPageListByFilter"), params),

  /**
   * 
   */
  all: (): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"supplier/all")),

  /**
   * 
   * @params {string} id 
   */
  getByIdAsync: (id: string): Promise<dtoTypes.SupplierDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"supplier/getByIdAsync"), { id })
};