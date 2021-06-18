<template>
  <!-- <div class="portal-panel-content" style="margin-top: 0px; overflow: hidden"> -->
  <div class="gridPanel">
    <table class="waterBalance" v-for="(item,index) in tableData" :key="index">
      <tr>
        <td style="background-color: #7289ab64" rowspan="10">
          <label id="areaname"></label>
          <br />
          分区供水总量<br />
          <!-- <label>{{ item.supplyvalue }} m³(null%)</label> -->
          <label>m³(null%)</label>
        </td>
        <td style="background-color: #73b9bc64" rowspan="4">
          有效供水量<br />
          <label id="effective">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
        <td style="background-color: #91ca8c64" rowspan="2">
          售水量<br />
          <label id="watersale1">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
        <td style="background-color: #91ca8c64">
          计量售水量 :
          <label id="watersale">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
        <td style="background-color: #91ca8c64" rowspan="2">
          售水量<br />
          <label id="watersale2">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #91ca8c64">
          未计量售水量:
          <label id="waterunsold">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #ea7e5364" rowspan="2">
          免费售水量<br />
          <label id="freewatersales">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
        <td style="background-color: #ea7e5364">
          计量免费售水量:
          <label id="waterfree">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
        <td style="background-color: #e69d8764" rowspan="8">
          产销差水量<br />
          <label id="producesale">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #ea7e5364">
          未计量免费售水量:
          <label id="waterunsoldfree">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #dd6b6664" rowspan="6">
          无效供水量<br />
          <label id="leaking">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
        <td style="background-color: #e69d8764" rowspan="2">
          表观损失水量<br />
          <label id="apparentleaking">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
        <td style="background-color: #e69d8764">
          失窃水量:
          <label id="waterstolen">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764">
          计量误差水量:
          <label id="watererror">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764" rowspan="3">
          管网漏失水量<br />
          <label id="pipeleaking">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
        <td style="background-color: #e69d8764">
          爆管漏水量:
          <label id="brokenlleakage">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764">
          背景漏失水量:
          <label id="backgroundleakage">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764">
          水箱、水池的漏损水量及渗水量:
          <label id="waterseepage">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764">
          其它漏损水量<br />
          <label id="waterotherloss1">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
        <td style="background-color: #e69d8764">
          未注册用户用水和用户拒查等<br />
          管理因素导致的损失水量<br />
          <label id="waterotherloss">null&nbsp;M<sup>3</sup>(null%)</label>
        </td>
      </tr>
    </table>
  </div>
  <!-- </div> -->
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component<WaterBalanceTable>({
  name: "WaterBalanceTable",
})
export default class WaterBalanceTable extends Vue {
  @Prop({ default: () => [{}] }) private tableData!: Array<any>;
}
</script>
<style lang="less" scoped>
.gridPanel {
  height: 100%;
  table {
    border-collapse: separate;
    height: 100%;
    width: 100%;
  }
}
</style>
