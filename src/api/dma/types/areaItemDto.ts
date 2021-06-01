/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type AreaItemDto = {
  areaId: string; //分区主键
  areaName?: string; //分区名称
  areaCode?: string; //分区编号
  statisticalDate?: string; //统计日期(2019-06)
  waterSale?: number; //计量售水量
  waterUnsold?: number; //未计量售水量
  waterFree?: number; //计量免费售水量
  waterUnsoldFree?: number; //未计量免费售水量
  waterStolen?: number; //失窃水量
  waterError?: number; //计量误差水量
  waterSeepage?: number; //渗水量
  waterOtherLoss?: number; //其它损耗水量
  enabledMark?: number; //有效标志
  sortCode?: number; //排序码
  description?: string; //备注
  isDeleted: boolean; 
  deleterId?: string; 
  deletionTime?: string; 
  lastModificationTime?: string; 
  lastModifierId?: string; 
  creationTime: string; 
  creatorId?: string; 
  id: string; 
};
