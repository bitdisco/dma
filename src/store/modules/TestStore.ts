import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";

export interface TestState {
  testName: string;
}

/*
@Module()
  参数一：module名称，开启命名空间后会以name为命名空间
  参数二：是否使用动态加载，简而言之只有在用到当前的module才会加载，详细可以看vuex官网
  参数三：是否开启命名空间，如果你的模块很多，强烈建议开启
  参数四：挂载的store目标
*/
@Module({ name: "test", dynamic: true, namespaced: true, store })
class Test extends VuexModule implements TestState {

  get GetTestName() {
    return this.testName;
  }
  /** 定义变量 */
  public testName: string = "";

  /**
   * 更新布局配置
   */
  @Action
  public async loadLayout(name: string) {
    this.SET_TESTNAME(name);
  }

  @Mutation
  private SET_TESTNAME(name: string) {
    this.testName = name;
  }
}

export const TestModule = getModule(Test);
