/**
 * 物料管理 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-18 11:21:04
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 物料管理
 */
export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateMaterialsDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateMaterialsDto): Promise<dtoTypes.MaterialsDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"materials/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.MaterialsDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"materials/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"materials/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.MaterialsDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"materials/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateMaterialsDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateMaterialsDto): Promise<dtoTypes.MaterialsDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"materials/update", {id}), data),

  /**
   * 
   */
  categoryCount: (): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"materials/categoryCount"))
};