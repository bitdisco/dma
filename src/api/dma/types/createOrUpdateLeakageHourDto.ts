/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 添加或更新的DTO
 */
export type CreateOrUpdateLeakageHourDto = {
  areaId: string; //分区主键
  areaName?: string; //分区名称
  areaCode?: string; //分区编号
  meterCount?: number; //监测点数量
  createTime: string; //创建时间
  inFlow?: number; //进水流量
  inFlowOpening?: number; //进水流量期初
  inFlowClosing?: number; //进水流量期末
  inFlowTotal?: number; //进水流量累计
  outFlow?: number; //出水流量
  outFlowOpening?: number; //出水流量期初
  outFlowClosing?: number; //出水流量期末
  outFlowTotal?: number; //出水流量累计
  supplyValue?: number; //供水量
};
