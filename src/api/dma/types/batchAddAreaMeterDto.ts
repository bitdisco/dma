/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-18 11:21:04
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 添加或更新的DTO
 */
export type BatchAddAreaMeterDto = {
  meterIds?: any; //监测点主键集合
  areaId: string; //分区主键
  meterId: string; //监测点主键
  directionSign?: string; //方向计算标记
  direction?: number; //方向出入口
  enabledMark?: number; //有效标志
  sortCode?: number; //排序码
  description?: string; //备注
  creationTime: string; 
  creatorId?: string; 
  id: string; 
};
