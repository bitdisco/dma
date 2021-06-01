/**
 * 测试 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/dma/types";


const serviceName = 'dma';

/**
 * 测试
 */
export default {
  /**
   * 
   */
  getPageList: (): Promise<dtoTypes.SampleDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"sample/getPageList")),

  /**
   * 
   */
  authorized: (): Promise<dtoTypes.SampleDto> =>
    api.get(api.getAbsoluteUrl(serviceName,"sample/authorized"))
};