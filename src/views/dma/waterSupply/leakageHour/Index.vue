<!--
 * @Description: 
 * @Autor: 张小凡
 * @Date: 2021-04-09 10:31:07
 * @LastEditors: 张小凡
 * @LastEditTime: 2021-06-01 17:28:49
-->
<template>
  <tree-layout-page-wrapper :treeWidth="260">
    <template slot="tree">
      <monitor-tree :checkable="true" @getTreeNode="getTreeNode"/>
    </template>
    <div class="compact-page-wrapper">
      <advanced-search-panel
        :showInput="false"
        v-model="searchModel"
        :fields="searchFields"
        :dropdownWidth="350"
        :layoutColumn="1"
        :inputStyle="{ placeholder: '请输入关键词', style: { width: '150px' } }"
        @search="onSearch"
      >
        <template slot="actions">
          <a-button-group>
            <a-button @click="queryList" icon="sync">刷新</a-button>
            <a-button @click="createTab" icon="ordered-list">生成报表</a-button>
            <a-button icon="bar-chart">生成图表</a-button>
          </a-button-group>
        </template>
      </advanced-search-panel>
      <div class="compact-page-table">
        <vxe-table
          id="vxeTable"
          :data="dataSource"
          :loading="loading"
          highlight-current-row
          highlight-hover-row
          @cell-click="onTableCellClick"
          border
          height="auto"
          :seq-config="{ startIndex: getSkipCount }"
          :custom-config="{ storage: true }"
        >
          <vxe-table-column type="seq" width="50" align="center"></vxe-table-column>
          <vxe-table-column v-bind="col" v-for="(col, index) in columns" :key="index"></vxe-table-column>
        </vxe-table>
      </div>
      <div class="table-pagination">
        <a-pagination
          v-bind="pagination"
          @showSizeChange="onShowSizeChange"
          @change="onPageChanged"
        ></a-pagination>
      </div>
    </div>
  </tree-layout-page-wrapper>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { SortedInfo, ToolbarActionItem, ListPageVxe } from "@cr/types";
import { PaginationConfig } from "ant-design-vue/types/list/list";
import api from "@/api/dma/generatorApis/armRealData";
import AreaApi from "@/api/dma/generatorApis/area";
import MonitorTree from "@/components/Tree/MonitorTree.vue"
import { ArmRealDataDto } from "@/api/dma/types";
import moment from "moment";

@Component<RealDataList>({
  name: "RealDataList",
  components:{MonitorTree}
})
export default class RealDataList extends ListPageVxe<ArmRealDataDto, string> {
  //日期选择器
  private disabledDate = (current:any)=>{
    return current > moment().subtract(0, 'day');
  }
  private defaultValue:any = moment(new Date().toLocaleDateString(), 'YYYY-MM-DD');

  //#region 树控件相关
  private expandedKeys: string[] = [];
  private autoExpandParent: boolean = true;
  private selectedKeys: Array<string> = [];
  private replaceFields: any = {
    children: "children",
    key: "id",
    title: "areaName",
  };
  private treeData: any[] = [];

  private queryAreaTree() {
    AreaApi.getAreaTree({}).then((res) => {
      this.treeData = res;
      this.expandedKeys.push(res[0].id);
    });
  }
  private onExpand(expandedKeys: any) {
    //console.log("onExpand " + expandedKeys, expandedKeys);
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }
  private onSelect(selectedKeys: any, info: any) {
    //console.log("onSelect " + selectedKeys, info);
    this.selectedKeys = selectedKeys;
    this.searchModel.AreaId = selectedKeys[0];
    this.queryList();
  }
  //#endregion
  //#region 工具栏按钮属性

  private toolbar_actions: Array<ToolbarActionItem> = [
    {
      title: "刷新",
      props: { icon: "sync" },
      click: () => {
        this.queryAreaTree();
        this.queryList();
      },
    },
  ];
  //#endregion
  //#region 组件创建时执行
  created() {
    this.columns = [
      {
        title: "挂接表号",
        field: "addressCode",
        width: 120,
      },
      {
        title: "监测点名称",
        field: "meterName",
        width: 200,
      },
      {
        title: "监测点编码",
        field: "meterCode",
        width: 100,
      },
      {
        title: "瞬时流量",
        field: "realValue",
        width: 80,
      },
      {
        title: "正向累计",
        field: "forValue",
        width: 100,
      },
      {
        title: "反向累计",
        field: "revValue",
        width: 100,
      },
      {
        title: "管道压力",
        field: "pressValue",
        width: 80,
      },
      {
        title: "电池电压",
        field: "celVal",
        width: 80,
      },
      {
        title: "管道压力",
        field: "pressValue",
        width: 80,
      },
      {
        title: "创建时间",
        field: "createTime",
        width: 145,
      },
    ];
    this.getPagination.pageSize = 10;
    this.searchFields = [
      {
        name: "countDate",
        label: "统计日期",
        input: "a-date-picker",
        props: {
          format: "YYYY-MM-DD",
          showTime: false,
          valueFormat: "YYYY-MM-DD",
          defaultValue: (this as any).defaultValue,
          disabledDate: (this as any).disabledDate
        },
      }
    ];
  }
  //#endregion
  //#region 组件挂载成功后执行

  mounted() {
    this.queryAreaTree();
  }
  //#endregion
  //#region 查询方法

  private onSearch() {
    let selectDate = "";
    let today = moment().format("YYYY-MM-DD");
    this.searchModel.countDate? selectDate = this.searchModel.countDate : selectDate = today;
    this.searchModel.StartTime = selectDate+' 00:00';
    this.searchModel.EndTime = selectDate+' 23:59';
    this.getPagination.current = 1;
    //处理其它查询条件逻辑。。。。
    this.queryList();
  }
  //#endregion
  //#region 表格控件相关

  private createTab(){
    if(!this.searchModel.AreaIds){
      this.$message.error("请先选择分区~");
    }else{
      this.queryList();
    }
  }

  /**
   * 分页查询列表
   */
  private queryList() {
    let page = this.getPagination;
    /**
     * 查询条件
     */
    let queryModel = Object.assign(
      {
        MaxResultCount: this.getMaxResultCount,
        SkipCount: this.getSkipCount,
      },
      this.searchModel
    );

    api.getQueryList(queryModel).then((res) => {
      this.loading = false;
      this.dataSource = res.items;
      this.getPagination.total = res.totalCount;
    });
    this.currentRow = null;
    this.loading = true;
  }

  /*树点击事件*/
  private getTreeNode(val:any){
    console.log("点击树信息",val);
    this.searchModel.AreaIds = val.id;
    this.queryList();
  }

  /**
   * 表格事件
   */
  private onTableCellClick({ row }: any) {
    this.currentRow = row;
  }

  /**
   * 表格分页事件
   */
  private onPageChanged(current: number) {
    this.getPagination.current = current;
    this.pagination = this.getPagination;
    this.queryList();
  }

  /**
   * 分页组件改变分页大小事件
   */
  private onShowSizeChange(current: number, size: number) {
    this.getPagination.current = current;
    this.getPagination.pageSize = size;
    this.pagination = this.getPagination;
    this.queryList();
  }

  /** 批量删除 */
  private deleteSelectedItems() {}

  /**
   * 表格选择行事件
   * @param selectedRowKeys
   */
  private onTableSelectChange(selectedRowKeys: Array<any>) {
    this.selectedRowKeys = selectedRowKeys;
    this.columns = [{ field: "", title: "", width: "", align: "center" }];
  }
  //#endregion
}
</script>

<style scoped>
.vxetable {
  height: calc(100vh - 100px);
}
</style>