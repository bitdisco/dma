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
   * 
   * @params {string} name 
   */
  byName: (name: string): Promise<dtoTypes.FindTenantResultDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"abpTenant/byName", {name})),

  /**
   * 
   * @params {string} id 
   */
  byId: (id: string): Promise<dtoTypes.FindTenantResultDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"abpTenant/byId", {id}))
};