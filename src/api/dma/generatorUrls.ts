/**
 * 全局URL配置说明 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-18 11:21:04
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */
export default {
  /**
   * 测试
   */
  sample:{
    getPageList:"/api/DMA/sample", 
    authorized:"/api/DMA/sample/authorized" 
  },
  /**
   * 告警明细
   */
  alarmInfo:{
    create:"/api/dMA/alarmInfo", //新增
    getPageList:"/api/dMA/alarmInfo", //获取列表
    delete:"/api/dMA/alarmInfo/{id}", //删除
    get:"/api/dMA/alarmInfo/{id}", //获取某条记录
    update:"/api/dMA/alarmInfo/{id}" //修改
  },
  /**
   * 告警管理
   */
  alarm:{
    create:"/api/dMA/alarm", //新增
    getPageList:"/api/dMA/alarm", //获取列表
    delete:"/api/dMA/alarm/{id}", //删除
    get:"/api/dMA/alarm/{id}", //获取某条记录
    update:"/api/dMA/alarm/{id}" //修改
  },
  /**
   * 分区配置项
   */
  areaItem:{
    create:"/api/dMA/areaItem", //新增
    getPageList:"/api/dMA/areaItem", //获取列表
    delete:"/api/dMA/areaItem/{id}", //删除
    get:"/api/dMA/areaItem/{id}", //获取某条记录
    update:"/api/dMA/areaItem/{id}", //修改
    getInfoByAreaIdAsync:"/api/dMA/areaItem/GetInfoByAreaIdAsync", //获取某条记录
    getQueryList:"/api/dMA/areaItem/getQueryList" //按条件查询列表
  },
  /**
   * 分区监测点关联项
   */
  areaMeter:{
    create:"/api/dMA/areaMeter", //新增
    getPageList:"/api/dMA/areaMeter", //获取列表
    batchAddAsync:"/api/dMA/areaMeter/batchAddAsync", //添加
    delete:"/api/dMA/areaMeter/{id}", //删除
    get:"/api/dMA/areaMeter/{id}", //获取某条记录
    update:"/api/dMA/areaMeter/{id}", //修改
    tree:"/api/dMA/areaMeter/tree" //获取树型列表
  },
  /**
   * 分区管理
   */
  area:{
    create:"/api/dMA/area", //新增
    getPageList:"/api/dMA/area", //获取列表
    delete:"/api/dMA/area/{id}", //删除
    get:"/api/dMA/area/{id}", //获取某条记录
    update:"/api/dMA/area/{id}", //修改
    getAreaTree:"/api/dMA/area/getAreaTree", //获取分区树型列表
    getAreaMeterTree:"/api/dMA/area/getAreaMeterTree", //获取分区流量计树型列表
    getQueryList:"/api/dMA/area/getQueryList" //按条件查询列表
  },
  /**
   * 监测点管理
   */
  meter:{
    create:"/api/dMA/meter", //新增
    getPageList:"/api/dMA/meter", //获取列表
    delete:"/api/dMA/meter/{id}", //删除
    get:"/api/dMA/meter/{id}", //获取某条记录
    update:"/api/dMA/meter/{id}", //修改
    getQueryList:"/api/dMA/meter/getQueryList" //按条件查询列表
  },
  /**
   * 原始数据
   */
  armHistoryData:{
    create:"/api/dMA/armHistoryData", //新增
    getPageList:"/api/dMA/armHistoryData", //获取列表
    addAsync:"/api/dMA/armHistoryData/AddAsync", //新增
    delete:"/api/dMA/armHistoryData/{id}", //删除
    get:"/api/dMA/armHistoryData/{id}", //获取某条记录
    update:"/api/dMA/armHistoryData/{id}", //修改
    getQueryList:"/api/dMA/armHistoryData/getQueryList", //按条件查询列表
    get3DayContrastFlow:"/api/dMA/armHistoryData/get3DayContrastFlow", //3天流量对比
    get3DayContrastPressure:"/api/dMA/armHistoryData/get3DayContrastPressure", //3天压力对比
    get3DayContrastVoltage:"/api/dMA/armHistoryData/get3DayContrastVoltage" //3天电压对比
  },
  /**
   * 实时数据
   */
  armRealData:{
    create:"/api/dMA/armRealData", //新增
    getPageList:"/api/dMA/armRealData", //获取列表
    addAsync:"/api/dMA/armRealData/AddAsync", //添加
    delete:"/api/dMA/armRealData/{id}", //删除
    get:"/api/dMA/armRealData/{id}", //获取某条记录
    update:"/api/dMA/armRealData/{id}", //修改
    getQueryList:"/api/dMA/armRealData/getQueryList" //按条件查询列表
  },
  /**
   * 清洗数据
   */
  machiningData:{
    create:"/api/dMA/machiningData", //新增
    getPageList:"/api/dMA/machiningData", //获取列表
    delete:"/api/dMA/machiningData/{id}", //删除
    get:"/api/dMA/machiningData/{id}", //获取某条记录
    update:"/api/dMA/machiningData/{id}", //修改
    getQueryList:"/api/dMA/machiningData/getQueryList", //按条件查询列表
    getDayAnalyse:"/api/dMA/machiningData/getDayAnalyse", //获取日分析
    getDayContrast:"/api/dMA/machiningData/getDayContrast" //获取日对比
  },
  /**
   * 监测点月数据
   */
  flowDay:{
    create:"/api/dMA/flowDay", //新增
    getPageList:"/api/dMA/flowDay", //获取列表
    delete:"/api/dMA/flowDay/{id}", //删除
    get:"/api/dMA/flowDay/{id}", //获取某条记录
    update:"/api/dMA/flowDay/{id}" //修改
  },
  /**
   * 监测点日数据
   */
  flowHour:{
    create:"/api/dMA/flowHour", //新增
    getPageList:"/api/dMA/flowHour", //获取列表
    delete:"/api/dMA/flowHour/{id}", //删除
    get:"/api/dMA/flowHour/{id}", //获取某条记录
    update:"/api/dMA/flowHour/{id}" //修改
  },
  /**
   * 分区月数据
   */
  leakageDay:{
    create:"/api/dMA/leakageDay", //新增
    getPageList:"/api/dMA/leakageDay", //获取列表
    delete:"/api/dMA/leakageDay/{id}", //删除
    get:"/api/dMA/leakageDay/{id}", //获取某条记录
    update:"/api/dMA/leakageDay/{id}", //修改
    getLeakageTree:"/api/dMA/leakageDay/getLeakageTree", //获取分区漏损树型列表
    getLeakageRanking:"/api/dMA/leakageDay/getLeakageRanking", //获取分区漏损排行
    getLeakageLine:"/api/dMA/leakageDay/getLeakageLine", //获取分区漏损曲线
    getNightFlow:"/api/dMA/leakageDay/getNightFlow", //获取夜间流量数据
    getPipeLeakage:"/api/dMA/leakageDay/getPipeLeakage", //获取管网漏损数据
    getAreaWaterSupplyMonth:"/api/dMA/leakageDay/getAreaWaterSupplyMonth" //获取分区供水量月
  },
  /**
   * 分区日数据
   */
  leakageHour:{
    create:"/api/dMA/leakageHour", //新增
    getPageList:"/api/dMA/leakageHour", //获取列表
    delete:"/api/dMA/leakageHour/{id}", //删除
    get:"/api/dMA/leakageHour/{id}", //获取某条记录
    update:"/api/dMA/leakageHour/{id}", //修改
    getQueryList:"/api/dMA/leakageHour/getQueryList", //获取列表
    getAreaWaterSupplyDay:"/api/dMA/leakageHour/getAreaWaterSupplyDay" //获取分区供水量月
  },
  /**
   * 物料管理
   */
  materials:{
    create:"/api/dMA/materials", //新增
    getPageList:"/api/dMA/materials", //获取列表
    delete:"/api/dMA/materials/{id}", //删除
    get:"/api/dMA/materials/{id}", //获取某条记录
    update:"/api/dMA/materials/{id}", //修改
    categoryCount:"/api/dMA/materials/categoryCount" 
  },
  /**
   * 供应商管理相关
   */
  supplier:{
    create:"/api/dMA/supplier", //新增
    getPageList:"/api/dMA/supplier", //获取列表
    delete:"/api/dMA/supplier/{id}", //删除
    get:"/api/dMA/supplier/{id}", //获取某条记录
    update:"/api/dMA/supplier/{id}", //修改
    getPageListByFilter:"/api/dMA/supplier/getPageListByFilter", 
    all:"/api/dMA/supplier/all", 
    getByIdAsync:"/api/dMA/supplier/getByIdAsync" 
  },
  /**
   * 同步数据
   */
  migrate:{
    migrateData:"/api/dMA/migrateData" //同步分区数据
  },
}