/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-22 17:16:32
 * 接口地址：http://localhost:44333/swagger/v1/swagger.json
 */

/**
 * 
 */
export type AuditLogDto = {
  id: string; 
  httpStatusCode?: number; 
  comments?: string; 
  exceptions?: string; 
  url?: string; 
  httpMethod?: string; 
  browserInfo?: string; 
  correlationId?: string; 
  clientId?: string; 
  clientName?: string; 
  clientIpAddress?: string; 
  executionDuration: number; 
  executionTime: string; 
  impersonatorTenantId?: string; 
  impersonatorUserId?: string; 
  tenantName?: string; 
  tenantId?: string; 
  userName?: string; 
  userId?: string; 
  applicationName?: string; 
  entityChanges?: any; 
  actions?: any; 
};
