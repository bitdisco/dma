/**
 * 统计信息 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-1-18 16:20:55
 * 接口生成地址：http://36.133.33.128:4000/swagger/v1/swagger.json
 */

import api from "@/api";
import * as dtoTypes from "@/api/platform/types";

export default {
  /**
   * 获取统计数据，缓存1分钟
   */
  stats: (): Promise<any> =>
    api.get(api.getUrl("stat/stats")),
};
