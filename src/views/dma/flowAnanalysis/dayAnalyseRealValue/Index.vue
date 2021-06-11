<template>
  <tree-layout-page-wrapper :treeWidth="260">
    <template slot="tree">
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
            <a-button @click="querySearchDate('day')">今天</a-button>
            <a-button @click="querySearchDate('week')">近7天</a-button>
            <a-button @click="querySearchDate('month')">近1个月</a-button>
          </a-button-group>
          <a-button-group>
            <a-button @click="queryList" icon="sync">刷新</a-button>
            <a-button @click="createTab" icon="ordered-list">生成报表</a-button>
            <a-button @click="isEcharts" icon="bar-chart">生成图表</a-button>
          </a-button-group>
        </template>
      </advanced-search-panel>

      <div class="compact-page-table" v-if="showTable">
        <vxe-table
          id="vxeTable"
          :data="dataSource"
          :loading="loading"
          highlight-current-row
          highlight-hover-row
          @cell-click="onTableCellClick"
          border
          height="auto"
          :empty-render="{name:'NotData'}"
          :seq-config="{ startIndex: getSkipCount }"
          :custom-config="{ storage: true }"
        >
          <vxe-table-column type="seq" width="50" align="center"></vxe-table-column>
          <vxe-table-column v-bind="col" v-for="(col, index) in columns" :key="index"></vxe-table-column>
        </vxe-table>
      </div>
      <div class="chart-container" v-if="showEcharts">
        <area-chart ref="demoCharts" height="100%" width="100%"/>
      </div>
      <div class="table-pagination" v-if="showTable">
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
import { Component } from "vue-property-decorator";
import { ToolbarActionItem, ListPageVxe } from "@cr/types";
import MachApi from "@/api/dma/generatorApis/machiningData";
import AreaApi from "@/api/dma/generatorApis/area";
import AddressTree from "@/components/Tree/AddressTree.vue"
import MonitorTree from "@/components/Tree/MonitorTree.vue"
import AreaTree from "@/components/Tree/AreaTree.vue"
import { ArmRealDataDto } from "@/api/dma/types";
import moment from "moment";
import AreaChart from "@/components/Charts/AreaChart.vue";
import NewsApi from "@/api/platform/generatorApis/News";

@Component<DayAnalyseRealValue>({
  name: "DayAnalyseRealValue",
  components:{AddressTree, AreaTree, MonitorTree,AreaChart}
})
export default class DayAnalyseRealValue extends ListPageVxe<ArmRealDataDto, string> {
  //#region 树控件相关
  private expandedKeys: string[] = [];

  private treeData: Array<any> = [];

  //控制显示表单或者图表
  private showTable: boolean = true;
  private showEcharts: boolean = false;

  private isTable(){
    this.showEcharts = false;
    this.showTable = true;
  }
  private isEcharts(){
    this.showTable = false;
    this.showEcharts = true;
    this.initialDate();
    this.getStatData();
  }

  //根据时间加载列表或图表数据
  private querySearchDate(time:string) {
    const today = new Date();
    if(time === 'day'){
      this.searchModel.startTime = moment(today).format('YYYY-MM-DD');
      this.searchModel.endTime = moment(today).format('YYYY-MM-DD');
    }
    if(time === 'week'){
      this.searchModel.startTime = moment(today).format('YYYY-MM-DD');
      this.searchModel.endTime = moment(today).add(1, 'weeks').format('YYYY-MM-DD');
    }
    if(time === 'month'){
      this.searchModel.startTime = moment(today).format('YYYY-MM-DD');
      this.searchModel.endTime = moment(today).add(1, 'months').format('YYYY-MM-DD');
    }
    //加载表单或者图表数据
    if(this.showTable === true){
      this.queryList();
    } else {
      this.getStatData();
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
          disabledDate: (this as any).disabledDate
        },
        events:{
          change:(data:any)=>{
            this.searchModel.startTime = data
          }
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
          disabledDate: (this as any).disabledDate
        },
        events:{
          change:(data:any)=>{
            this.searchModel.endTime = data
          }
        },
      },
    ];
    //searchModel外追加右侧列表查询参数
    this.searchModel = {
      startTime: '',
      endTime: '',
      queryType: 0,//默认为0
      addressCodes: [],//数组类型
      isPage: false
    }
  }
  //#endregion
  //#region 组件挂载成功后执行

  mounted() {
    this.queryAreaTree();
    this.initialDate();
  }
  //初始时间加载
  private initialDate(){
    const today = new Date();
    this.searchModel.startTime = moment(today).format('YYYY-MM-DD');
    this.searchModel.endTime = moment(today).format('YYYY-MM-DD');
  }

  //#endregion
  //#region 查询方法

  private onSearch() {
    let selectDate = "";
    let today = moment().format("YYYY-MM-DD");
    this.searchModel.countDate? selectDate = this.searchModel.countDate : selectDate = today;
    this.getPagination.current = 1;
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
    /**
     * 查询条件
     */
    //本页查询条件添加
    if(!this.searchModel.addressCodes || !this.searchModel.addressCodes.length){
      // this.alertInfo();
      this.loading = false;
      return false
    }

    let queryModel = Object.assign(
      {
        MaxResultCount: this.getMaxResultCount,
        SkipCount: this.getSkipCount,
      },
      this.searchModel
    );

    MachApi.getDayContrast(queryModel).then((res:any) => {
      if(!res){
        this.loading = false;
        return false
      }
      res.columns.forEach((value:any,key:any) => {
        this.columns.push({title:value.headerName,...value})
      });
      this.loading = false;
      this.dataSource = res.data.items;
      this.getPagination.total = res.totalCount;
    }).catch((err:any) => {
      alert(err);
      this.loading = false;
    });
    this.currentRow = null;
    this.loading = true;
    this.isTable();
  }

  /*树点击事件*/
  private getTreeNode(val:any){
    console.log("点击树信息",val);
    if(val.addressCode){
      if(!val.type){
        val.type = 0
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
    this.$message.info('请先选择左侧子节点!');
  };

  /**
   * 获取echarts数据
   * */
  private getStatData() {
    const postModel = {
      beginTime: this.searchModel.startTime,
      endTime: this.searchModel.endTime,
    };
    NewsApi.getStat(postModel).then((res: any) => {
      console.log(res)
      this.initCharts(res.xData, res.yData);
    });
  }

  /**
   * 初始化echarts
   * */
  private initCharts(xArry: any, data: any) {
    const options = {
      tooltip: {
        trigger: "axis",
      },
      grid: {
        containLabel: true,
        left: "20",
        right: "20",
        bottom: "30",
        top: "30",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xArry,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#999",
          },
          rotate: 40,
        },
      },
      yAxis: {
        type: "value",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#999",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#eee"],
            width: 1,
            type: "solid",
          },
        },
      },
      series: [
        {
          data,
          type: "line",
          smooth: true,
          itemStyle: {
            borderWidth: 2,
            color: "rgb(65, 196, 134,1)",
          },
          symbol: "emptyCircle", // 设定为实心点
          symbolSize: 6,

          areaStyle: {
            normal: {
              color: {
                type: "linear", // 设置线性渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(65, 196, 134,1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgb(65, 196, 134,0.1)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
          },
        },
      ],
    };
    (this.$refs.demoCharts as any).initChart(options);
  }

  //#endregion
}
</script>

<style scoped>
.vxetable {
  height: calc(100vh - 100px);
}

chart-container {
  width: 100%;
  height: 100%;
}
</style>
