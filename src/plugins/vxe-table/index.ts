/*
 * @Description: 
 * @Autor: 朱海良
 * @Date: 2021-03-16 14:20:48
 * @LastEditors: 朱海良
 * @LastEditTime: 2021-06-11 10:25:58
 */
import { installRenders } from "./renders";
import { installXRenders } from "./rendersx";
import { installVxeTableRenders } from "@cr/utils/vxe-table/renders";
import { emptyRenders } from './empty'

export default {
  install(Vue: any) {
    installVxeTableRenders();
    installRenders();
    emptyRenders();
    installXRenders();
  }
};
