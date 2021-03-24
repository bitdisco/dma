/**
 *  - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-24 14:21:04
 * 接口生成地址：http://localhost:44333/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 
 */
export default {
  /**
   * 新增
   * @params {dtoTypes.CreateOrUpdateAlarmInfoDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateAlarmInfoDto): Promise<dtoTypes.AlarmInfoDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"alarmInfo/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.AlarmInfoDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"alarmInfo/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"alarmInfo/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.AlarmInfoDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"alarmInfo/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateAlarmInfoDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateAlarmInfoDto): Promise<dtoTypes.AlarmInfoDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"alarmInfo/update", {id}), data)
};