/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 17:55:33
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type MeterDto = {
  materialsId?: string; //材料类Id
  meterNumber?: string; //监测点编号
  meterCode?: string; //监测点编码
  meterType?: string; //监测点类型（考核表 流量计）
  meterName?: string; //监测点名称
  addressCode?: string; //地址编码
  deviceDriver?: string; //设备驱动类型
  diameter?: string; //管线直径
  material?: string; //管线材质
  installAddress?: string; //安装地址
  installImage?: string; //安装图片（Guid，Guid）
  installDate?: string; //安装日期
  readTime?: number; //采集间隔
  reportTime?: number; //上报间隔
  baseForValue?: number; //正向底数
  baseRevValue?: number; //反向底数
  pressMinLimit?: number; //压力下限
  pressMaxLimit?: number; //压力上限
  flowMinLimit?: number; //流量下限
  flowMaxLimit?: number; //流量上限
  voltageMinLimit?: number; //电压下限
  sim?: string; //SIM卡号
  isLink?: number; //是否连接
  linkAddress?: string; //连接地址
  linkTime?: string; //连接时间
  refreshTime?: string; //刷新时间
  xy?: string; //XY坐标
  infoPlacement?: string; //扯旗位置
  isUpdated?: number; //是否更新
  ip?: string; //IP地址
  port?: string; //端口
  pho?: string; //DTU照片?
  dtuSN?: string; //DTU序列号
  longitude?: number; //经度
  latitude?: number; //纬度
  solarCode?: string; //太阳能杆编号
  solarFactory?: string; //太阳能杆厂家
  solarSupervisor?: string; //太阳能杆责任人
  solarPhone?: string; //太阳能杆责任人联系方式
  solarCoordinate?: string; //太阳能杆坐标
  centrId?: string; //集中器编号
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
