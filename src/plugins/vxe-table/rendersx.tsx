import { IDictionary } from "@cr/types";
import { RenderOptions, VXETable } from "vxe-table";

const installXRenders = function () {


  /**
   * 设备挂接列表标题-渲染器
   */
  VXETable.renderer.add("area-meter-tag", {
    renderDefault(h, renderOpts, params) {
      let { row, column } = params;
      let value: any = row[column.property];

      if (value == '进水口') {
        return [<a-tag color="#0066FF"> {value} </a-tag>];
      } else if(value == '出水口'){
        return [<a-tag color="#FF4500"> {value} </a-tag>];
      }else{
        return value
      }
    }
  });
};

export { installXRenders };
