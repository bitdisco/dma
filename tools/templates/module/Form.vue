<template>
  <cr-modal
    :title="isEdit ? '添加' : '修改'"
    :width="800"
    :height="500"
    v-model="modalVisible"
    @ok="onSubmit"
    :confirmLoading="submitLoading"
  >
    <a-form-model ref="form" v-bind="formLayout" :rules="rules" :model="model">
      <% model.fields.forEach(function(item){ %>
      <a-form-model-item
        label="<%=item.description || item.name %>"
        prop="<%=item.name %>"
      >
        <a-input v-model="model.<%=item.name %>" />
      </a-form-model-item>
      <% }); %>
    </a-form-model>
  </cr-modal>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import {FormPageVue} from "@cr/types";
import { <%=model.formDtoType %> } from "@/api/<%=model.systemName %>/types";
import api from "@/api/<%=model.systemName %>/generatorApis/<%=model.apiModule %>";
import { FormModel } from "ant-design-vue";

@Component({})
export default class extends FormPageVue<
   <%=model.formDtoType %>,
  <%=model.idType %>
> {
  /**
   * 填报类型下拉数据源
   */
  private typeOptions: Array<any> = this.$enumOptions(this.$enums.REPORTTYPE);

  created() {
    this.rules = {
      <% model.fields.forEach(function(item){ %>
      <%=item.name %>: [{ required: true, message: "请输入<%=item.description %>~" }],<% }); %>
    };
    this.formLayout = {
      layout: "horizontal",
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      labelAlign: "right",
    };
  }

  mounted() {
    this.loadData();
  }

  /**
   * 加载数据
   */
  private loadData() {
    if (!this.isEdit) {
      return;
    }
    if (this.item) {
      this.onItemChanged();
      return;
    }
    api.get(this.id).then((res) => {
      this.loading = false;
      this.model = res;
    });
    this.loading = true;
  }

  /**
   * 提交保存
   */
  private onSubmit() {
    let form = this.$refs.form as FormModel;
    form.validate((isValid: boolean, model: any) => {
      console.log("isValid", isValid, model);
      if (isValid) {
        if (this.isEdit) {
          this.submitUpdate();
        } else {
          this.submitCreate();
        }
      }
    });
  }

  /**
   * 添加
   */
  private submitCreate() {
    this.submitLoading = true;
    api.create(this.getModel).then((res) => {
      this.submitLoading = false;
      this.$emit("input",false);
      this.$emit("success");
    });
  }

  /**
   * 修改
   */
  private submitUpdate() {
    this.submitLoading = true;
    api.update(this.getModel.id, this.getModel).then((res) => {
      this.submitLoading = false;
      this.$emit("input", false);
      this.$emit("success");
    });
  }
}
</script>
