/**
 * 全局URL配置说明 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-3-17 22:35:30
 * 接口生成地址：http://localhost:44333/swagger/v1/swagger.json
 */
export default {
  /**
   * 
   */
  abpApiDefinition:{
    apiDefinition:"/api/abp/api-definition" 
  },
  /**
   * 
   */
  abpApplicationConfiguration:{
    applicationConfiguration:"/api/abp/application-configuration" 
  },
  /**
   * 
   */
  abpTenant:{
    byName:"/api/abp/multi-tenancy/tenants/by-name/{name}", 
    byId:"/api/abp/multi-tenancy/tenants/by-id/{id}" 
  },
  /**
   * 
   */
  alarm:{
    create:"/api/dMA/alarm", //新增
    getPageList:"/api/dMA/alarm", //获取列表
    delete:"/api/dMA/alarm/{id}", //删除
    get:"/api/dMA/alarm/{id}", //获取某条记录
    update:"/api/dMA/alarm/{id}" //修改
  },
  /**
   * 
   */
  alarmInfo:{
    create:"/api/dMA/alarmInfo", //新增
    getPageList:"/api/dMA/alarmInfo", //获取列表
    delete:"/api/dMA/alarmInfo/{id}", //删除
    get:"/api/dMA/alarmInfo/{id}", //获取某条记录
    update:"/api/dMA/alarmInfo/{id}" //修改
  },
  /**
   * 
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
   * 
   */
  areaItem:{
    create:"/api/dMA/areaItem", //新增
    getPageList:"/api/dMA/areaItem", //获取列表
    delete:"/api/dMA/areaItem/{id}", //删除
    get:"/api/dMA/areaItem/{id}", //获取某条记录
    update:"/api/dMA/areaItem/{id}" //修改
  },
  /**
   * 
   */
  areaMeter:{
    create:"/api/dMA/areaMeter", //新增
    getPageList:"/api/dMA/areaMeter", //获取列表
    delete:"/api/dMA/areaMeter/{id}", //删除
    get:"/api/dMA/areaMeter/{id}", //获取某条记录
    update:"/api/dMA/areaMeter/{id}", //修改
    tree:"/api/dMA/areaMeter/tree" //获取树型列表
  },
  /**
   * 
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
   * 
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
   * 
   */
  auditLogging:{
    get:"/api/platform/auditLogging/{id}", 
    getPageList:"/api/platform/auditLogging" 
  },
  
  /**
   * 
   */
  enum:{
    getPageList:"/api/utils/enum" 
  },
  /**
   * 
   */
  flowDay:{
    create:"/api/dMA/flowDay", //新增
    getPageList:"/api/dMA/flowDay", //获取列表
    delete:"/api/dMA/flowDay/{id}", //删除
    get:"/api/dMA/flowDay/{id}", //获取某条记录
    update:"/api/dMA/flowDay/{id}" //修改
  },
  /**
   * 
   */
  flowHour:{
    create:"/api/dMA/flowHour", //新增
    getPageList:"/api/dMA/flowHour", //获取列表
    delete:"/api/dMA/flowHour/{id}", //删除
    get:"/api/dMA/flowHour/{id}", //获取某条记录
    update:"/api/dMA/flowHour/{id}" //修改
  },
  /**
   * 
   */
  jobs:{
    leakageAlgorithmAsync:"/api/dMA/Jobs/LeakageAlgorithmAsync", 
    machiningDataAsync:"/api/dMA/Jobs/MachiningDataAsync" 
  },
  /**
   * 
   */
  leakageDay:{
    create:"/api/dMA/leakageDay", //新增
    getPageList:"/api/dMA/leakageDay", //获取列表
    delete:"/api/dMA/leakageDay/{id}", //删除
    get:"/api/dMA/leakageDay/{id}", //获取某条记录
    update:"/api/dMA/leakageDay/{id}", //修改
    getLeakageTree:"/api/dMA/leakageDay/getLeakageTree", //获取分区漏损树型列表
    getLeakageRanking:"/api/dMA/leakageDay/getLeakageRanking" //获取分区漏损数据
  },
  /**
   * 
   */
  leakageHour:{
    create:"/api/dMA/leakageHour", //新增
    getPageList:"/api/dMA/leakageHour", //获取列表
    delete:"/api/dMA/leakageHour/{id}", //删除
    get:"/api/dMA/leakageHour/{id}", //获取某条记录
    update:"/api/dMA/leakageHour/{id}", //修改
    getQueryList:"/api/dMA/leakageHour/getQueryList" //获取列表
  },
  /**
   * 
   */
  machiningData:{
    create:"/api/dMA/machiningData", //新增
    getPageList:"/api/dMA/machiningData", //获取列表
    delete:"/api/dMA/machiningData/{id}", //删除
    get:"/api/dMA/machiningData/{id}", //获取某条记录
    update:"/api/dMA/machiningData/{id}", //修改
    getQueryList:"/api/dMA/machiningData/getQueryList" //按条件查询列表
  },
  /**
   * 
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
   * 
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
   * 
   */
  migrate:{
    migrateData:"/api/dMA/migrateData" //同步分区数据
  },
  /**
   * 
   */
  mongoTest:{
    create:"/api/dMA/mongoTest", //新增
    getPageList:"/api/dMA/mongoTest", //获取列表
    delete:"/api/dMA/mongoTest/{id}", //删除
    get:"/api/dMA/mongoTest/{id}", //获取某条记录
    update:"/api/dMA/mongoTest/{id}", //修改
    test6:"/api/dMA/mongoTest/test6" 
  },
  /**
   * 
   */
  permissionDefine:{
    getPageList:"/api/utils/permissionDefine" 
  },
  /**
   * 
   */
  rptTemp:{
    create:"/api/dMA/rptTemp", //新增
    getPageList:"/api/dMA/rptTemp", //获取列表
    delete:"/api/dMA/rptTemp/{id}", //删除
    get:"/api/dMA/rptTemp/{id}", //获取某条记录
    update:"/api/dMA/rptTemp/{id}" //修改
  },
  /**
   * 
   */
  sample:{
    getPageList:"/api/DMA/sample", 
    authorized:"/api/DMA/sample/authorized" 
  },
  /**
   * 
   */
  setting:{
    delete:"/api/setting/{id}", 
    get:"/api/setting/{id}", 
    getInfoByName:"/api/setting/getInfoByName", 
    getPageList:"/api/setting", 
    create:"/api/setting", 
    batchSet:"/api/setting/batchSet", 
    setList:"/api/setting/setList", 
    mySetting:"/api/setting/mySetting" 
  },
  /**
   * 
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
}