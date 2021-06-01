/**
 * 清洗数据 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 清洗数据
 */
export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateMachiningDataDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateMachiningDataDto): Promise<dtoTypes.MachiningDataDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"machiningData/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.MachiningDataDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"machiningData/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"machiningData/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.MachiningDataDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"machiningData/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateMachiningDataDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateMachiningDataDto): Promise<dtoTypes.MachiningDataDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"machiningData/update", {id}), data),

  /**
   * 按条件查询列表
   * @params {object} params 查询参数
   */
  getQueryList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.MachiningDataDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"machiningData/getQueryList"), params),

  /**
   * 获取日分析
   * @params {object} params 查询参数
   */
  getDayAnalyse: (params: object): Promise<dtoTypes.ReportResultDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"machiningData/getDayAnalyse"), params),

  /**
   * 获取日对比
   * @params {object} params 查询参数
   */
  getDayContrast: (params: object): Promise<dtoTypes.ReportResultDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"machiningData/getDayContrast"), params)
};