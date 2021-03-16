<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const zhCN = require("ant-design-vue/lib/locale-provider/zh_CN").default;

@Component({
  components: {},
})
export default class App extends Vue {
  private locale: any = zhCN;
  public async created() {}
  public mounted() {}
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
}
</style>
