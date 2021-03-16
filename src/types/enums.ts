import {IGeneratorEnums} from "./generator_enums";
import {IEnumModule, IEnumItem} from "@cr/types";

export {IEnumItem, IEnumModule, IGeneratorEnums};

/**
 * 枚举定义
 */
export interface IEnums extends IGeneratorEnums {
  /**
   * HTTP请求方式
   */
  HTTPMETHOD: {
    GET: IEnumItem;
    POST: IEnumItem;
    PUT: IEnumItem;
    DELETE: IEnumItem;
    OPTIONS: IEnumItem;
    PATCH: IEnumItem;
  };

  /**
   * 填报方式
   */
  REPORTTYPE: {
    Year: IEnumItem;
    Quarter: IEnumItem;
    Month: IEnumItem;
    Week: IEnumItem;
    Day: IEnumItem;
    Onetimes: IEnumItem;
    Unlimited: IEnumItem;
  };
}
