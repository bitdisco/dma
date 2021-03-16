import Vue from "vue";
import Vuex from "vuex";
import { TestState } from "./modules/TestStore";
import { getModule } from "vuex-module-decorators";
import { IVuexModuleDefine } from "@cr/types";
// 按需引入
// import App from "@cr/utils/store/modules/AppStore";
// import User from "@cr/utils/store/modules/AppStore";
// import vuexModuleRegister from "@cr/utils/store";

// 引入全局里的
import { App, User, DataStore, vuexModuleRegister } from "@cr/utils";

Vue.use(Vuex);

export interface RootState {
  test: TestState;
}

const store = new Vuex.Store<RootState>({
  modules: {
    app: App,
    user: User,
    data: DataStore,
  },
});

export const UserModule = getModule(User, store);
export const AppModule = getModule(App, store);
export const DataModule = getModule(DataStore, store);

/**
 * 注册vuexModule(供'@cr/components'内的组件和'@cr/utils'内的方法使用)
 */
const vuexModule: IVuexModuleDefine = {
  UserModule,
  AppModule,
  DataModule,
};
vuexModuleRegister(vuexModule);

export default store;
