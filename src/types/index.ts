import { HttpRequest } from "@cr/types";
import { IEnums } from "./enums";
import { Message } from "ant-design-vue/types/message";
import { ModalConfirm, ModalOptions } from "ant-design-vue/types/modal";
import { IDictionaryConstants } from "./dictionarys";
import { ICommonConstants } from "./consts";

import {
  SaveFileOptions,
  ReadFileOptions,
  TablePrintConfig,
  ReadFileParams
} from "vxe-table";
/**
 * 定义VUE模块基类方法
 */
declare module "vue/types/vue" {
  interface Vue {
    /**
     * VXE
     */
    $VxeTable: {
      saveFile(options?: SaveFileOptions): Promise<any>;
      readFile(options?: ReadFileOptions): Promise<ReadFileParams>;
      print(options: TablePrintConfig): any;
    };
    /**
     * HTTP请求API封装
     */
    $api: HttpRequest;
    /**
     * 枚举数据
     */
    $enums: IEnums;
    /**
     * 字典常量
     */
    $dictconsts: IDictionaryConstants;

    /**
     * 系统常量
     */
    $consts: ICommonConstants;

    /**
     * 消息提示封装调用
     */
    $message: Message;

    /**
     *  弹出普通信息提示
     */
    $info: (modalOptios: ModalOptions) => ModalConfirm;

    /**
     * 弹出完成提示框
     */
    $success: (modalOptios: ModalOptions) => ModalConfirm;

    /**
     * 弹出错误提示框
     */
    $error: (modalOptios: ModalOptions) => ModalConfirm;

    /**
     * 弹出警告提示框
     */
    $warning: (modalOptios: ModalOptions) => ModalConfirm;

    /**
     * 弹出确认提示框
     */
    $confirm: (modalOptios: ModalOptions) => ModalConfirm;
    /**
     * 获取字典列表数据
     * @param key
     */
    $dictionary(key: string): any[];
    /**
     * 获取字典名称
     * @param key 字典键名称
     * @param value 字典值
     */
    $dictionaryName(key: string, value: string | number): string;

    /**
     *  获取字典下拉列表
     * @param key 字典键名称
     * @param valueType 值类型（字符串、数字）
     */
    $dictionaryOptions(key: string, valueType?: "string" | "number"): any[];

    /**
     * 获取枚举显示名称
     * @param key 枚举键名或枚举对象
     * @param value 枚举值
     * @param flag 是否为多选枚举（可选 ）
     */
    $enumName(
      key: string | Object,
      value: number | Number | string,
      flags?: boolean
    ): string | string[];
    /**
     *  获取多选枚举选择项值列表
     * @param key
     * @param value
     */
    $enumValuesForFlags(
      key: string | Object,
      value: number | Number | string
    ): Array<number | Number>;

    /**
     * 获取枚举选项数据
     * @param key 枚举键名或枚举对象
     */
    $enumOptions(key: string | Object): any[];

    /**
     * 获取地区名称
     * @param code 地区编码或ID
     * @param nullText 为空时显示文本
     */
    $areaName(code: string, nullText?: string): string;

    /**
     * 根据机构ID获取机构名称
     * @param id 机构ID
     * @param nullText 为空时显示文本
     */
    $organizeName(id: string, nullText?: string): string;

    /**
     * 根据用户ID获取用户显示名
     * @param id 用户ID
     * @param nullText 为空时显示文本
     */
    $userName(id: string, nullText?: string): string;

    /**
     * 打开选项卡
     * @param url
     * @param title
     */
    $openTabItem(url: string, title: string): void;

    /**
     *
     * @param url 关闭选项卡
     * @param title
     */
    $closeAllTabs(url: string, title: string): void;

    /**
     *  初始化地区信息数据
     */
    $initAreas(): Promise<boolean>;

    /**
     * 初始化厂站信息数据
     */
    $initSites(): Promise<boolean>;

    /**
     * 初始化字典数据
     */
    $initDictionarys(): Promise<boolean>;

    /**
     * 初始化组织机构数据
     */
    $initOrganizes(): Promise<boolean>;

    /**
     * 初始化用户数据
     */
    $initAllUsers(): Promise<boolean>;
  }
}
