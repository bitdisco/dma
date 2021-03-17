/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-17 22:35:30
 * 接口地址：http://localhost:44333/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type AreaMeterDto = {
  areaId: string; //分区主键
  meterId: string; //监测点主键
  directionSign?: string; //方向计算标记
  direction?: number; //方向出入口
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
