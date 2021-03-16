<template>
  <a-date-picker
    :value="selectedValue"
    :show-time="{ format: 'HH:mm' }"
    @change="onChange"
    v-bind="$props"
  >
  </a-date-picker>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import moment from "moment";

@Component({ name: "cr-date-time-picker" })
export default class CrDateTimePicker extends Vue {
  /**
   * 绑定值
   */
  @Prop({ default: null }) public value!: string;

  /**
   *
   */
  @Prop({ default: "YYYY-MM-DD HH:mm" }) public dateFormat!: string;

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
