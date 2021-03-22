/*
 * @Description: 
 * @Autor: 胡涛
 * @Date: 2021-02-18 15:37:15
 * @LastEditors: 胡涛
 * @LastEditTime: 2021-03-11 18:37:25
 */
import Antdv from "ant-design-vue";

import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

import CrDatePicker from "@/components/CR/DatePicker/Index.vue";
import CrDateTimePicker from "@/components/CR/DateTimePicker/Index.vue";

import {
  CrAreaTreeSelect,
  CrAreaTree,
  CrAreaSiteTree,
  CrOrganizeTree,
  CrOrganizeTreeSelect,
  CrUserTreeSelect,
  CrDictionarySelect,
  CrEnumSelect,
  CrOrganizeCascader,
  CrUserCascader,
  CrUploadList,
  CrUploadAvatar,
  CrModal,
  CrIcon,
  CrIconPicker,
  CrColorPicker,
  CrDictionaryEditor,
  PageHeaderWrapper,
  TreeLayoutPageWrapper,
  SearchViewBar,
  TableActionBar,
  AdvancedSearchPanel
} from "@cr/components";

/**
 *
 * @param Vue
 */
const installVxeTable = function(Vue: any) {
  Vue.use(VXETable);
  Vue.prototype.$VXETable = {
    print: VXETable.print,
    saveFile: VXETable.saveFile,
    readFile: VXETable.readFile,
    modal: VXETable.modal
  };
};

export default {
  /**
   *
   * @param Vue
   * @param options
   */
  install(Vue: any, options: any): void {
    Vue.use(Antdv);
    installVxeTable(Vue);
    Vue.component("PageHeaderWrapper", PageHeaderWrapper);
    Vue.component("TreeLayoutPageWrapper", TreeLayoutPageWrapper);
    Vue.component("search-view-bar", SearchViewBar);
    Vue.component("table-action-bar", TableActionBar);
    Vue.component("advanced-search-panel", AdvancedSearchPanel);
    Vue.component(CrDatePicker.name, CrDatePicker);
    Vue.component(CrDateTimePicker.name, CrDateTimePicker);

    Vue.component("CrAreaTreeSelect", CrAreaTreeSelect);
    Vue.component("CrAreaTree", CrAreaTree);
    Vue.component("CrAreaSiteTree", CrAreaSiteTree);
    Vue.component("CrOrganizeTree", CrOrganizeTree);
    Vue.component("CrOrganizeTreeSelect", CrOrganizeTreeSelect);
    Vue.component("CrUserTreeSelect", CrUserTreeSelect);
    Vue.component("CrDictionarySelect", CrDictionarySelect);
    Vue.component("CrEnumSelect", CrEnumSelect);
    Vue.component("CrOrganizeCascader", CrOrganizeCascader);
    Vue.component("CrUserCascader", CrUserCascader);
    Vue.component("CrUploadList", CrUploadList);
    Vue.component("CrUploadAvatar", CrUploadAvatar);
    Vue.component("CrModal", CrModal);
    Vue.component("CrIcon", CrIcon);
    Vue.component("CrIconPicker", CrIconPicker);
    Vue.component("CrColorPicker", CrColorPicker);
    Vue.component("CrDictionaryEditor", CrDictionaryEditor);
  }
};
