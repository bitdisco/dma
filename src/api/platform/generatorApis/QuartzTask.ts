/**
 * 定时任务
 */

import api from "@/api";
import { PagedResultDto } from "../types";

export default {
  /**
   * 添加定时任务
   * @params {any} data
   */
  create: (data: any): Promise<any> => api.post(api.getUrl("quartz/add"), data),

  /**
   * 修改定时任务
   * @params {string} id
   * @params {any} data
   */
  edit: (id: string, data: any): Promise<any> =>
    api.put(api.getUrl("quartz/edit", { id }), data),

  /**
   *获取列表
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<PagedResultDto<any>> =>
    api.get(api.getUrl("quartz/getPageList"), params),

  /**
   * 删除定时任务
   * @params {string} id
   */
  delete: (id: string): Promise<any> =>
    api.delete(api.getUrl("quartz/delete", { id })),

  /**
   * 根据ID获取任务详情
   * @params {string} id
   */
  get: (id: string): Promise<any> => api.get(api.getUrl("quartz/get", { id })),

  /**
   * 获取任务详情
   * @param params
   */
  getDetails: (params: any) => api.get(api.getUrl("quartz/getdetail"), params),

  /**
   * 查询任务执行日志
   * @param params
   */
  getLogList: (params: any) => api.get(api.getUrl("quartz/getloglist"), params),

  /**
   * 更新任务状态
   * @param params
   */
  updateTaskStatus: (params: any) =>
    api.put(api.getUrl("quartz/updatetaskstatus"), params),

  /**
   * 更新任务
   * @param params
   */
  update: (params: any) =>
    api.post(api.getUrl("quartz/update", { id: params.id }), params),

  /**
   *  添加JOB日志
   * @param params
   */
  addJobLog: (params: any) => api.post(api.getUrl("quartz/addjoblog"), params),
};
