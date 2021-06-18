/**
 * 同步数据 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-18 11:21:04
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 同步数据
 */
export default {
  /**
   * 同步分区数据
   */
  migrateData: (): Promise<any> =>
    api.get(api.getAbsoluteUrl(serviceName,"migrate/migrateData"))
};