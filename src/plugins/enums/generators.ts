import { IGeneratorEnums } from "@/types/enums";

/**
 * 自动生成枚举项定义
 */
const generatorEnums: IGeneratorEnums = {
  /**
   * IdentityClaimValueType
   */
  IdentityClaimValueType: {
    String: { label: "String", value: 0 },
    Int: { label: "Int", value: 1 },
    Boolean: { label: "Boolean", value: 2 },
    DateTime: { label: "DateTime", value: 3 },
  },
  /**
   * NodeType
   */
  NodeType: {
    Node: { label: "节点", value: 0 },
    Site: { label: "站点", value: 1 },
  },
  /**
   * 营业区域
   */
  OrganizeNature: {
    BusinessArea: { label: "营业区域", value: 0 },
    NoBusinessArea: { label: "非营业区域", value: 1 },
  },
  /**
   * 组织类型
   */
  OrganizeType: {
    Company: { label: "公司", value: 0 },
    Department: { label: "部门", value: 1 },
  },
  /**
   * 组织用户类型
   */
  OrganizeUserType: {
    Organize: { label: "组织", value: 0 },
    User: { label: "用户", value: 1 },
  },
  /**
   * JobStatus
   */
  JobStatus: {
    Running: { label: "执行中", value: 0 },
    Completed: { label: "已完成", value: 1 },
    Stopped: { label: "已停止", value: 2 },
    SystemStopped: { label: "系统停止", value: 3 },
    Deleted: { label: "已删除", value: 4 },
  },
  /**
   * MsgStatus
   */
  MsgStatus: {
    UnRead: { label: "未读", value: 0 },
    Read: { label: "已读", value: 1 },
  },
  /**
   * SendStatus
   */
  SendStatus: {
    UnSend: { label: "未发送", value: 0 },
    Sended: { label: "已发送", value: 1 },
  },
};

export default generatorEnums;
