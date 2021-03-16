import { IEnums } from "@/types/enums";
import generatorEnums from "./generators";
/**
 * 系统需要使用的枚举定义
 */
const enums: IEnums = {
  /**
   * 自动生成的枚举
   */
  ...generatorEnums,
  /**
   * HTTP请求枚举类
   */
  HTTPMETHOD: {
    GET: { label: "GET", value: 1 },
    POST: { label: "POST", value: 2 },
    PUT: { label: "PUT", value: 3 },
    DELETE: { label: "DELETE", value: 4 },
    OPTIONS: { label: "OPTIONS", value: 5 },
    PATCH: { label: "PATCH", value: 6 },
  },
  /**
   *填报类型
   */
  REPORTTYPE: {
    Year: { label: "年报", value: 1 },
    Quarter: { label: "季报", value: 2 },
    Month: { label: "月报", value: 3 },
    Week: { label: "周报", value: 4 },
    Day: { label: "日报", value: 5 },
    Onetimes: { label: "只能填报一次", value: 6 },
    Unlimited: { label: "不限填报次数", value: 7 },
  },
};

export default enums;
