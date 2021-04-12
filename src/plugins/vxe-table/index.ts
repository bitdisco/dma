import { installRenders } from "./renders";
import { installXRenders } from "./rendersx";
import { installVxeTableRenders } from "@cr/utils/vxe-table/renders";

export default {
  install(Vue: any) {
    installVxeTableRenders();
    installRenders();
    installXRenders()
  }
};
