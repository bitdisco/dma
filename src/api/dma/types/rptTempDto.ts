/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-17 22:35:30
 * 接口地址：http://localhost:44333/swagger/v1/swagger.json
 */

/**
 * 领域模型对应的DTO
 */
export type RptTempDto = {
  createUserId?: string; //创建用户主键
  createUserName?: string; //创建用户
  description?: string; //报表介绍
  enCode?: string; //报表编号
  fullName?: string; //模板名称
  modifyUserId?: string; //修改用户主键
  modifyUserName?: string; //修改用户
  paramJson?: string; //报表参数Json
  tempCategory?: string; //报表分类
  tempType?: string; //图表类型
  isDeleted: boolean; 
  deleterId?: string; 
  deletionTime?: string; 
  lastModificationTime?: string; 
  lastModifierId?: string; 
  creationTime: string; 
  creatorId?: string; 
  id: string; 
};
