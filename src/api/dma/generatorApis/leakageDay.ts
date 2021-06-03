/**
 * 分区月数据 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 分区月数据
 */
export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateLeakageDayDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateLeakageDayDto): Promise<dtoTypes.LeakageDayDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"leakageDay/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.LeakageDayDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageDay/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"leakageDay/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.LeakageDayDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageDay/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateLeakageDayDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateLeakageDayDto): Promise<dtoTypes.LeakageDayDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"leakageDay/update", {id}), data),

  /**
   * 获取分区漏损树型列表
   * @params {object} params 查询参数
   */
  getLeakageTree: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageDay/getLeakageTree"), params),

  /**
   * 获取分区漏损排行
   * @params {object} params 查询参数
   */
  getLeakageRanking: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageDay/getLeakageRanking"), params),

  /**
   * 获取分区漏损曲线
   * @params {object} params 查询参数
   */
  getLeakageLine: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageDay/getLeakageLine"), params),

  /**
   * 获取夜间流量数据
   * @params {object} params 查询参数
   */
  getNightFlow: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.NightFlowDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageDay/getNightFlow"), params),

  /**
   * 获取管网漏损数据
   * @params {object} params 查询参数
   */
  getPipeLeakage: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.PipeLeakageDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageDay/getPipeLeakage"), params),

  /**
   * 获取分区供水量月
   * @params {object} params 查询参数
   */
  getAreaWaterSupplyMonth: (params: object): Promise<dtoTypes.ReportResultDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageDay/getAreaWaterSupplyMonth"), params)
};