/**
 * 监测点月数据 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 监测点月数据
 */
export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateFlowDayDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateFlowDayDto): Promise<dtoTypes.FlowDayDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"flowDay/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.FlowDayDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"flowDay/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"flowDay/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.FlowDayDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"flowDay/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateFlowDayDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateFlowDayDto): Promise<dtoTypes.FlowDayDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"flowDay/update", {id}), data)
};