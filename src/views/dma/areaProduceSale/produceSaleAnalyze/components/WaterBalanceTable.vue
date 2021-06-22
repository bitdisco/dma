<template>
  <!-- <div class="portal-panel-content" style="margin-top: 0px; overflow: hidden"> -->
  <div class="gridPanel">
    <table class="waterBalance" v-for="(item,index) in tableData" :key="index">
      <tr>
        <td style="background-color: #7289ab64" rowspan="10">
          <label id="areaname"></label>
          <br />
          分区供水总量<br />
          <label>{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
        <td style="background-color: #73b9bc64" rowspan="4">
          有效供水量<br />
          <label id="effective">{{ item.waterError?item.waterError:0  }} m³</label>
        </td>
        <td style="background-color: #91ca8c64" rowspan="2">
          售水量<br />
          <label id="watersale1">{{ item.waterError?item.waterError:0  }} m³</label>
        </td>
        <td style="background-color: #91ca8c64">
          计量售水量 :
          <label id="watersale">{{ item.waterSale?item.waterSale:0  }} m³</label>
        </td>
        <td style="background-color: #91ca8c64" rowspan="2">
          售水量<br />
          <label id="watersale2">{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #91ca8c64">
          未计量售水量:
          <label id="waterunsold">{{ item.waterunSold?item.waterunSold:0 }} m³</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #ea7e5364" rowspan="2">
          免费售水量<br />
          <label id="freewatersales">{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
        <td style="background-color: #ea7e5364">
          计量免费售水量:
          <label id="waterfree">{{ item.waterFree?item.waterFree:0 }} m³</label>
        </td>
        <td style="background-color: #e69d8764" rowspan="8">
          产销差水量<br />
          <label id="producesale">{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #ea7e5364">
          未计量免费售水量:
          <label id="waterunsoldfree">{{ item.waterUnsoldFree?item.waterUnsoldFree:0 }} m³</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #dd6b6664" rowspan="6">
          无效供水量<br />
          <label id="leaking">{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
        <td style="background-color: #e69d8764" rowspan="2">
          表观损失水量<br />
          <label id="apparentleaking">{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
        <td style="background-color: #e69d8764">
          失窃水量:
          <label id="waterstolen">{{ item.waterStolen?item.waterStolen:0 }} m³</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764">
          计量误差水量:
          <label id="watererror">{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764" rowspan="3">
          管网漏失水量<br />
          <label id="pipeleaking">{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
        <td style="background-color: #e69d8764">
          爆管漏水量:
          <label id="brokenlleakage">{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764">
          背景漏失水量:
          <label id="backgroundleakage">{{ item.waterError?item.waterError:0 }} m³</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764">
          水箱、水池的漏损水量及渗水量:
          <label id="waterseepage">{{ item.waterSeepage?item.waterSeepage:0 }} m³</label>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e69d8764">
          其它漏损水量<br />
          <label id="waterotherloss1">{{ item.waterOtherLoss?item.waterOtherLoss:0 }} m³</label>
        </td>
        <td style="background-color: #e69d8764">
          未注册用户用水和用户拒查等<br />
          管理因素导致的损失水量<br />
          <label id="waterotherloss">{{ item.waterError?item.waterSale:0 }} m³</label>
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
