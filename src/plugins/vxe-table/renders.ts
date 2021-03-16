import { RenderOptions, VXETable } from "vxe-table";

const installRenders = function() {
  // /**
  //  * 渲染器示例代码
  //  */
  // VXETable.renderer.add("common-demo", {
  //   renderDefault(h, renderOpts, params) {
  //     let { row, column } = params;
  //     let { events } = renderOpts;
  //     let value = row[column.property];
  //     let props = {
  //       class: "span-demo",
  //       ...renderOpts.props
  //     };
  //     /**
  //      * 处理事件
  //      */
  //     let onEvents: { [key: string]: Function } = {};
  //     if (events) {
  //       for (var name in events) {
  //         onEvents[name] = function(e: any) {
  //           let callback = (events as any)[name];
  //           callback(e, row);
  //         };
  //       }
  //     }
  //     return [h("span", { props, on: onEvents }, "DEMO - " + value)];
  //   }
  // });
};

export { installRenders };
