<template>
  <cr-modal
    :title="isEdit ? '修改' : '添加'"
    :width="1000"
    :height="550"
    v-model="modalVisible"
    @ok="onSubmit"
    :confirmLoading="submitLoading"
  >
    <a-form-model ref="form" v-bind="formLayout" :rules="rules" :model="model">
      <a-tabs :default-active-key="1" tab-position="left">
        <!-- 基础信息 -->
        <a-tab-pane :key="1" tab="基础信息">
          <div class="tab-paneBox">
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="监测点名称"
                  prop="meterName"
                >
                  <a-input v-model="model.meterName"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="监测点编码"
                  prop="meterCode"
                >
                  <a-input v-model="model.meterCode"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="挂接表号"
                  prop="addressCode"
                >
                  <a-input v-model="model.addressCode"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="SIM卡号" prop="sIM">
                  <a-input v-model="model.sIM"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="管线直径"
                  prop="diameter"
                >
                  <a-input v-model="model.diameter"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="管线材质"
                  prop="material"
                >
                  <a-input v-model="model.material"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="安装地址"
                  prop="installAddress"
                >
                  <a-input v-model="model.installAddress"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="安装日期"
                  prop="installDate"
                >
                  <a-input v-model="model.installDate"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="XY坐标" prop="xY">
                  <a-input v-model="model.xY"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="监测点编码"
                  prop="meterCode"
                >
                  <a-input v-model="model.meterCode"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="排序码"
                  prop="sortCode"
                >
                  <a-input v-model="model.sortCode"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="有效标志"
                  prop="enabledMark"
                >
                  <a-switch v-model="model.enabledMark" />
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-model-item
                  v-bind="formLayoutText"
                  has-feedback
                  label="备注"
                  prop="description"
                >
                  <a-input v-model="model.description" type="textarea" />
                </a-form-model-item>
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
        <!-- 供电设施 -->
        <a-tab-pane :key="2" tab="供电设施">
          <div class="tab-paneBox">
            <a-row>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="太阳能杆编号" prop="solarCode">
                  <a-input v-model="model.solarCode"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="DTU序列号" prop="dtuSN">
                  <a-input v-model="model.dtuSN"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="品牌厂家" prop="solarFactory">
                  <a-input v-model="model.solarFactory"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="安装坐标" prop="solarCoordinate">
                  <a-input v-model="model.solarCoordinate"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="责任人" prop="solarSupervisor">
                  <a-input v-model="model.solarSupervisor"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="联系方式" prop="solarPhone">
                  <a-input v-model="model.solarPhone"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-form-model>
  </cr-modal>
</template>
<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import {
  FormPageVue,
  ISelectOptionItem,
  ITreeOptionItem,
  ITreeOptions,
} from "@cr/types";
import api from "@/api/dma/generatorApis/meter";

import { FormModel } from "ant-design-vue";
import { FormLayoutInfo } from "@cr/types/app/form";

@Component<MeterFormPage>({ name: "MeterFormPage" })
export default class MeterFormPage extends FormPageVue<any, string> {
  protected formLayoutInput: FormLayoutInfo = {
    labelCol: { span: 6 },
    labelAlign: "right",
    wrapperCol: { span: 16 },
  };
  protected formLayoutText: FormLayoutInfo = {
    labelCol: { span: 3 },
    labelAlign: "right",
    wrapperCol: { span: 20 },
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
      meterName: [{ required: true, message: "请输入监测点名称~" }],
      meterCode: [{ required: true, message: "请输入监测点编码~" }],
      addressCode: [{ required: true, message: "请输入挂接表号~" }],
    };
    this.formLayout = {
      layout: "horizontal",
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
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
    api
      .create(this.getModel)
      .then((res) => {
        this.submitLoading = false;
        this.$emit("input", false);
        this.$emit("success");
      })
      .catch((err: any) => {
        this.submitLoading = false;
      });
  }

  /**
   * 修改
   */
  private submitUpdate() {
    this.submitLoading = true;
    api
      .update(this.getModel.id, this.getModel)
      .then((res) => {
        this.submitLoading = false;
        this.$emit("input", false);
        this.$emit("success");
      })
      .catch((err: any) => {
        this.submitLoading = false;
      });
  }
}
</script>

