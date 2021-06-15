<template>
  <cr-modal
    :title="modalTitle"
    :width="800"
    :height="550"
    v-model="modalVisible"
    :footer="null"
  >
    <div class="chart-container">
      <div class="example" v-if="!chartLoading && dataSource.length == 0">
        <a-empty />
      </div>
      <a-spin class="example" v-else-if="chartLoading" />

      <line-chart v-else ref="demoCharts" height="100%" width="100%" />
    </div>
  </cr-modal>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import LineChart from "@/components/Charts/LineChart.vue";
import machiningDataApi from "@/api/dma/generatorApis/machiningData";
import { FormPageVue } from "@cr/types";
import moment from "moment";
@Component<ChartModal>({
  name: "ChartModal",
  components: {
    LineChart,
  },
})
export default class ChartModal extends FormPageVue<any, string> {
  @Prop({ default: () => {} }) private chartModalData!: any;
  private chartLoading: boolean = true;
  private dataSource: any = [];
  private chartype: any = null;
  private chartTitle: string = "近三天数据同比";
  private modalTitle: string = "查看三日历史曲线";

  private timeData: Array<any> = [
    moment().subtract(2, "days").format("YYYY-MM-DD"),
    moment().subtract(1, "days").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ];

  mounted() {
    this.getContrast(this.chartModalData.item, this.chartModalData.valueType);
  }

  /**
   *获取图表数据
   */
  private getContrast(item: any, type: string) {
    let valueType: number = 0;
    if (type == "realValue") {
      valueType = 0;
      this.modalTitle = this.modalTitle + "[瞬时流量]-" + `[${item.addressCode}]`;
    } else if (type == "pressValue") {
      valueType = 3;
      this.modalTitle = this.modalTitle + "[压力]-" + `[${item.addressCode}]`;
    } else {
      valueType = 6;
      this.modalTitle = this.modalTitle + "[电池电压]-" + `[${item.addressCode}]`;
    }
    let queryModel = {
      addressCodes: item.addressCode,
      queryType: valueType,
      startTime: this.timeData[0],
      endTime: this.timeData[1],
    };

    machiningDataApi
      .getDayContrast(queryModel)
      .then((res: any) => {
        this.chartLoading = false;
        this.dataSource = res.data.items;

        let xArry: any = Object.keys(this.dataSource[0]);
        xArry.splice(0, 1);

        let chartData = {
          today: this.ObjFormat(this.dataSource[3]),
          yesterday: this.ObjFormat(this.dataSource[2]),
          beforeYesterday: this.ObjFormat(this.dataSource[1]),
        };
        this.$nextTick(() => {
          this.initCharts(xArry, chartData);
        });
      })
      .catch((erry) => {
        this.chartLoading = false;
      });
  }

  /**
   * 图表数据处理
   */
  private ObjFormat(obj: any) {
    let valueAry: Array<any> = [];
    for (let key in obj) {
      valueAry.push(obj[key]);
    }
    valueAry.splice(0, 1);
    return valueAry;
  }

  /**
   * 初始化echarts
   * */
  private initCharts(xArry: any, data: any) {
    const options = {
      title: {
        text: this.chartTitle,
        textStyle: {
          color: "#FFFFFF",
        },
      },
      // backgroundColor: "rgba(50, 50, 50, 0.8)",
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: this.timeData,
        // textStyle: {
        //   color: "#FFFFFF",
        // },
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
        // iconStyle: {
        //   color: "rgba(50, 50, 50, 0.1)",
        // },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xArry,
        // axisLine: {
        //   lineStyle: {
        //     type: "solid",
        //     color: "#fff", //左边线的颜色
        //   },
        // },
        // axisLabel: {
        //   textStyle: {
        //     color: "#fff", //坐标值得具体的颜色
        //   },
        // },
      },
      yAxis: {
        type: "value",
        // axisLine: {
        //   lineStyle: {
        //     type: "solid",
        //     color: "#fff", //左边线的颜色
        //   },
        // },
        // axisLabel: {
        //   textStyle: {
        //     color: "#fff", //坐标值得具体的颜色
        //   },
        // },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
        },
      ],
      series: [
        {
          name: this.timeData[0],
          type: "line",
          data: data.beforeYesterday,
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
        {
          name: this.timeData[1],
          type: "line",
          data: data.yesterday,
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
        {
          name: this.timeData[2],
          type: "line",
          data: data.today,
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
      ],
    };
    (this.$refs.demoCharts as any).initChart(options);
  }
}
</script>
<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";

.chart-container {
  height: 100%;
  .example {
    width: 100%;
    color: @primary-color;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
