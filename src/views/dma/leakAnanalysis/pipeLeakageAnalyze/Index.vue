<template>
  <tree-layout-page-wrapper hide-title-bar :treeWidth="260">
    <template slot="tree">
      <monitor-tree @getTreeNode="getTreeNode" />
    </template>
    <div class="compact-page-wrapper">
      <div class="table-container">
        <advanced-search-panel
          :showInput="false"
          v-model="searchModel"
          :fields="searchFields"
          :dropdownWidth="400"
          :layoutColumn="1"
          :inputStyle="{ placeholder: '请输入关键词', style: { width: '150px' } }"
          @search="onSearch"
        >
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
            auto-resize
            height="330"
            :seq-config="{ startIndex: getSkipCount }"
            :custom-config="{ storage: true }"
            size="small"
          >
            <vxe-table-column type="seq" width="50" align="center"></vxe-table-column>
            <vxe-table-column
              v-bind="col"
              v-for="(col, index) in columns"
              :key="index"
            ></vxe-table-column>
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
      <div class="chart-container">
        <line-chart ref="demoCharts" height="100%" width="100%" />
      </div>
    </div>
  </tree-layout-page-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ToolbarActionItem, ListPageVxe } from "@cr/types";
import api from "@/api/dma/generatorApis/armRealData";
import AreaApi from "@/api/dma/generatorApis/area";
import MonitorTree from "@/components/Tree/MonitorTree.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import moment from "moment";

@Component<AreaStatisticalList>({
  name: "AreaStatisticalList",
  components: { MonitorTree, LineChart },
})
export default class AreaStatisticalList extends ListPageVxe<any, string> {
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
  private selecteTreeData: any = null;
  private xAxis: any[] = [];

  private queryAreaTree() {
    AreaApi.getAreaTree({}).then((res) => {
      this.treeData = res;
      this.expandedKeys.push(res[0].id);
    });
  }

  private onExpand(expandedKeys: any) {
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

  private onSelect(selectedKeys: any, info: any) {
    this.selectedKeys = selectedKeys;
    this.searchModel.AreaId = selectedKeys[0];
    this.queryList();
  }

  /**
   * 工具栏按钮属性
   */
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

  /**
   * 组件创建时执行
   */
  created() {
    this.columns = [
      {
        title: "分区名称",
        field: "areaName",
        width: 160,
      },
      {
        title: "平均供水量（m³）",
        field: "supplyAvg",
      },
      {
        title: "最大供水量（m³）",
        field: "supplyMax",
      },
      {
        title: "最小瞬时流量（m³）",
        field: "realValuemin",
      },
      {
        title: "最小夜间流量（m³）",
        field: "waterFree",
      },

      {
        title: "漏损率（%）",
        field: "leakageRate",
      },
      {
        title: "统计日期",
        field: "statisticalDate",
      },
    ];
    this.getPagination.pageSize = 10;
    this.searchFields = [
      // {
      //   name: "Keyword",
      //   label: "关键字",
      //   input: "a-input",
      //   props: {
      //     placeholder: "输入监测点名称、监测点编码、挂接表号关键词进行模糊搜索",
      //   },
      // },
      {
        name: "chargeTime",
        label: "日期",
        wholeLine: true,
        input: "a-range-picker",
        props: {
          style: {
            width: "100%",
          },
          valueFormat: "YYYY-MM-DD",
          format: "YYYY-MM-DD",
          ranges: {
            昨天: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            近7天: [moment().subtract(7, "days"), moment()],
            近1个月: [moment().subtract(1, "months"), moment()],
            近3个月: [moment().subtract(3, "months"), moment()],
          },
        },
        events: {
          change: (dates: any, dateStrings: any) => {
            let date: any = this.datedifference(dateStrings[0], dateStrings[1]);
            let date2: any = this.datedifference(
              dateStrings[0],
              moment().format("YYYY-MM-DD")
            );
            this.xAxis = this.lineXAxis(date, date2);
          },
        },
      },
    ];
  }

  /**
   * 组件挂载成功后执行
   */
  mounted() {
    this.queryAreaTree();
    this.queryList();
  }

  /**
   * 查询方法
   */
  private onSearch() {
    this.getPagination.current = 1;
    //处理其它查询条件逻辑。。。。
    this.queryList();
  }

  /**
   * 分页查询列表
   */
  private queryList() {
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
      this.$nextTick(() => {
        this.initCharts(this.xAxis, "");
      });
    });
    this.currentRow = null;
    this.loading = true;
  }

  /*树点击事件*/
  private getTreeNode(val: any) {
    this.selecteTreeData = val;
    let area: any = val.area;
    if (area) {
      this.searchModel.AreaName = area.areaName;
      this.searchModel.AreaCode = area.areaCode;
      this.searchModel.AreaGrade = area.areaGrade;
    }
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
   * 初始化echarts
   * */
  private initCharts(xArry: any, data: any) {
    const options = {
      backgroundColor: "rgba(41,52,65,1)",
      title: {
        text: "分区参数对比",
        textStyle: {
          color: "#ffffff",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["最小夜间流量"],
        textStyle: {
          color: "#ffffff",
        },
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {},
        },
        iconStyle: {
          borderColor: "#ffffff",
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xArry,
        axisLine: {
          lineStyle: {
            color: "#ffffff",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} °C",
        },
        axisLine: {
          lineStyle: {
            color: "#ffffff",
          },
        },
      },
      series: [
        {
          name: "最小夜间流量",
          type: "line",
          data: [10, 11, 13, 11, 12, 12, 9],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
          itemStyle: {
            normal: {
              color: "#DB6A65", //折线点的颜色
              lineStyle: {
                color: "#DB6A65", //折线的颜色
              },
            },
          },
        },
      ],
    };
    (this.$refs.demoCharts as any).initChart(options);
  }
  /**
   * 两个时间相差天数
   */
  private datedifference(sDate1: any, sDate2: any) {
    var dateSpan, tempDate, iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays;
  }

  /**
   *图表x轴处理
   */
  private lineXAxis(i: number, ddd2: number) {
    let xArray: Array<any> = [];
    if (i > 0) {
      for (let index = 0; index <= i; index++) {
        xArray.push(
          moment()
            .subtract(ddd2 - index, "days")
            .format("YYYY-MM-DD")
        );
      }
    } else {
      xArray = [moment().subtract(1, "days").format("YYYY-MM-DD")];
    }
    return xArray;
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

<style lang="less" scoped>
.vxetable {
  height: calc(100vh - 100px);
}
.compact-page-wrapper {
  overflow: scroll;
  height: 100%;
  .chart-container {
    width: 100%;
    height: 320px;
  }
}
</style>
