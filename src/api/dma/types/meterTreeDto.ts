/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-22 17:16:32
 * 接口地址：http://localhost:44333/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type MeterTreeDto = {
  id: string; 
  area?: any; 
  areaMeterId?: string; //关联表主键
  obj?: string; //对象
  code?: string; //编码
  type?: string; //类型
  name?: string; //名称
  title?: string; //标题
  addressCode?: string; //地址编码
  description?: string; //备注
  addTime?: string; //创建时间
  children?: any; 
};
