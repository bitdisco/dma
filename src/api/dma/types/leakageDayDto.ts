/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 14:43:46
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type LeakageDayDto = {
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
  backgroundLeakage?: number; //背景漏水量
  brokenlLeakage?: number; //破管漏水量
  missValue?: number; //漏失量
  leakageRate?: number; //漏损率
  leakageRateRingRatio?: number; //漏损率环比
  minRealValue?: number; //最小夜间流量
  parentId?: string; //分区父级主键
  id: string; 
};
