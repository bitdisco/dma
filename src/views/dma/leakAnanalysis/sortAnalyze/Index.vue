<template>
  <tree-layout-page-wrapper :treeWidth="560" hide-title-bar> 
    <template slot="tree">
      <div class="tree-left-box">
        <div class="search-box">
          <quick-search-dropdown
            v-model="searchModel"
            :fields="searchFields"
            :layoutColumn="1"
            :dropdownStyle="{ width: '500px' }"
            @search="onSearch"
            class="search-dropdown"
          >
          </quick-search-dropdown>
          <a-button-group class="sync-button-group">
            <a-button @click="queryList" icon="sync">刷新</a-button>
          </a-button-group>
        </div>

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
    </template>
    <div class="sortAnalyze-container">
      <!-- <div class="compact-page-table"> -->
        <vxe-table
          id="vxeTable"
          :data="lineDataSource"
          :loading="lineLoading"
          highlight-current-row
          highlight-hover-row
          border
          height="350"
          auto-resize
          :seq-config="{ startIndex: getSkipCount }"
          :custom-config="{ storage: true }"
        >
          <vxe-table-column type="seq" width="50" align="center"></vxe-table-column>
          <vxe-table-column
            v-bind="col"
            v-for="(col, index) in columns"
            :key="index"
          ></vxe-table-column>
        </vxe-table>
      <!-- </div> -->
      <div class="today-history">
        <div class="com-tit">
          <h4>漏损率变化曲线图（%）</h4>
        </div>
        <div class="chart-container">
          <line-chart ref="demoCharts" height="100%" width="100%" />
        </div>
      </div>
    </div>
  </tree-layout-page-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LineChart from "@/components/Charts/LineChart.vue";
import { QuickNav } from "@/config/dashboard";
import { ListPageVxe } from "@cr/types";
import { QuickSearchDropdown } from "@cr/components";
import { LeakageRankingDto } from "@/api/dma/types";
import LeakageApi from "@/api/dma/generatorApis/leakageDay";
import moment from "moment";

@Component({
  name: "SortAnalyze",
  components: {
    LineChart,
    QuickSearchDropdown,
  },
})
export default class SortAnalyze extends ListPageVxe<LeakageRankingDto, string> {
  private statsData: any = [];
  // 新增修改数据对象
  private model = {};

  // 表格数据加载
  private lineLoading: Boolean = false;
  private lineDataSource: Array<any> = [];

  created() {
    this.searchModel = {
      chargeTime: [
        moment().subtract(7, "days").format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD"),
      ],
    };
    this.columns = [
      {
        title: "分区名称",
        field: "areaName",
      },
      {
        title: "供水量(㎡)",
        field: "supplyValue",
      },
      {
        title: "漏失量(㎡)",
        field: "missValue",
      },
      {
        title: "漏损率(%)",
        field: "leakageRate",
      },
    ];
    this.searchFields = [
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
            最近一周: [moment().subtract(7, "days"), moment()],
            最近三周: [moment().subtract(3, "week"), moment()],
            最近一个月: [moment().subtract(1, "months"), moment()],
          },
        },
        events: {
          change: (dates: any, dateStrings: any) => {
            console.log("From: ", dates[0], ", to: ", dates[1]);
            console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
          },
        },
      },
      {
        name: "SkipCount",
        label: "分区名称",
        input: "a-input",
        props: {
          style: {
            width: "100%",
          },
          placeholder: "请输入",
        },
      },
    ];
    this.getPagination.pageSize = 10;
  }
  /**
   * 组件挂载成功
   */
  mounted() {
    this.queryList();
  }
  /**
   * 分页查询列表
   */
  private queryList() {
    let page = this.getPagination;
    /**
     * 查询条件
     */
    let queryModel: any = {
      MaxResultCount: this.getMaxResultCount,
      SkipCount: this.getSkipCount + 1,
    };
    if (this.searchModel.chargeTime) {
      queryModel.StartTime = this.searchModel.chargeTime[0];
      queryModel.EndTime = this.searchModel.chargeTime[1];
    }

    LeakageApi.getLeakageRanking(queryModel).then((res) => {
      this.loading = false;
      this.dataSource = res;
      (this.dataSource as any).map((x: any) => {
        if (x.leakageRate) {
          x.leakageRate = x.leakageRate.toFixed(2);
        }
        if (x.missValue) {
          x.missValue = x.missValue.toFixed(2);
        }
      });

      this.getPagination.total = res.totalCount;
      this.getLeakageLineData();
    });
    this.currentRow = null;
    this.loading = true;
  }

  private get modulesItems() {
    return QuickNav;
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
   * 表格事件
   */
  private onTableCellClick({ row }: any) {
    this.currentRow = row;
    this.getLeakageLineData(row);
  }

  private getLeakageLineData(currentRow?: any) {
    let queryModel = Object.assign({
      AreaId: currentRow ? currentRow.areaId : "",
      StartTime: this.searchModel.StartTime,
      EndTime: this.searchModel.EndTime,
    });

    LeakageApi.getLeakageLine(queryModel).then((res) => {
      this.lineLoading = false;
      this.lineDataSource = res;
      let xData: Array<any> = [];
      let yData: any = { leakageRate: [], supplyValue: [], missValue: [] };
      res.map((x: any) => {
        x.createTime = x.createTime.split(" ")[0];
        if (x.supplyValue) {
          yData.supplyValue.push(x.supplyValue);
        }
        if (x.leakageRate) {
          yData.leakageRate.push(x.leakageRate.toFixed(2));
        }
        if (x.missValue) {
          yData.missValue.push(x.missValue.toFixed(2));
        }
        xData.push(x.createTime);
      });

      this.initCharts(xData, yData);
    });
    this.lineLoading = true;
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
      title: {
        text: "漏损率变化曲线图",
        x: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
        },
      },
      legend: {
        data: xArry,
        x: "left",
      },
      toolbox: {
        left: "right",
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {},
        },
      },
      axisPointer: {
        link: { xAxisIndex: "all" },
      },
      grid: [
        {
          left: 65,
          right: 45,
          height: "36%",
        },
        {
          left: 65,
          right: 45,
          top: "57%",
          height: "36%",
        },
      ],
      xAxis: [
        {
          type: "category",
          axisLine: { onZero: true },
          axisLabel: { show: false },
          data: xArry,
        },
        {
          gridIndex: 1,
          type: "category",
          axisLine: { onZero: true },
          data: xArry,
          position: "top",
        },
      ],
      yAxis: [
        {
          name: "漏损率(%)",
          type: "value",
        },
        {
          gridIndex: 1,
          name: "用水量",
          type: "value",
          inverse: true,
        },
      ],
      series: [
        {
          name: "漏损率",
          type: "line",
          symbolSize: 8,
          hoverAnimation: false,
          data: data.leakageRate,
        },
        {
          name: "供水量",
          type: "line",
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbolSize: 8,
          hoverAnimation: false,
          data: data.supplyValue,
        },
        {
          name: "漏水量",
          type: "line",
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbolSize: 8,
          hoverAnimation: false,
          data: data.missValue,
        },
      ],
    };
    (this.$refs.demoCharts as any).initChart(options);
  }
}
</script>

<style lang="less" scoped>
.tree-left-box {
  display: flex;
  flex-direction: column;
  .search-box {
    display: flex;
    padding-bottom: 10px;
    .search-dropdown {
      flex: 1;
    }
  }
  .compact-page-table {
    flex: 1;
  }
}
.com-tit {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 0 14px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
}

.sortAnalyze-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sortAnalyze-L {
  width: 605px;
}

.sortAnalyze-R {
  width: calc(100% - 620px);
}

.chart-container {
  position: relative;
  width: 100%;
  height: 450px;
}

.today-history {
  width: 100%;
  border-radius: 4px;
  background: #fff;
  flex: 1;
}
</style>
