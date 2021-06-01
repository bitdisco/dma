/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 14:43:46
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type LeakageTreeDto = {
  areaId: string; //分区主键
  areaName?: string; //分区名称
  areaCode?: string; //分区编号
  meterCount?: number; //监测点数量
  inFlow?: number; //进水流量
  outFlow?: number; //出水流量
  supplyValue?: number; //供水量
  missValue?: number; //漏失量
  leakageRate?: number; //漏损率
  parentId?: string; //分区父级主键
  totalInFlow?: number; //合计进水流量
  totalOutFlow?: number; //合计进水流量
  hasChildren: boolean; 
  isLeaf: boolean; 
  children?: any; 
  id: string; 
};
