<template>
  <cr-modal
    :title="modalTitle"
    :width="800"
    :height="550"
    v-model="modalVisible"
    :footer="null"
  >
    <!-- <div class="chart-container"> -->
    <line-chart ref="demoCharts" height="100%" width="100%" />
    <!-- </div> -->
  </cr-modal>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import LineChart from "@/components/Charts/LineChart.vue";
import { FormPageVue } from "@cr/types";
import moment from "moment";
@Component<ChartModal>({
  name: "ChartModal",
  components: {
    LineChart,
  },
})
export default class ChartModal extends FormPageVue<any, string> {
  @Prop({ default: "查看三日历史曲线" }) private modalTitle!: string;
  @Prop({ default: "图表" }) private chartTitle!: string;
  // moment().subtract(7, "days").format("YYYY-MM-DD")

  private timeData: Array<any> = [
    moment().subtract(2, "days").format("YYYYMMDD"),
    moment().subtract(1, "days").format("YYYYMMDD"),
    moment().format("YYYYMMDD"),
  ];
  // moment().subtract('days', 6), moment()
  created() {
    this.$nextTick(() => {
      this.initCharts([], []);
    });
  }

  /**
   * 初始化echarts
   * */
  private initCharts(xArry: any, data: any) {
    const options = {
      title: {
        text: this.chartTitle,
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: this.timeData,
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
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} °C",
        },
      },
      series: [
        {
          name: this.timeData[0],
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
        },
        {
          name: this.timeData[1],
          type: "line",
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
          },
          markLine: {
            data: [
              { type: "average", name: "平均值" },
              [
                {
                  symbol: "none",
                  x: "90%",
                  yAxis: "max",
                },
                {
                  symbol: "circle",
                  label: {
                    position: "start",
                    formatter: "最大值",
                  },
                  type: "max",
                  name: "最高点",
                },
              ],
            ],
          },
        },
        {
          name: this.timeData[2],
          type: "line",
          data: [6, 3, 2, 5, 1, 2, -2],
          markPoint: {
            data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
          },
          markLine: {
            data: [
              { type: "average", name: "平均值" },
              [
                {
                  symbol: "none",
                  x: "90%",
                  yAxis: "max",
                },
                {
                  symbol: "circle",
                  label: {
                    position: "start",
                    formatter: "最大值",
                  },
                  type: "max",
                  name: "最高点",
                },
              ],
            ],
          },
        },
      ],
    };
    (this.$refs.demoCharts as any).initChart(options);
  }
}
</script>
<style lang="less" scoped></style>
