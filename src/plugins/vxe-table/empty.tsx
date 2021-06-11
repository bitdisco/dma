import VXETable from "vxe-table"

const emptyRenders = function () {
  // 创建一个简单的空内容渲染
  VXETable.renderer.add('NotData', {
    // 空内容模板
    renderEmpty() {
      return [
        <span>
          <img src="/static/vxe-table/empty.svg"/>
          <p style="color:#ccc;font-size:13px;">暂无数据</p>
        </span>
      ]
    }
  })
}

export {emptyRenders}
