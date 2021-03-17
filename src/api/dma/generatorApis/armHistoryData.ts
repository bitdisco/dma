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
   * @params {dtoTypes.CreateOrUpdateArmHistoryDataDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateArmHistoryDataDto): Promise<dtoTypes.ArmHistoryDataDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"armHistoryData/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.ArmHistoryDataDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"armHistoryData/getPageList"), params),

  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateArmHistoryDataDto} data 参数
   */
  addAsync: (data: dtoTypes.CreateOrUpdateArmHistoryDataDto): Promise<dtoTypes.ArmHistoryDataDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"armHistoryData/addAsync"), data),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"armHistoryData/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.ArmHistoryDataDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"armHistoryData/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateArmHistoryDataDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateArmHistoryDataDto): Promise<dtoTypes.ArmHistoryDataDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"armHistoryData/update", {id}), data),

  /**
   * 按条件查询列表
   * @params {object} params 查询参数
   */
  getQueryList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.ArmHistoryDataDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"armHistoryData/getQueryList"), params),

  /**
   * 3天流量对比
   * @params {object} params 查询参数
   */
  get3DayContrastFlow: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"armHistoryData/get3DayContrastFlow"), params),

  /**
   * 3天压力对比
   * @params {object} params 查询参数
   */
  get3DayContrastPressure: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"armHistoryData/get3DayContrastPressure"), params),

  /**
   * 3天电压对比
   * @params {object} params 查询参数
   */
  get3DayContrastVoltage: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"armHistoryData/get3DayContrastVoltage"), params)
};