/**
 *  - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-17 22:35:30
 * 接口生成地址：http://localhost:44333/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateArmRealDataDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateArmRealDataDto): Promise<dtoTypes.ArmRealDataDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"armRealData/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.ArmRealDataDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"armRealData/getPageList"), params),

  /**
   * 添加
   * @params {dtoTypes.CreateOrUpdateArmRealDataDto} data 参数
   */
  addAsync: (data: dtoTypes.CreateOrUpdateArmRealDataDto): Promise<dtoTypes.ArmRealDataDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"armRealData/addAsync"), data),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"armRealData/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.ArmRealDataDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"armRealData/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateArmRealDataDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateArmRealDataDto): Promise<dtoTypes.ArmRealDataDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"armRealData/update", {id}), data),

  /**
   * 按条件查询列表
   * @params {object} params 查询参数
   */
  getQueryList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.ArmRealDataDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"armRealData/getQueryList"), params)
};