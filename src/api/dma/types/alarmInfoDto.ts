/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-24 14:21:04
 * 接口地址：http://localhost:44333/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type AlarmInfoDto = {
  alarmId?: string; //告警主键
  objectId?: string; //告警对象主键
  ubjectName?: string; //告警对象名称
  objectCode?: string; //告警对象编码
  triggerTime?: string; //触发时间
  dataValue?: string; //触发数据
  alarmValue?: string; //告警数据
  alarmType?: string; //告警类型（DMA分区、监测点）
  alarmPrompt?: string; //提示简拼
  alarmMessage?: string; //告警消息
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
