/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 14:43:46
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 添加或更新的DTO
 */
export type CreateOrUpdateAlarmDto = {
  jobId?: number; //计划任务主键
  alarmType?: string; //告警类型（DMA分区、监测点）
  alarmName?: string; //告警名称
  alarmPrompt?: string; //提示简拼
  alarmLevel?: number; //告警级别
  alarmColor?: string; //告警颜色
  interval?: string; //执行间隔
  isExec?: number; //是否立即执行
  lastDate?: string; //执行时间
  nextDate?: string; //下次执行时间
  defaultValue?: number; //默认值
  upperValue?: number; //上限值
  lowerValue?: number; //下限值
  what?: string; //执行语句
  enabledMark?: number; //有效标志
  sortCode?: number; //排序码
  description?: string; //备注
};
