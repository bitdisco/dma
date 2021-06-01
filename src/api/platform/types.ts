/**
 * 后端接口DTO相关类型定文件 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-1-18 16:20:55
 * 接口地址：http://36.133.33.128:4000/swagger/v1/swagger.json
 */

/**
 *
 */
export interface ControllerInterfaceApiDescriptionModel {
  type?: string;
}

/**
 *
 */
export interface ActionApiDescriptionModel {
  uniqueName?: string;
  name?: string;
  httpMethod?: string;
  url?: string;
  supportedVersions?: any;
  parametersOnMethod?: any;
  parameters?: any;
  returnValue: any;
}

/**
 *
 */
export interface ApplicationApiDescriptionModel {
  modules?: any;
  types?: any;
}

/**
 *
 */
export interface RemoteServiceErrorInfo {
  code?: string;
  message?: string;
  details?: string;
  validationErrors?: any;
}

/**
 *
 */
export interface NameValue {
  name?: string;
  value?: string;
}

/**
 *
 */
export interface ApplicationLocalizationConfigurationDto {
  values?: any;
  languages?: any;
  currentCulture: any;
  defaultResourceName?: string;
  languagesMap?: any;
  languageFilesMap?: any;
}

/**
 *
 */
export interface ApplicationAuthConfigurationDto {
  policies?: any;
  grantedPolicies?: any;
}

/**
 *
 */
export interface ApplicationSettingConfigurationDto {
  values?: any;
}

/**
 *
 */
export interface ApplicationFeatureConfigurationDto {
  values?: any;
}

/**
 *
 */
export interface ModuleExtensionDto {
  entities?: any;
  configuration?: any;
}

/**
 *
 */
export interface ApplicationConfigurationDto {
  localization: any;
  auth: any;
  setting: any;
  currentUser: any;
  features: any;
  multiTenancy: any;
  currentTenant: any;
  timing: any;
  clock: any;
  objectExtensions: any;
}

/**
 *
 */
export interface ApiSecret {
  apiResourceId: string;
  type?: string;
  value?: string;
  description?: string;
  expiration?: string;
}

/**
 *
 */
export interface ApiScopeClaim {
  apiResourceId: string;
  name?: string;
  type?: string;
}

/**
 *
 */
export interface ApiScope {
  apiResourceId: string;
  name?: string;
  displayName?: string;
  description?: string;
  required: boolean;
  emphasize: boolean;
  showInDiscoveryDocument: boolean;
  userClaims?: any;
}

/**
 *
 */
export interface PagedResultDto<T> {
  totalCount: number;
  items?: T[];
}

/**
 *
 */
export interface undefined {
  items?: any;
}

/**
 *
 */
export interface AppUserDto {
  tenantId?: string;
  userName?: string;
  name?: string;
  surname?: string;
  email?: string; // 邮箱
  emailConfirmed: boolean;
  phoneNumber?: string; // 手机号码
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnabled: boolean;
  lockoutEnd?: string;
  concurrencyStamp?: string;
  py?: string; // 用户名首字母
  idCard?: string; // 身份证号
  organizeId?: string; // 组织ID
  organizeName?: string; // 组织名
  organizeCode?: string; // 组织代码
  avatar?: string; // 头像
  roleNames?: any; // 角色名
  areaCode?: string; // 所属区域
  isDeleted: boolean;
  deleterId?: string;
  deletionTime?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
  creationTime: string;
  creatorId?: string;
  id: string;
}

/**
 *
 */
export interface IdentityClaimTypeDto {
  name?: string;
  required: boolean;
  isStatic: boolean;
  regex?: string;
  regexDescription?: string;
  description?: string;
  valueType: any;
  id: string;
}

/**
 *
 */
export interface ClientScope {
  clientId: string;
  scope?: string;
}

/**
 *
 */
export interface ClientSecret {
  clientId: string;
  type?: string;
  value?: string;
  description?: string;
  expiration?: string;
}

/**
 *
 */
export interface ClientGrantType {
  clientId: string;
  grantType?: string;
}

/**
 *
 */
export interface DictionaryItemDetailDto {
  parentId?: string;
  itemId: string;
  itemName?: string;
  itemValue?: string;
  enabled: boolean;
  displayOrder: number;
  description?: string;
  extraProperties?: any;
  id: string;
}

/**
 *
 */
export interface IdentityResourceDto {
  name?: string;
  displayName?: string;
  description?: string;
  enabled: boolean;
  required: boolean;
  emphasize: boolean;
  showInDiscoveryDocument: boolean;
  userClaims?: any;
  properties?: any;
  isDeleted: boolean;
  deleterId?: string;
  deletionTime?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
  creationTime: string;
  creatorId?: string;
  id: string;
}

/**
 *
 */
export interface CreateUpdateBaseNewsDto {
  title?: string; // 标题
  content?: string; // 内容
  picUrl?: string; // 图片URL
  type: number; // 类别
  author?: string; // 作者
  enabled: boolean; // 是否启用
  moduleCode?: string; // 系统模块名称
}

/**
 *
 */
export interface BaseNewsDto {
  title?: string; // 标题
  content?: string; // 内容
  picUrl?: string; // 图片URL
  type: number; // 类别
  author?: string; // 作者
  enabled: boolean; // 是否启用
  moduleCode?: string; // 系统模块名称
  isDeleted: boolean;
  deleterId?: string;
  deletionTime?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
  creationTime: string;
  creatorId?: string;
  id: string;
}

/**
 *
 */
export interface GetStatDto {
  beginTime: string;
  endTime: string;
}

/**
 *
 */
export interface ChartDataDto {
  name?: string;
  xData?: any;
  yData?: any;
  y2Data?: any;
}

/**
 *
 */
export interface OrganizeDto {
  name?: string;
  parentId?: string;
  managerId?: string;
  encode?: string;
  nature: any;
  type: any;
  remark?: string;
  areaCode?: string; // 所属区域
  areaName?: string; // 所属区域名称
  isDeleted: boolean;
  deleterId?: string;
  deletionTime?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
  creationTime: string;
  creatorId?: string;
  id: string;
}

/**
 *
 */
export interface UpdateTaskStatusInput {
  name?: string;
  group?: string;
  id: string;
  status: any;
}

/**
 *
 */
export interface RoleDto {
  name?: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp?: string;
  id: string;
  extraProperties?: any;
}

/**
 *
 */
export interface IdentityRoleDto {
  name?: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp?: string;
  id: string;
  extraProperties?: any;
}

/**
 *
 */
export interface SettingValue {
  name?: string;
  value?: string;
}

/**
 * 权限移动信息
 */
export interface MoveSystemPermissionDto {
  moveIds?: any; // 需要移动的权限id
  destId: string; // 目标权限id
}
