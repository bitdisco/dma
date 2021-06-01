/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type AreaDto = {
  parentId?: string; //分区父级主键
  organizeId?: string; //机构主键
  departmentId?: string; //部门主键
  areaName?: string; //分区名称
  areaGrade?: number; //分区级别
  areaCode?: string; //分区编号
  averageNightPressure?: number; //夜间平均压力
  residentNumber?: number; //居民用户数量
  enterpriseWaterDemand?: number; //大用户夜间用水量
  mainPipeLength?: number; //主干管道长度
  subPipeNumber?: number; //私有管道数量
  subPipeLength?: number; //私有管道平均长度
  icfFactor?: number; //ICF因子
  noWater?: number; //是否通水
  constructionYear?: string; //建设年代
  principal?: string; //负责人
  principalPhone?: string; //负责人电话
  mnfUpperValue?: number; //最小夜间流量告警上限
  mnfRingRatio?: number; //最小夜间流量环比告警上限
  polygonStrokeColor?: string; //区域边线颜色
  polygonStrokeWeight?: number; //区域边线宽度
  polygonStrokeOpacity?: number; //区域边线透明度
  polygonFillColor?: string; //区域填充颜色
  polygonFillOpacity?: number; //区域填充透明度
  polygonPoints?: string; //区域节点
  showZoom?: number; //区域放大级别
  polygonsShowMark?: boolean; //区域显示标记
  enabledMark?: number; //有效标志
  sortCode?: number; //排序码
  description?: string; //备注
  hasChildren: boolean; 
  isLeaf: boolean; 
  children?: any; 
  isDeleted: boolean; 
  deleterId?: string; 
  deletionTime?: string; 
  lastModificationTime?: string; 
  lastModifierId?: string; 
  creationTime: string; 
  creatorId?: string; 
  id: string; 
};
