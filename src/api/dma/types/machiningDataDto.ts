/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-24 14:21:04
 * 接口地址：http://localhost:44333/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type MachiningDataDto = {
  areaName?: string; //分区名称
  areaGrade?: number; //分区级别
  areaCode?: string; //分区编号
  meterName?: string; //监测点名称
  meterCode?: string; //监测点编码
  meterType?: string; //监测点类型（考核表 流量计）
  meterNumber?: string; //监测点编号
  diameter?: string; //管线直径
  material?: string; //管线材质
  addressCode?: string; //地址编码
  createTime?: string; //采集时间
  realValue?: number; //瞬时流量
  forValue?: number; //正向累计
  revValue?: number; //反向累计
  warnStatus?: string; //告警状态
  pressValue?: number; //管道压力
  celVal?: number; //电池电压
  netVal?: number; //网络信号
  inserTime?: string; //插入时间
  machiningCount?: number; //清洗数据量
  source?: string; //来源
  status?: string; //状态 0正常1故障
  statusHex?: string; //二进制状态字
  statusHexMark?: string; //状态字备注
  fuelLevel?: string; //液位
  ph?: number; //PH值  6.5-8.5
  ppm?: number; //余氯  mg/L  0-0.2
  dimness?: number; //浊度  单位 NTU  0-1
  temperature?: number; //温度 单位  ℃    0-10000
  isDeleted: boolean; 
  deleterId?: string; 
  deletionTime?: string; 
  lastModificationTime?: string; 
  lastModifierId?: string; 
  creationTime: string; 
  creatorId?: string; 
  id: string; 
};
