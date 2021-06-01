/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 14:43:46
 * 接口地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */

/**
 * 添加或更新的DTO
 */
export type CreateOrUpdateSupplierDto = {
  supplierNo?: string; //供应商编号
  supplierName?: string; //供应商名称
  address?: string; //供应商地址
  tel?: string; //供应商电话
  principal?: string; //联系人
  phone?: string; //联系电话
  category: string; //供应商类别
  email?: string; //邮件
  fax?: string; //传真
  isEnabled: boolean; //是否启用
  bindUser?: string; //绑定用户
  enabledMark?: number; //有效标志
  sortCode?: number; //排序码
  description?: string; //备注
};
