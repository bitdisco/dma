/*
 * @Description: 
 * @Autor: 朱海良
 * @Date: 2021-03-16 14:20:47
 * @LastEditors: 朱海良
 * @LastEditTime: 2021-06-01 14:19:47
 */
/**
 * 新闻公告 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-1-18 16:20:55
 * 接口生成地址：http://36.133.33.128:4000/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/platform/types";
const serviceName = 'platform';

export default {
  /**
   *
   * @params {dtoTypes.CreateUpdateBaseNewsDto} data
   */
  create: (data: dtoTypes.CreateUpdateBaseNewsDto): Promise<dtoTypes.BaseNewsDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"news/create"), data),

  /**
   *
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.BaseNewsDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"news/getPageList"), params),

  /**
   *
   * @params {string} id
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"news/delete", {id})),

  /**
   *
   * @params {string} id
   */
  get: (id: string): Promise<dtoTypes.BaseNewsDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"news/get", {id})),

  /**
   *
   * @params {string} id
   * @params {dtoTypes.CreateUpdateBaseNewsDto} data
   */
  update: (id: string, data: dtoTypes.CreateUpdateBaseNewsDto): Promise<dtoTypes.BaseNewsDto> =>
    api.put(api.getAbsoluteUrl(serviceName,"news/update", {id}), data),

  /**
   *
   * @params {object} params 查询参数
   */
  topN: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"news/topN"), params),

  /**
   *
   * @params {string} moduleCode
   * @params {object} params 查询参数
   */
  topNList: (moduleCode: string, params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"news/topNList", {moduleCode}), params),

  /**
   *
   * @params {dtoTypes.GetStatDto} data
   */
  getStat: (data: dtoTypes.GetStatDto): Promise<dtoTypes.ChartDataDto> =>
    api.post(api.getAbsoluteUrl(serviceName,"news/getStat"), data),

  /**
   *
   */
  sendsms: (): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"news/sendsms")),
};
