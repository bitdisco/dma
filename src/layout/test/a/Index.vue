<template>
  <page-header-wrapper hide-title-bar>
    <div class="dashboard-admin-container">


      

      <div class="dashboard-L">
        <div class="today-history">
          <div class="com-tit"><h4>漏损分析图</h4></div>
          <div class="chart-container">
            <area-chart
              id="demoCharts"
              ref="demoCharts"
              height="100%"
              width="100%"
            ></area-chart>
          </div>
        </div>
        <div class="today-history">
          <div class="com-tit"><h4>饼状图</h4></div>
          <div class="chart-container">
            <area-chart
              id="pieCharts"
              ref="pieCharts"
              height="100%"
              width="100%"
            ></area-chart>
          </div>
        </div>
        
        
      </div>
      <div class="dashboard-R">
        <div class="boxall">
          范德萨范德萨范德萨发的撒范德萨狗头人狗头人给他们为热情你感觉发多少国际男团让我哥
          <div class="boxfoot"></div>
        </div>
        <div class="div1">
          大多数范德萨发光时代丰东股份
        </div>
        <div class="div2"></div>
        <div class="div3"></div>
        <div class="partcomwithborder">
          <div class="partcomwithbordersubcontent"></div>
        </div>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AreaChart from "@/components/Charts/AreaChart.vue";
import { weatherApi } from "@cr/utils";
import { defaultBaseConfig } from "@/config";
import { QuickNav } from "@/config/dashboard";
import NewsApi from "@/api/platform/generatorApis/News";
import StatApi from "@/api/platform/generatorApis/Stat";
import QuartzTaskApi from "@/api/platform/generatorApis/QuartzTask";

const moment = require("moment");

@Component({
  name: "DashboardEditor",
  components: {
    AreaChart,
  },
})
export default class extends Vue {
  private noticeItems = []; // 站点公告
  private newsItems = []; // 企业新闻
  private statsData: any = [];
  // 新增修改数据对象
  private model = {};

  // 表格数据加载
  private tableLoading: Boolean = false;
  private weatherData: any = []; // 实时天气数组
  private iconArr = [
    "/img/home_icon_08.png",
    "/img/home_icon_09.png",
    "/img/home_icon_10.png",
    "/img/home_icon_11.png",
    "/img/home_icon_12.png",
    "/img/home_icon_13.png",
    "/img/home_icon_14.png",
    "/img/home_icon_07.png",
  ];

  public created() {
    this.getIp();
    this.getStatData();
    this.getStatsData();
    this.getQuartzTaskList();
    this.getNoticeItems();
  }
  public mounted() {
    this.pieInitCharts();
    
  }
  private get modulesItems() {
    return QuickNav;
  }

  /**
   * 获取企业新闻数据
   * */
  private getQuartzTaskList() {
    const seachItems: any = {
      skipCount: 0,
      maxResultCount: 5,
    };
    QuartzTaskApi.getPageList(seachItems).then((res: any) => {
      this.newsItems = res.items;
    });
  }

  /**
   * 获取最新公告数据
   * */
  private getNoticeItems() {
    const seachItems: any = {
      skipCount: 0,
      maxResultCount: 5,
      moduleCode: defaultBaseConfig.moduleCode,
    };
    NewsApi.getPageList(seachItems).then((res: any) => {
      this.noticeItems = res.items;
    });
  }

  /**
   * 获取Stats数据
   * */
  private getStatsData() {
    StatApi.stats().then((res: any) => {
      this.statsData = res;
    });
  }

  /**
   * 获取echarts数据
   * */
  private getStatData() {
    const time = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
    const yesterday = new Date(time);
    const today = new Date();
    const beginTime = moment(yesterday).format("YYYY-MM-DD HH:mm:ss");
    const endTime = moment(today).format("YYYY-MM-DD HH:mm:ss");
    const postModel = {
      beginTime,
      endTime,
    };
    NewsApi.getStat(postModel).then((res: any) => {
      this.initCharts(res.xData, res.yData);
      
    });
  }

  /**
   * 获取ip
   * */
  private getIp() {
    weatherApi
      .getIpInfo()
      .then((res: any) => {
        this.getWeather(res.cid);
        setInterval(() => {
          this.getWeather(res.cid);
        }, 1000 * 60 * 10);
      })
      .catch((r) => {
        console.log("getWeather ERR:->", r);
      });
  }

  /**
   * 获取天气
   */
  private getWeather(id: number) {
    const seachItems: any = {
      appid: "87392984",
      appsecret: "fmBWF6GE",
      version: "v6",
      cid: id,
    };
    weatherApi
      .getWeatherInfo(seachItems)
      .then((res: any) => {
        console.log("天气", res);
        this.weatherData = res;
      })
      .catch((r: any) => {
        console.log(r);
      });
  }
  private pieInitCharts() {
    const options = {
      title: {
        text: "某站点用户访问来源",
        subtext: "纯属虚构",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    (this.$refs.pieCharts as any).initChart(options);
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
}
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dashboard-admin-container {
  display: flex;
  justify-content: space-between;
  background: #f0f2f5;
}

.dashboard-L {
  width: calc(100% - 480px);
}

.dashboard-R {
  width: 465px;
  height: 100%;
}

.com-tit {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  line-height: 35px;

  a {
    color: #1991ff;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }

  h4,
  h2 {
    color: #000;
    font-size: 15px;
    margin: 0;

    span {
      color: #f2414f;
      display: inline-block;
      margin-left: 10px;
      vertical-align: middle;
      margin-top: -3px;
    }
  }
}

.data-list {
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0 0 10px 0;

  li {
    border-radius: 4px;
    background: #fff;
    width: calc(25% - 12px);
    padding: 18px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 30px;
      margin: 0;

      em {
        display: block;
        font-style: normal;
        color: #000;
        font-size: 24px;
        font-weight: 500;
      }
    }

    img {
      width: 50px;
    }
  }
}

.today-history {
  width: 100%;
  border-radius: 4px;
  background: #fff;
  margin: 15px 0;
}

.news-list {
  display: flex;
  justify-content: space-between;
}

.news-item {
  width: calc(50% - 7.5px);
  border-radius: 4px;
  background: #fff;

  ul {
    padding: 18px 24px;
    box-sizing: border-box;

    li {
      position: relative;

      &:before {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 2px;
        height: 2px;
        background: #000000;
      }

      a {
        display: block;
        width: calc(100% - 10px);
        margin-left: 10px;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.65);
        transition: all 0.8s;

        &:hover {
          text-decoration: underline;
          cursor: pointer;

          em {
            color: rgba(0, 0, 0, 1);
          }
        }

        em {
          color: rgba(0, 0, 0, 0.65);
          font-style: normal;
          font-size: 16px;
          transition: all 0.8s;
        }

        span {
          &.danger {
            color: #f2414f;
          }

          &.urgent {
            color: #1991ff;
          }

          &.normal {
            color: #41c486;
          }
        }
      }
    }
  }
}

.table-container {
  border-radius: 4px;
  background: #fff;
  margin-top: 15px;
  padding-bottom: 15px;
}

.info-list {
  width: 100%;
}

.nav-fast {
  width: 100%;
  border-radius: 4px;
  background: #fff;
  margin: 15px 0;

  .icon-style {
    font-size: 25px;
  }

  ul {
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    padding: 0 12px;
    box-sizing: border-box;
    margin: 24px 0 0;

    li {
      width: calc(50% - 24px);

      .router {
        display: block;
        border: 2px solid rgba(230, 244, 238, 1);
        border-radius: 8px;
        margin-bottom: 24px;
        padding: 20px 0;
        box-sizing: border-box;
        text-align: center;
        transition: all 0.8s;

        p {
          color: rgba(0, 0, 0, 0.65);
          text-align: center;
          margin: 2px 0 0;
        }

        &:hover {
          border: 2px solid #41c486;

          p {
            font-weight: 500;
            color: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
  }
}

.weather {
  background: #fff;
  display: flex;
  padding: 10px 20px 6px;
  justify-content: space-between;

  .map {
    p {
      margin: 0;

      img {
        vertical-align: middle;
      }

      span {
        vertical-align: middle;
        margin-left: 5px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }
    }
  }

  .temperature {
    text-align: right;
    margin-left: 10px;

    b {
      font-size: 24px;
      display: block;
      font-weight: normal;
    }

    small {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
    }
  }

  .detail {
    position: relative;
    padding-left: 24px;

    &:before {
      position: absolute;
      left: 0;
      top: 10%;
      height: 80%;
      background: #eee;
      content: "";
      width: 1px;
    }

    p {
      margin: 0;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }

    em {
      display: block;
      background: #41c486;
      color: #fff;
      text-align: center;
      font-size: 12px;
      line-height: 16px;
      border-radius: 2px;
      height: 16px;
      font-style: normal;
      width: 50px;
      margin-top: 5px;
    }
  }
}

.table-cont {
  padding: 0 12px;
  box-sizing: border-box;
  margin: 20px 0 0;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 450px;
}
.boxall {
  border: 1px solid rgba(25, 186, 139, .17);
  padding: 0rem .3rem .3rem; 
  position: relative;
  margin-bottom: 1rem;
}

.boxall:before,
.boxall:after {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  content: "";
  border-top: 2px solid #02a6b5;
  top: 0;
}

.boxall:before,
.boxfoot:before {
  border-left: 2px solid #02a6b5;
  left: 0;
}

.boxall:after,
.boxfoot:after {
  border-right: 2px solid #02a6b5;
  right: 0;
}

.boxfoot {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}

.boxfoot:before,
.boxfoot:after {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  content: "";
  border-bottom: 2px solid #02a6b5;
  bottom: 0;
}
.div1{
  // position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(to left, #f00, #f00) left top no-repeat,
  linear-gradient(to bottom, #f00, #f00) left top no-repeat,
  linear-gradient(to left, #f00, #f00) right top no-repeat,
  linear-gradient(to bottom, #f00, #f00) right top no-repeat,
  linear-gradient(to left, #f00, #f00) left bottom no-repeat,
  linear-gradient(to bottom, #f00, #f00) left bottom no-repeat,
  linear-gradient(to left, #f00, #f00) right bottom no-repeat,
  linear-gradient(to left, #f00, #f00) right bottom no-repeat;
  background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
}
.div2{
  border: 1px red solid;
  // position: absolute;
  top: 20px;
  left: 150px;
  width: 100px;
  height: 100px;
  background: linear-gradient(to left, #f00, #f00) left top no-repeat,
  linear-gradient(to bottom, #f00, #f00) left top no-repeat,
  linear-gradient(to left, #f00, #f00) right top no-repeat,
  linear-gradient(to bottom, #f00, #f00) right top no-repeat,
  linear-gradient(to left, #f00, #f00) left bottom no-repeat,
  linear-gradient(to bottom, #f00, #f00) left bottom no-repeat,
  linear-gradient(to left, #f00, #f00) right bottom no-repeat,
  linear-gradient(to left, #f00, #f00) right bottom no-repeat;
  background-size: 2px 20px, 20px 2px, 2px 20px, 20px 2px;
}
.div3{

  box-shadow: 0 0 2.5vw #237ad4 inset;
  background: linear-gradient(#1359df, #1359df) left top,
  linear-gradient(#1359df, #1359df) left top,
  linear-gradient(#1359df, #1359df) right top,
  linear-gradient(#1359df, #1359df) right top,
  linear-gradient(#1359df, #1359df) left bottom,
  linear-gradient(#1359df, #1359df) left bottom,
  linear-gradient(#1359df, #1359df) right bottom,
  linear-gradient(#1359df, #1359df) right bottom;
  background-repeat: no-repeat;
  background-size: 0.1vw 18vw, 1.5vw 0.1vw;

}
.partcomwithborder{
  background:
          linear-gradient(to bottom,#33cdfa 0px,#33cdfa 2px,transparent 3px,transparent 100%) left top no-repeat,
          linear-gradient(to right,#33cdfa 0px,#33cdfa 2px,transparent 3px,transparent 100%) left top no-repeat,
          linear-gradient(to bottom,#33cdfa 0px,#33cdfa 2px,transparent 3px,transparent 100%) right top no-repeat,
          linear-gradient(to left,#33cdfa 0px,#33cdfa 2px,transparent 3px,transparent 100%) right top no-repeat,
          linear-gradient(to top,#33cdfa 0px,#33cdfa 2px,transparent 3px,transparent 100%) left bottom no-repeat,
          linear-gradient(to right,#33cdfa 0px,#33cdfa 2px,transparent 3px,transparent 100%) left bottom no-repeat,
          linear-gradient(to top,#33cdfa 0px,#33cdfa 2px,transparent 3px,transparent 100%) right bottom no-repeat,
          linear-gradient(to left,#33cdfa 0px,#33cdfa 2px,transparent 3px,transparent 100%) right bottom no-repeat;
  background-size: 18px 18px;
  padding: 2px;
  width: 200px;
  height: 200px;
}
.partcomwithbordersubcontent{
  border: 1px solid #33cdfa;
  background:#01356799;
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
