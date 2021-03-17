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
   * @params {boolean} IncludeTypes 
   */
  apiDefinition: (IncludeTypes: boolean): Promise<dtoTypes.ApplicationApiDescriptionModel> =>
    api.get(api.getAbsoluteUrl(serviceName,"abpApiDefinition/apiDefinition"), { IncludeTypes })
};