/**
 * 告警管理 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-18 11:21:04
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 告警管理
 */
export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateAlarmDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateAlarmDto): Promise<dtoTypes.AlarmDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"alarm/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.AlarmDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"alarm/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"alarm/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.AlarmDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"alarm/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateAlarmDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateAlarmDto): Promise<dtoTypes.AlarmDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"alarm/update", {id}), data)
};