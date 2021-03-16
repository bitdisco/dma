<template>
  <a-select :mode="selectMode"
            :placeholder="placeholder"
            @change="handleChange"
            v-model="roleModel"
            allow-clear>
    <a-select-option v-for="item in roleData" :key="item.name || item.extraProperties.displayName">
      {{ item.extraProperties.displayName }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import RoleApi from "@/api/platform/generatorApis/Role";

@Component<CrRoleSelect>({
  name: "CrRoleSelect",
})

export default class CrRoleSelect extends Vue {
  @Prop({default: "请选择角色"}) public placeholder!: string;
  @Prop({default: "multiple"}) public selectMode!: string;
  @Prop({default: () => []}) public selectData!: string[];

  private roleData: any[] = [];
  private roleModel: string[] = this.selectData;

  @Watch("selectData")
  public selectDataChange(val: string[]) {
    if (val) {
      this.roleModel = this.selectData;
    }
  }

  public created() {
    this.getSelectData();
  }

  /**
   * 获取角色数据
   * */
  private getSelectData() {
    RoleApi.platformAll().then((res: any) => {
      this.roleData = res.items;
    });
  }

  /**
   * 获取角色数据
   * */
  private handleChange() {
    this.$emit("selectRoleInfo", this.roleModel);
  }
}
</script>

<style scoped>

</style>
