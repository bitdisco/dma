/*
 * @Description: 
 * @Autor: 朱海良
 * @Date: 2021-03-16 14:20:47
 * @LastEditors: 朱海良
 * @LastEditTime: 2021-06-01 14:21:11
 */
/**
 * 用户管理 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-1-18 16:20:55
 * 接口生成地址：http://36.133.33.128:4000/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "../types";
const serviceName = 'platform';

export default {
  /**
   * 获取所有数据
   * @params {object} params 查询参数
   */
  getPageList: (params: object): Promise<dtoTypes.PagedResultDto<any>> =>
    api.get(api.getAbsoluteUrl(serviceName,"appUser/getPageList"), params),

  /**
   * 获取用户信息
   * @param params
   */
  getUser: (id: string) => api.get(api.getAbsoluteUrl(serviceName,"appUser/get", {id})),

  /**
   * 创建用户
   * @param params
   */
  createUser: (params: any) => api.post(api.getAbsoluteUrl(serviceName,"appUser/createAsync"), params),

  /**
   * 修改用户
   * @param id
   * @param params
   */
  updateUser: (id: string, params: any) => api.put(api.getAbsoluteUrl(serviceName,"appUser/update", {id}), params),

  /**
   * 删除用户
   * @param id
   */
  deleteUser: (id: string) => api.delete(api.getAbsoluteUrl(serviceName,"appUser/deleteUser", {id})),

  /**
   * 查询所有用户
   * @param id
   * @param params
   */
  getAllUsers: (params: any) => api.get(api.getAbsoluteUrl(serviceName,"appUser/getAllList"), params),

  /**
   * 重置密码
   * @param params
   */
  resetPassword: (params: any) =>
    api.post(api.getAbsoluteUrl(serviceName,"appUser/resetPassword"), params),

  /**
   * 修改密码
   * @param params
   */
  changePassword: (params: any) =>
    api.post(api.getAbsoluteUrl(serviceName,"appUser/changePassword"), params),

  /**
   * 锁定用户
   * @params {string} userId
   * @params {number} to
   */
  lockUser: (userId: string, to: number): Promise<any> =>
    api.post(api.getAbsoluteUrl(serviceName,"appUser/lockUser", {userId, to})),

  /**
   * 解锁哟关乎
   * @params {string} userId
   */
  unLockUser: (userId: string): Promise<any> =>
    api.post(api.getAbsoluteUrl(serviceName,"appUser/unLockUser", {userId})),
};
