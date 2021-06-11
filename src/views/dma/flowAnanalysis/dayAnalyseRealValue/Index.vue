<template>
  <tree-layout-page-wrapper :treeWidth="260">
    <template slot="tree">
      <monitor-tree @getTreeNode="getTreeNode"/>
    </template>
    <div class="compact-page-wrapper">
      <advanced-search-panel
        :showInput="false"
        v-model="searchModel"
        :fields="searchFields"
        :dropdownWidth="600"
        :layoutColumn="2"
        :inputStyle="{ placeholder: '请输入关键词', style: { width: '150px' } }"
        @search="onSearch"
      >
        <template slot="actions">
          <a-button-group>
            <a-button @click="querySearchDate('day')">今天</a-button>
            <a-button @click="querySearchDate('week')">近7天</a-button>
            <a-button @click="querySearchDate('month')">近1个月</a-button>
          </a-button-group>
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
import MachApi from "@/api/dma/generatorApis/machiningData";
import AreaApi from "@/api/dma/generatorApis/area";
import AddressTree from "@/components/Tree/AddressTree.vue"
import MonitorTree from "@/components/Tree/MonitorTree.vue"
import AreaTree from "@/components/Tree/AreaTree.vue"
import { ArmRealDataDto } from "@/api/dma/types";
import moment from "moment";

@Component<DayAnalyseRealValue>({
  name: "DayAnalyseRealValue",
  components:{AddressTree, AreaTree, MonitorTree}
})
export default class DayAnalyseRealValue extends ListPageVxe<ArmRealDataDto, string> {
  //#region 树控件相关
  private expandedKeys: string[] = [];
  private autoExpandParent: boolean = true;
  private selectedKeys: Array<string> = [];
  private replaceFields: any = {
    children: "children",
    key: "id",
    title: "areaName",
  };
  private treeData: Array<any> = [];

  //默认加载查询表单时间
  private querySearchDate(time:string) {
    const today = new Date();
    if(time === 'day'){
      this.searchModel.startTime = moment(today).format('YYYY-MM-DD');
      this.searchModel.endTime = moment(today).format('YYYY-MM-DD');
    }
    if(time === 'week'){
      this.searchModel.startTime = moment(today).format('YYYY-MM-DD');
      this.searchModel.endTime = moment(today).add(1, 'weeks').format('YYYY-MM-DD');
    }
    if(time === 'month'){
      this.searchModel.startTime = moment(today).format('YYYY-MM-DD');
      this.searchModel.endTime = moment(today).add(1, 'months').format('YYYY-MM-DD');
    }
    this.queryList();
  }

  private queryAreaTree() {
    AreaApi.getAreaTree({}).then((res) => {
      this.treeData = res;
      this.expandedKeys.push(res[0].id);
    });
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
    this.columns = [];
    this.getPagination.pageSize = 10;
    this.searchFields = [
      {
        name: "countDate",
        label: "开始时间",
        input: "a-date-picker",
        props: {
          format: "YYYY-MM-DD",
          showTime: false,
          valueFormat: "YYYY-MM-DD",
          defaultValue: (this as any).defaultValue,
          disabledDate: (this as any).disabledDate
        },
        events:{
          change:(data:any)=>{
            this.searchModel.startTime = data
          }
        },
      },
      {
        name: "countDate",
        label: "结束时间",
        input: "a-date-picker",
        props: {
          format: "YYYY-MM-DD",
          showTime: false,
          valueFormat: "YYYY-MM-DD",
          defaultValue: (this as any).defaultValue,
          disabledDate: (this as any).disabledDate
        },
        events:{
          change:(data:any)=>{
            this.searchModel.endTime = data
          }
        },
      },
    ];
    //searchModel外追加右侧列表查询参数
    this.searchModel = {
      startTime: '',
      endTime: '',
      queryType: 0,//默认为0
      addressCodes: [],//数组类型
    }
  }
  //#endregion
  //#region 组件挂载成功后执行

  mounted() {
    this.queryAreaTree();
    this.querySearchDate('day');
  }
  //#endregion
  //#region 查询方法

  private onSearch() {
    let selectDate = "";
    let today = moment().format("YYYY-MM-DD");
    this.searchModel.countDate? selectDate = this.searchModel.countDate : selectDate = today;
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
    /**
     * 查询条件
     */
    //本页查询条件添加
    if(!this.searchModel.addressCodes.length){
      this.alertInfo();
      return false
    }

    let queryModel = Object.assign(
      {
        MaxResultCount: this.getMaxResultCount,
        SkipCount: this.getSkipCount,
      },
      this.searchModel
    );
    console.log('queryModel',queryModel);

    MachApi.getDayContrast(queryModel).then((res:any) => {
      console.log('MachApi', res);
      if(!res.columns){
        this.$message.info('暂无数据');
        return false
      }
      res.columns.forEach((value:any,key:any) => {
        this.columns.push({title:value.headerName,...value})
      });
      this.loading = false;
      this.dataSource = res.data.items;
      this.getPagination.total = res.totalCount;
    });
    this.currentRow = null;
    this.loading = true;
  }

  /*树点击事件*/
  private getTreeNode(val:any){
    console.log("点击树信息",val);
    if(val.addressCode){
      if(!val.type){
        val.type = 0
      }
      this.searchModel.addressCodes = [];
      this.searchModel.addressCodes.push(val.addressCode);
      this.queryList();
    }
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

  /**
   * 表格选择行事件
   * @param selectedRowKeys
   */
  private onTableSelectChange(selectedRowKeys: Array<any>) {
    this.selectedRowKeys = selectedRowKeys;
    this.columns = [{ field: "", title: "", width: "", align: "center" }];
  }

  // 错误提示弹出框
  private alertInfo() {
    this.$message.info('请先选择左侧子节点!');
  };
  //#endregion
}
</script>

<style scoped>
.vxetable {
  height: calc(100vh - 100px);
}
</style>
