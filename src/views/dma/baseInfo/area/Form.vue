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
                  label="父级分区"
                  prop="parentId"
                >
                  <a-input v-model="model.parentId"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="分区级别"
                  prop="areaGrade"
                >
                  <a-input v-model="model.areaGrade"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="分区名称"
                  prop="areaName"
                >
                  <a-input v-model="model.areaName"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="分区编号" prop="areaCode">
                  <a-input v-model="model.areaCode"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="负者人"
                  prop="principal"
                >
                  <a-input v-model="model.principal"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="联系电话"
                  prop="principalPhone"
                >
                  <a-input v-model="model.principalPhone"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="建设年代"
                  prop="constructionYear"
                >
                  <a-input v-model="model.constructionYear"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                      <a-form-model-item
                  v-bind="formLayoutInput"
                  has-feedback
                  label="是否通水"
                  prop="noWater"
                >
                    <a-switch v-model="model.noWater" />
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
        <!-- 漏损配置 -->
        <a-tab-pane :key="2" tab="漏损配置">
          <div class="tab-paneBox">
            <a-row>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="大用户夜间用水量" prop="enterpriseWaterDemand">
                  <a-input v-model="model.enterpriseWaterDemand"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="夜间平均压力" prop="averageNightPressure">
                  <a-input v-model="model.averageNightPressure"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="居民用户数量" prop="residentNumber">
                  <a-input v-model="model.residentNumber"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="主干管道长度" prop="mainPipeLength">
                  <a-input v-model="model.mainPipeLength"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="私有管道平均长度" prop="subPipeLength">
                  <a-input v-model="model.subPipeLength"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="私有管道数量" prop="subPipeNumber">
                  <a-input v-model="model.subPipeNumber"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item v-bind="formLayoutInput" has-feedback label="ICF因子" prop="iCF">
                  <a-input v-model="model.iCF"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
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
import api from "@/api/dma/generatorApis/area";

import { FormModel } from "ant-design-vue";
import { FormLayoutInfo } from "@cr/types/app/form";

@Component<AreaFormPage>({ name: "AreaFormPage" })
export default class AreaFormPage extends FormPageVue<any, string> {
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
      areaGrade: [{ required: true, type:"number",defaultField: 1}],
      areaName: [{ required: true, message: "请输入DMA分区名称~" }],
      areaCode: [{ required: true, message: "请输入DMA分区编码~" }],

      //大用户夜间用水量
      enterpriseWaterDemand: [{ required: true,type:"number", defaultField: 0 }],              
      //夜间平均压力
      averageNightPressure: [{ required: true, type:"number",defaultField: 30 }],      
      //居民用户数量
      residentNumber: [{ required: true, type:"number",defaultField: 1500 }],
      //主干管道长度
      mainPipeLength: [{ required: true, type:"number",defaultField: 2000 }],
      //私有管道平均长度
      subPipeLength: [{ required: true, type:"number",defaultField: 2 }],
      //私有管道数量
      subPipeNumber: [{ required: true, type:"number",defaultField: 1500 }],
      //ICF因子
      iCF: [{ required: true, type:"number",defaultField: 4 }],
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

