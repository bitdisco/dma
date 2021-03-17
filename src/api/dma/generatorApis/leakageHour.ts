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
   * @params {dtoTypes.CreateOrUpdateLeakageHourDto} data 参数
   */
  create: (data: dtoTypes.CreateOrUpdateLeakageHourDto): Promise<dtoTypes.LeakageHourDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"leakageHour/create"), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.LeakageHourDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageHour/getPageList"), params),

  /**
   * 删除
   * @params {string} id 主键ID
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"leakageHour/delete", {id})),

  /**
   * 获取某条记录
   * @params {string} id 主键ID
   */
  get: (id: string): Promise<dtoTypes.LeakageHourDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageHour/get", {id})),

  /**
   * 修改
   * @params {string} id 主键ID
   * @params {dtoTypes.CreateOrUpdateLeakageHourDto} data 参数
   */
  update: (id: string,data: dtoTypes.CreateOrUpdateLeakageHourDto): Promise<dtoTypes.LeakageHourDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"leakageHour/update", {id}), data),

  /**
   * 获取列表
   * @params {object} params 查询参数
   */
  getQueryList: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageHour/getQueryList"), params)
};