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
   * 
   * @params {object} params 查询参数
   */
  leakageAlgorithmAsync: (params: object): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"jobs/leakageAlgorithmAsync"), params),

  /**
   * 
   */
  machiningDataAsync: (): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"jobs/machiningDataAsync"))
};