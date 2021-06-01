/**
 * 系统角色 - 本文件由前端工具生成器自动生成
 * 这里做演示demo，只做部分展示
 */

import api from "@/api";
import * as dtoTypes from "../types";
const serviceName = 'platform';

export default {
  /**
   *
   */
  platformAll: (): Promise<dtoTypes.undefined> =>
    api.get(api.getAbsoluteUrl(serviceName,"role/platformAll")),

  /**
   *
   * @params {object} params 查询参数
   */
  platformRoles: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.RoleDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"role/platformRoles"), params),

  /**
   *
   * @params {object} params 查询参数
   */
  platformRolesPost: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.RoleDto>> =>
    api.post(api.getAbsoluteUrl(serviceName,"role/platformRoles"), params),

  /**
   *
   * @params {object} params 查询参数
   */
  platformRolesPut: (params: any): Promise<dtoTypes.PagedResultDto<dtoTypes.RoleDto>> =>
    api.put(api.getAbsoluteUrl(serviceName,"role/platformRolesList", {id: params.id}), params),

  /**
   *
   * @params {object} params 查询参数
   */
  platformRolesDelete: (id: string): Promise<dtoTypes.PagedResultDto<dtoTypes.RoleDto>> =>
    api.delete(api.getAbsoluteUrl(serviceName,"role/platformRolesList", {id})),

  /**
   *
   * @params {string} id
   */
  platformRolesList: (id: string): Promise<dtoTypes.IdentityRoleDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"role/platformRolesList", {id})),

  /**
   *
   * @params {object} params 查询参数
   */
  identityRoles: (params: object): Promise<dtoTypes.PagedResultDto<dtoTypes.IdentityRoleDto>> =>
    api.get(api.getAbsoluteUrl(serviceName,"role/identityRoles"), params),

  /**
   *
   * @params {string} id
   */
  identityRolesList: (id: string): Promise<any> =>
    api.delete(api.getAbsoluteUrl(serviceName,"role/identityRolesList", {id})),
};
