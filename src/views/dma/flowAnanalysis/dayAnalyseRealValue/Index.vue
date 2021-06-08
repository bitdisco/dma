<template>
  <tree-layout-page-wrapper :treeWidth="260">
    <template slot="tree">
      <!-- <address-tree :checkable="true" @getTreeNode="getTreeNode"/> -->
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


@Component<RealDataList>({
  name: "RealDataList",
  components:{AddressTree, AreaTree, MonitorTree}
})
export default class RealDataList extends ListPageVxe<ArmRealDataDto, string> {
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

  //获取查询信息
  private searchData: Object = {
    AreaName: '',
    AreaGrade: '',
    AreaCode: '',
    MeterName: '',
    MeterCode: '',
    MeterType: '',
    MeterNumber: '',
    StartTime: '2021-02-07',
    EndTime: '2021-02-09',
    AddressCode: '',
    AddressCodes: [28006982],
    CreateTime: null,
    QueryType: 0,
    keyWord: '',
    IsPage: false,
    Sorting: '',
  };

  // 获取列表参数
  private tableColumns: Array<any> = [];

  //首次加载页面表单数据传参
  private querySearchData() {
    this.searchModel = this.searchData;
    // let selectDate = "";
    // let today = moment().format("YYYY-MM-DD");
    // this.searchModel.countDate? selectDate = this.searchModel.countDate : selectDate = today;
    // this.searchModel.StartTime = selectDate+' 00:00';
    // this.searchModel.EndTime = selectDate+' 23:59';
  }

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
    // this.AreaId = selectedKeys[0];
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
    this.columns = [];
    this.getPagination.pageSize = 10;
    this.searchFields = [
      {
        name: "Keyword",
        label: "关键字",
        input: "a-date-picker",
        props: {
          placeholder: "输入监测点名称、监测点编码、挂接表号关键词进行模糊搜索",
        },
      },
      {
        name: "meterName",
        label: "监测点名称",
        input: "a-input",
        props: {
          placeholder: "请输入监测点名称",
        },
      },
      {
        name: "meterCode",
        label: "监测点编码",
        input: "a-input",
        props: {
          placeholder: "请输入监测点编码",
        },
      },
      {
        name: "addressCode",
        label: "挂接表号",
        input: "a-input",
        props: {
          placeholder: "请输入挂接表号",
        },
      },
      {
        name: "addressCode",
        label: "挂接表号",
        input: "a-input",
        props: {
          placeholder: "请输入挂接表号",
        },
      },
    ];
  }
  //#endregion
  //#region 组件挂载成功后执行

  mounted() {
    this.queryAreaTree();
    this.querySearchData();
    this.queryList();
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

    console.log('queryModel',queryModel);

    MachApi.getDayContrast(queryModel).then((res:any) => {
      console.log('MachApi', res);
      let column: Array<any> = [];
      res.columns.forEach((value:any,key:any) => {
        column.push({title:value.headerName,...value})
      });
      console.log('column', column);

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
    this.searchModel.AreaName = val.areaName;
    this.searchModel.AreaCode = val.areaCode;
    this.searchModel.AreaGrade = val.areaGrade;
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
