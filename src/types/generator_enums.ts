import {IEnumItem} from "@cr/types";

/**
 * 自动生成枚举定义
 */
export interface IGeneratorEnums {
  /**
   * IdentityClaimValueType
   */
  IdentityClaimValueType: {
    String: IEnumItem;
    Int: IEnumItem;
    Boolean: IEnumItem;
    DateTime: IEnumItem;
  };

  /**
   * NodeType
   */
  NodeType: {
    Node: IEnumItem;
    Site: IEnumItem;
  };

  /**
   * 营业区域
   */
  OrganizeNature: {
    BusinessArea: IEnumItem;
    NoBusinessArea: IEnumItem;
  };

  /**
   * 组织类型
   */
  OrganizeType: {
    Company: IEnumItem;
    Department: IEnumItem;
  };

  /**
   * 组织用户类型
   */
  OrganizeUserType: {
    Organize: IEnumItem;
    User: IEnumItem;
  };

  /**
   * JobStatus
   */
  JobStatus: {
    Running: IEnumItem;
    Completed: IEnumItem;
    Stopped: IEnumItem;
    SystemStopped: IEnumItem;
    Deleted: IEnumItem;
  };

  /**
   * MsgStatus
   */
  MsgStatus: {
    UnRead: IEnumItem;
    Read: IEnumItem;
  };

  /**
   * SendStatus
   */
  SendStatus: {
    UnSend: IEnumItem;
    Sended: IEnumItem;
  };

}
