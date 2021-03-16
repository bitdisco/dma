<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <h1>关于我们</h1>
      <p>系统功能介绍及项目研发团队介绍</p>
    </a-card>
  </page-header-wrapper>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "AboutPage", components: {} })
export default class AboutPage extends Vue {
  public async created() {
    await this.$initAreas();
    await this.$initSites();
    await this.$initDictionarys();
    await this.$initOrganizes();
    await this.$initAllUsers();
  }
}
</script>
