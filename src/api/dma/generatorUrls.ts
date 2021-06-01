/**
 * 全局URL配置说明 - 本文件由前端工具生成器自动生成
 * 生成日期：2021-6-1 14:43:46
 * 接口生成地址：http://36.133.33.128:4003/swagger/v1/swagger.json
 */
export default {
  /**
   * 分区管理相关
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
  }
}