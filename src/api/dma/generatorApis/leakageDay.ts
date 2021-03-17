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
   * 获取分区漏损数据
   * @params {object} params 查询参数
   */
  getLeakageRanking: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"leakageDay/getLeakageRanking"), params)
};