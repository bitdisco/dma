<template>
  <div class="card-module">
    <div class="example" v-if="!cardLoading && list.length == 0">暂无数据</div>

    <div class="example" v-else-if="cardLoading">
      <a-spin />
    </div>
    <div class="card-list" v-else>
      <li class="card-list-item" v-for="(item, i) in list" :key="i">
        <div class="card-list-title">
          <h4 class="name" :title="item.meterName">{{ item.meterName }}</h4>
          <h4 class="code">{{ item.addressCode }}</h4>
        </div>
        <div class="card-list-content">
          <li>
            <p class="label">正向累计流量</p>
            <p class="value">{{ item.forValue }}吨</p>
          </li>
          <li>
            <p class="label">反向累计流量</p>
            <p class="value">{{ item.revValue }}吨</p>
          </li>
          <li>
            <p class="label">瞬时流量</p>
            <p class="value">
              {{ item.realValue }}吨/小时 <a-icon type="bar-chart" class="icon" @click="getChart"/>
            </p>
          </li>
          <li>
            <p class="label">压力</p>
            <p class="value">
              {{ item.pressValue }}MPa <a-icon type="bar-chart" class="icon" @click="getChart"/>
            </p>
          </li>
          <li>
            <p class="label">电池电压</p>
            <p class="value">
              {{ item.celVal }}V <a-icon type="bar-chart" class="icon" @click="getChart"/>
            </p>
          </li>
          <li>
            <p class="label">最后采集时间</p>
            <p class="value">{{ item.createTime }}</p>
          </li>
        </div>
      </li>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component<CardList>({
  name: "CardList",
})
export default class CardList extends Vue {
  @Prop({ default: () => [] }) private list!: Array<any>;
  @Prop({ default: false }) private cardLoading!: boolean;


  private getChart(){
    
  }
}
</script>
<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";
.card-module {
  width: 100%;
  overflow: auto;
  height: 100%;

  .example {
    background: rgba(0, 0, 0, 0.05);
    width: 100%;
    color: @primary-color;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .card-list {
    display: flex;
    justify-content: flex-start;
    flex-flow: wrap;
    li {
      list-style: none;
    }
    &-item {
      width: 24%;
      border: 2px @primary-color solid;
      margin: 5px;
      border-radius: 5px;
    }

    &-title {
      display: flex;
      background: @primary-color;
      justify-content: center;
      align-content: center;
      align-items: center;
      border-bottom: 2px solid #e6ebf5;
      box-sizing: border-box;
      padding: 8px 5px;

      .name {
        flex: 1;
      }
      .name,
      .code {
        color: #fff;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 18px;
      }
    }
    &-content {
      padding: 0 5px;
      margin: 0;
      letter-spacing: 0.5px;
      color: #303133;
      font-size: 13px;
      li {
        height: 27px;
        display: flex;
        .label {
          flex: 1;
        }
        .value {
          letter-spacing: 1px;
          .icon {
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
