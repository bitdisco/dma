<template>
  <div
    :id="id"
    :class="className"
    :style="{height: height, width: width}"
  />
</template>

<script lang="ts">
import echarts, { EChartOption } from "echarts";
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import ResizeMixin from "./mixins/resize";

@Component({
  name: "LineChart",
})
export default class extends mixins(ResizeMixin) {
  @Prop({ default: "chart" }) private className!: string;
  @Prop({ default: "chart" }) private id!: string;
  @Prop({ default: "200px" }) private width!: string;
  @Prop({ default: "200px" }) private height!: string;

  public mounted() {
    this.$nextTick(() => {
      // this.initChart();
    });
  }

  public beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }


   private initChart(opitons: EChartOption) {
    this.chart = echarts.init(
      document.getElementById(this.id) as HTMLDivElement,
    );
    this.chart.setOption(opitons,true);
  }
}
</script>
