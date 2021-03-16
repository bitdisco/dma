import { oidcSettings } from "./request";
/**
 * 基础配置
 */
export const defaultBaseConfig = {
  moduleCode: "Module.Platform",
  gateway: "http://139.224.255.200:3011",
  oidc: oidcSettings,
};
