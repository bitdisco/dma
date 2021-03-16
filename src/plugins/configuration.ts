import { AppModule, UserModule, DataModule } from "@/store";
import config from "@/api/platform/config";
import {
  IPlatformConfig,
  IAreaItem,
  IDictionaryData,
  IOrganizeItem,
  IProduceSiteItem,
} from "@cr/types";

/**
 * 获取当前系统对应的模块编码
 */
const getModuleCode = async function() {
  let moduleCode = AppModule.baseConfig.moduleCode;
  while (!moduleCode) {
    moduleCode = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const code = AppModule.baseConfig.moduleCode;
        resolve(code);
      }, 50);
    });
  }
  return moduleCode;
};

/**
 * 初始化配置
 */
export const initAppConfiguration = async function() {
  const arrs = UserModule.getPermissionCode;
  if (arrs && arrs.length > 0) {
    return true;
  }
  // 获取模块编码
  const moduleCode = await getModuleCode();
  // 加载服务器配置
  try {
    const pConfig: IPlatformConfig = await config.getConfiguration(moduleCode);
    if (pConfig && pConfig.grantedPolicies) {
      await UserModule.updateCurrentUser(pConfig.currentUser);
      await UserModule.setUserPermissionCode(pConfig.grantedPolicies);
      await AppModule.updateConfiguration(pConfig);
    }
    return true;
  } catch (err) {
    console.log("加载服务器配置错误：", err);
    return false;
  }
};

/**
 *  初始化地区信息数据
 */
export const initAreas = async function(): Promise<boolean> {
  const list = DataModule.allAreaList;
  if (list && list.length > 0) {
    return true;
  }
  // 加载全部地区列表
  try {
    const areas: IAreaItem[] = await config.getAllAreaList();
    if (areas) {
      await DataModule.updateAllAreaList(areas);
    }
    return true;
    // console.log("加载全部地区列表 --> areas", areas);
  } catch (err) {
    console.log("加载全部地区列表错误：", err);
    return false;
  }
};

/**
 *  初始化厂站信息数据
 */
export const initSites = async function(): Promise<boolean> {
  const list = DataModule.allSiteList;
  if (list && list.length > 0) {
    return true;
  }
  // 加载全部厂站列表
  try {
    const sites: IProduceSiteItem[] = await config.getAllSiteList();
    if (sites) {
      await DataModule.updateAllSiteList(sites);
    }
    return true;
    // console.log("加载全部地区列表 --> areas", areas);
  } catch (err) {
    console.log("加载全部地区列表错误：", err);
    return false;
  }
};

/**
 * 初始化字典数据
 */
export const initDictionarys = async function(): Promise<boolean> {
  const list = DataModule.allDictionaryList;
  if (list && list.length > 0) {
    return true;
  }
  // 加载字典数据
  try {
    const dictionarys: IDictionaryData[] = await config.getAllDctionarys();
    if (dictionarys) {
      await DataModule.updateAllDictionaryList(dictionarys);
    }
    return true;
    // console.log("加载字典数据 --> dictionarys", dictionarys);
  } catch (err) {
    console.log("加载字典数据错误：", err);
    return false;
  }
};

/**
 * 初始化组织机构数据
 */
export const initOrganizes = async function(): Promise<boolean> {
  const orgainizes = DataModule.allOrganizeList;
  if (orgainizes && orgainizes.length > 0) {
    return true;
  }
  // 加载全部机构列表
  try {
    const allorgainizes: IOrganizeItem[] = await config.getAllOrganizes();
    if (allorgainizes) {
      await DataModule.updateAllOrganizeList(allorgainizes);
    }
    // console.log("加载全部机构列表 --> allorgainizes", allorgainizes);
  } catch (err) {
    console.log("加载全部机构列表错误：", err);
  }

  // 加载用户机构列表
  try {
    const ownsOrginzes = await config.getOwnsOrginzes();
    if (ownsOrginzes) {
      await DataModule.updateOwnsOrganizeList(ownsOrginzes);
    }
    // console.log("加载用户机构列表 --> ownsOrginzes", ownsOrginzes);
  } catch (err) {
    console.log("加载用户机构列表错误：", err);
  }
  return true;
};

/**
 * 初始化用户数据
 */
export const initAllUsers = async function(): Promise<boolean> {
  const users = DataModule.allUserList;
  if (users && users.length > 0) {
    return true;
  }
  // 加载所有用户列表
  try {
    const allUsers = await config.getAllUsers({});
    await DataModule.updateAllUsers(allUsers);
    // console.log("加载所有用户列表 --> allUsers", allUsers);
    return true;
  } catch (err) {
    console.log("加载所有用户列表错误：", err);
    return false;
  }
};
