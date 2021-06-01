/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 添加或更新的DTO
 */
export type CreateOrUpdateFlowDayDto = {
  meterId: string; //流量计主键
  meterName?: string; //流量计名称
  meterCode?: string; //流量计编号
  meterNumber?: string; //监测点编号
  addressCode?: string; //地址编码
  createTime: string; //创建时间
};
