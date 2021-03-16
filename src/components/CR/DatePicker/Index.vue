<template>
  <a-date-picker :value="selectedValue" @change="onChange" v-bind="$props">
    <slot name="suffixIcon" slot="suffixIcon"></slot>
    <slot name="dateRender" slot="dateRender"></slot>
  </a-date-picker>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import moment from "moment";

@Component({ name: "cr-date-picker" })
export default class CrDatePicker extends Vue {
  /**
   * 绑定值
   */
  @Prop({ default: null }) public value!: string;

  /**
   * 日期格式化
   */
  @Prop({ default: "YYYY-MM-DD HH:MM" }) public dateFormat!: string;

  /**
   * 选择日期对象(moment)
   */
  private get selectedValue() {
    if (this.value && this.value !== "") {
      return moment(this.value, this.dateFormat);
    } else {
      return null;
    }
  }

  /**
   *
   */
  private onChange(date: any, dateString: string) {
    this.$emit("input", dateString);
  }
}
</script>
