<template>
  <tree-layout-page-wrapper :treeWidth="260">
    <template slot="tree">
      <monitor-tree @getTreeNode="getTreeNode" />
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
            <a-button @click="queryList" icon="ordered-list">生成报表</a-button>
            <a-button @click="showCharts" icon="bar-chart">生成图表</a-button>
          </a-button-group>
        </template>
      </advanced-search-panel>

      <div class="compact-page-table" v-show="showTable">
        <vxe-table
          id="vxeTable"
          :data="dataSource"
          :loading="loading"
          highlight-current-row
          highlight-hover-row
          @cell-click="onTableCellClick"
          border
          height="auto"
          :empty-render="{ name: 'NotData' }"
          :seq-config="{ startIndex: getSkipCount }"
          :custom-config="{ storage: true }"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            width="50"
            align="center"
          ></vxe-table-column>
          <vxe-table-column
            v-bind="col"
            v-for="(col, index) in columns"
            :key="index"
          ></vxe-table-column>
        </vxe-table>
        <div class="table-pagination">
          <a-pagination
            v-bind="pagination"
            @showSizeChange="onShowSizeChange"
            @change="onPageChanged"
          ></a-pagination>
        </div>
      </div>
      <div class="table-pagination" v-if="showTable">
        <a-pagination
          v-bind="pagination"
          @showSizeChange="onShowSizeChange"
          @change="onPageChanged"
        ></a-pagination>
      </div>
      <div class="chart-container" v-if="!showTable">
        <line-chart
          ref="lineCharts"
          height="100%"
          width="100%"
          id="lineChart"
        />
      </div>
    </div>
  </tree-layout-page-wrapper>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { ToolbarActionItem, ListPageVxe } from "@cr/types";
import MachApi from "@/api/dma/generatorApis/machiningData";
import AreaApi from "@/api/dma/generatorApis/area";
import AddressTree from "@/components/Tree/AddressTree.vue";
import MonitorTree from "@/components/Tree/MonitorTree.vue";
import AreaTree from "@/components/Tree/AreaTree.vue";
import { ArmRealDataDto } from "@/api/dma/types";
import moment from "moment";
import LineChart from "@/components/Charts/LineChart.vue";

@Component<DayAnalyseRealValue>({
  name: "DayAnalyseRealValue",
  components: { AddressTree, AreaTree, MonitorTree, LineChart },
})
export default class DayAnalyseRealValue extends ListPageVxe<
  ArmRealDataDto,
  string
> {
  //图表数据
  private chartsData: Array<any> = [];

  //图表表头数据
  private chartsTitle: Array<any> = [];

  //#region 树控件相关
  private expandedKeys: string[] = [];

  private treeData: Array<any> = [];

  //控制显示表单或者图表
  private showTable: boolean = true;

  private showCharts() {
    this.showTable = false;
    this.getChartData();
  }

  //根据时间加载列表或图表数据
  private querySearchDate(time: string) {
    const today = new Date();
    if (time === "day") {
      this.searchModel.startTime = moment(today).format("YYYY-MM-DD");
      this.searchModel.endTime = moment(today).format("YYYY-MM-DD");
    }
    if (time === "week") {
      this.searchModel.startTime = moment(today).format("YYYY-MM-DD");
      this.searchModel.endTime = moment(today)
        .add(1, "weeks")
        .format("YYYY-MM-DD");
    }
    if (time === "month") {
      this.searchModel.startTime = moment(today).format("YYYY-MM-DD");
      this.searchModel.endTime = moment(today)
        .add(1, "months")
        .format("YYYY-MM-DD");
    }
    //加载表单或者图表数据
    if (this.showTable === true) {
      this.queryList();
    } else {
      this.getChartData();
    }
  }

  private queryAreaTree() {
    AreaApi.getAreaTree({}).then((res) => {
      this.treeData = res;
      this.expandedKeys.push(res[0].id);
    });
  }
  //#endregion
  //#region 工具栏按钮属性

  //#endregion
  //#region 组件创建时执行
  created() {
    this.columns = [];
    this.getPagination.pageSize = 10;
    this.searchFields = [
      {
        name: "startTime",
        label: "开始时间",
        input: "a-date-picker",
        props: {
          format: "YYYY-MM-DD",
          showTime: false,
          valueFormat: "YYYY-MM-DD",
          defaultValue: (this as any).defaultValue,
          disabledDate: (this as any).disabledDate,
        },
        events: {
          change: (data: any) => {
            this.searchModel.startTime = data;
          },
        },
      },
      {
        name: "endTime",
        label: "结束时间",
        input: "a-date-picker",
        props: {
          format: "YYYY-MM-DD",
          showTime: false,
          valueFormat: "YYYY-MM-DD",
          defaultValue: (this as any).defaultValue,
          disabledDate: (this as any).disabledDate,
        },
        events: {
          change: (data: any) => {
            this.searchModel.endTime = data;
          },
        },
      },
    ];
    //searchModel外追加右侧列表查询参数
    this.searchModel = {
      startTime: "",
      endTime: "",
      queryType: 0, //默认为0
      addressCodes: [], //数组类型
      isPage: false,
    };
  }
  //#endregion
  //#region 组件挂载成功后执行

  mounted() {
    this.queryAreaTree();
    this.initialDate();
  }
  //初始时间加载
  private initialDate() {
    const today = new Date();
    this.searchModel.startTime = moment(today).format("YYYY-MM-DD");
    this.searchModel.endTime = moment(today).format("YYYY-MM-DD");
  }

  //#endregion
  //#region 查询方法

  private onSearch() {
    let selectDate = "";
    let today = moment().format("YYYY-MM-DD");
    this.searchModel.countDate
      ? (selectDate = this.searchModel.countDate)
      : (selectDate = today);
    this.getPagination.current = 1;
    this.queryList();
  }
  //#endregion
  //#region 表格控件相关

  private createTab() {
    if (!this.searchModel.AreaIds) {
      this.$message.error("请先选择分区~");
    } else {
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
    if (
      !this.searchModel.addressCodes ||
      !this.searchModel.addressCodes.length
    ) {
      this.loading = false;
      return false;
    }

    let queryModel = Object.assign(
      {
        MaxResultCount: this.getMaxResultCount,
        SkipCount: this.getSkipCount,
      },
      this.searchModel
    );

    MachApi.getDayAnalyse(queryModel)
      .then((res: any) => {
        if (!res) {
          this.loading = false;
          return false;
        }
        res.columns.forEach((value: any, key: any) => {
          this.columns.push({ title: value.headerName, ...value });
        });
        this.loading = false;
        this.dataSource = res.data.items;
        this.getPagination.total = res.totalCount;
      })
      .catch((err: any) => {
        alert(err);
        this.loading = false;
      });
    this.currentRow = null;
    this.loading = true;
  }

  /*树点击事件*/
  private getTreeNode(val: any) {
    console.log("点击树信息", val);
    if (val.addressCode) {
      if (!val.type) {
        val.type = 0;
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

  // 错误提示弹出框
  private alertInfo() {
    this.$message.info("请先选择左侧子节点!");
  }

  /**
   * 获取echarts数据
   * */
  private getChartData() {
    console.log('dataSource',this.dataSource);
    if (!this.dataSource) {
      return false;
    }
    let chartsDatas: Array<any> = this.dataSource;
    //横坐标参数
    let xArry: Array<any> = [];
    //纵坐标参数
    let yArry: Array<any> = [];
    //可以选标题内容
    let name: string = "";
    //正则匹配信息
    let patt1: any = /[1-4]/g;
    //处理表单显示数据
    chartsDatas.map((items: any) => {
      let data: Array<any> = [];
      if(!items.createDate){
        return false
      }
      name = items.createDate;
      Object.keys(items).forEach((key) => {
        if(key.match(patt1)){
          data.push(items[key]);
        }
        if(items.createDate){
          key === "createDate" && this.chartsTitle.push(items.createDate);
        }
      });
      xArry = Object.keys(items) as any;
      yArry.push({
        name,
        type: "line",
        data,
      });
    });
    console.log('yArry',yArry);
    // this.chartsData = chartsDatas;
    if (xArry && yArry && this.chartsTitle) {
      this.initECharts(xArry, yArry);
    }
  }

  /**
   * echarts数据处理
   * */
  private eChartsData(data:any){

    // this.chartsData
  }

  /**
   * 初始化echarts
   * */
  private initECharts(xArry: any, yArry: any) {
    const options = {
      title: {
        text: "瞬时流量日环比",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: this.chartsTitle,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xArry,
      },
      yAxis: {
        type: "value",
      },
      series: yArry,
    };
    this.$nextTick(() => {
      (this.$refs.lineCharts as any).initChart(options);
    });
  }

  //#endregion
}
</script>

<style scoped>
.vxetable {
  height: calc(100vh - 100px);
}

.chart-container {
  width: 100%;
  height: 100%;
}

.lineChart {
  width: 100%;
  height: 100%;
}
</style>
