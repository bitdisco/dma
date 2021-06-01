/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 14:43:46
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 添加或更新的DTO
 */
export type CreateOrUpdateRptTempDto = {
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
};
