/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-17 22:35:30
 * 接口地址：http://localhost:44333/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type MaterialsDto = {
  categoryId?: string; //材料类别Id
  supplierId?: string; //供应商Id
  unitId: number; //材料单位
  name?: string; //材料名称
  inputPrice: number; //进货单价
  spec?: string; //规格型号（SCL-716）
  accuracyLevel: number; //精确度等级（0.5）
  nominalDiameter?: string; //公称直径（DN300）
  soundPath: number; //声路（4）
  bodyType?: string; //表体类型（管段式、插入式）
  pressureRating: number; //承压等级（MPa）
  protocol?: string; //通讯协议（RS-485）
  communicationType?: string; //通讯类型（4G、NB、LOAR）
  supply?: string; //供电方式（太阳能 市电 电池）
  transducer?: string; //换能器形式（一体式、分体式）
  qs: number; //始动流量 (m³/h)
  qmin: number; //最小流量(m³/h)
  qmax: number; //最大流量(m³/h)
  qt: number; //分界流量(m³/h)
  qn: number; //常用流量(m³/h)
  bodyLength: number; //表体长度
  enabled: boolean; //是否启用
  code?: string; //条码或二维码
  enabledMark?: number; //有效标志
  sortCode?: number; //排序码
  description?: string; //备注
  id: string; 
};
