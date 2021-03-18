<template>
  <cr-modal
    :title="isEdit ? '修改' : '添加'"
    :width="500"
    :height="450"
    v-model="modalVisible"
    @ok="onSubmit"
    :confirmLoading="submitLoading"
  >
    <a-form-model ref="form" v-bind="formLayout" :rules="rules" :model="model">
      <a-form-model-item
        v-bind="formLayout2"
        has-feedback
        label="模块名"
        prop="name"
      >
        <a-input v-model="model.name"></a-input>
      </a-form-model-item>

      <a-form-model-item
        v-bind="formLayout2"
        has-feedback
        label="编码"
        prop="enCode"
      >
        <a-input v-model="model.enCode" :disabled="isEdit"></a-input>
      </a-form-model-item>

      <a-form-model-item
        v-bind="formLayout2"
        has-feedback
        label="排序值"
        prop="displayOrder"
      >
        <a-input v-model="model.displayOrder"></a-input>
      </a-form-model-item>

      <a-form-model-item has-feedback label="说明" prop="description" v-bind="formLayout2">
        <a-input v-model="model.description" type="textarea"/>
      </a-form-model-item>

      <a-form-model-item
        v-bind="formLayout2"
        has-feedback
        label="是否有效"
        prop="enable"
      >
        <a-switch v-model="model.enable"/>
      </a-form-model-item>
    </a-form-model>
  </cr-modal>
</template>
<script lang="ts">
import {Component, Watch} from "vue-property-decorator";
import {
  FormPageVue,
  ISelectOptionItem,
  ITreeOptionItem,
  ITreeOptions,
} from "@cr/types";
import api from "@/api/dma/generatorApis/meter";

import {FormModel} from "ant-design-vue";
import {FormLayoutInfo} from "@cr/types/app/form";

@Component<CaliberFormPage>({name: "ManufacturerPage"})
export default class CaliberFormPage extends FormPageVue<any,
  string> {
  protected formLayout2: FormLayoutInfo = {
    labelCol: {span: 4},
    labelAlign: "right",
    wrapperCol: {span: 18},
  };

  private sum(vals: Array<number>) {
    let n = 0;
    vals.map((x) => {
      n += x;
    });
    return n;
  }

  created() {
    this.rules = {
      name: [{required: true, message: "请输入模块名称~"}],
      enCode: [{required: true, message: "请输入模块编码~"}],
      url: [{required: true, message: "请填写模块访问地址(URL) ~"}],
    };
    this.formLayout = {
      layout: "horizontal",
      labelCol: {span: 4},
      wrapperCol: {span: 18},
      labelAlign: "right",
    };
  }

  async mounted() {
    await this.loadData();
  }

  /**
   * 加载数据
   */
  private async loadData() {
    if (!this.isEdit) {
      this.model = {};
      return;
    }
    if (this.item) {
      this.onItemChanged();

      return;
    }
    api.get(this.id).then((res: any) => {
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
      console.log("isValid", isValid, model, this.getModel);
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
      this.$emit("input", false);
      this.$emit("success");
    }).catch((err: any) => {
      this.submitLoading = false;
    });
  }

  /**
   * 修改
   */
  private submitUpdate() {
    this.submitLoading = true;
    api.edit(this.getModel.id, this.getModel).then((res) => {
      this.submitLoading = false;
      this.$emit("input", false);
      this.$emit("success");
    }).catch((err: any) => {
      this.submitLoading = false;
    });
  }
}
</script>
