/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-24 14:21:04
 * 接口地址：http://localhost:44333/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type NightFlowDto = {
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
  saleWater?: number; //售水量
  supplyAvg?: number; //平均供水量
  supplyMax?: number; //最大供水量
  mnf?: number; //最小夜间流量
  missValue?: number; //漏失量
  leakageRate?: number; //漏损率
  leakageRateRingRatio?: number; //漏损率环比
};
