<template>
  <cr-modal
    :title="isEdit ? '修改' : '添加'"
    :width="850"
    :height="550"
    v-model="modalVisible"
    @ok="onSubmit"
    :confirmLoading="submitLoading"
  >
    <a-form-model ref="form" v-bind="formLayout" :rules="rules" :model="model">
      <div class="bar-box">
        <p class="bar-box-title">基础信息配置</p>
        <div class="bar-box-item">
          <a-form-model-item
            v-bind="formLayoutText"
            has-feedback
            label="统计日期"
            prop="statisticalDate"
          >
            <a-month-picker
              placeholder="请选择月份"
              v-model="model.statisticalDate"
              style="width: 100%"
              format="YYYY-MM"
              @change="monChange"
            />
          </a-form-model-item>
          <a-form-model-item
            v-bind="formLayoutText"
            has-feedback
            label="备注"
            prop="description"
          >
            <a-input v-model="model.description" type="textarea" />
          </a-form-model-item>
        </div>
      </div>
      <div class="bar-box">
        <p class="bar-box-title">有效供水量</p>
        <div class="bar-box-item">
          <a-row>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="计量售水量"
                prop="waterSale"
              >
                <a-input-number
                  class="input-number"
                  v-model="model.waterSale"
                ></a-input-number>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="未计量售水量"
                prop="waterUnsold"
              >
                <a-input-number
                  class="input-number"
                  v-model="model.waterUnsold"
                ></a-input-number>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="计量免费售水量"
                prop="waterFree"
              >
                <a-input-number
                  class="input-number"
                  v-model="model.waterFree"
                ></a-input-number>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="未计量免费售水量	"
                prop="waterUnsoldFree"
              >
                <a-input-number
                  class="input-number"
                  v-model="model.waterUnsoldFree"
                ></a-input-number>
              </a-form-model-item>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="bar-box">
        <p class="bar-box-title">漏损水量</p>
        <div class="bar-box-item">
          <a-row>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="失窃水量"
                prop="waterStolen"
              >
                <a-input-number
                  class="input-number"
                  v-model="model.waterStolen"
                ></a-input-number>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="计量误差水量"
                prop="waterError"
              >
                <a-input-number
                  class="input-number"
                  v-model="model.waterError"
                ></a-input-number>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="渗水量"
                prop="waterSeepage"
              >
                <a-input-number
                  class="input-number"
                  v-model="model.waterSeepage"
                ></a-input-number>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="其它漏损水量"
                prop="waterOtherLoss"
              >
                <a-input-number
                  class="input-number"
                  v-model="model.waterOtherLoss"
                ></a-input-number>
              </a-form-model-item>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-form-model>
  </cr-modal>
</template>
<script lang="ts">
import { Component, Watch, Prop } from "vue-property-decorator";
import { FormPageVue } from "@cr/types";
import api from "@/api/dma/generatorApis/areaItem";
import { CreateOrUpdateAreaItemDto } from "@/api/dma/types";
import { FormModel, List } from "ant-design-vue";

@Component<FormView>({ name: "FormView" })
export default class FormView extends FormPageVue<CreateOrUpdateAreaItemDto, string> {
  @Prop({ default: () => {} }) public treeData!: any;

  private enabledMark: boolean = false;
  private noWater: boolean = false;
  private replaceFields: any = {
    children: "children",
    key: "id",
    value: "id",
    title: "areaName",
  };

  protected formLayoutInput: any = {
    labelAlign: "right",
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
  };
  protected formLayoutText: any = {
    labelAlign: "right",
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };

  private sum(vals: Array<number>) {
    let n = 0;
    vals.map((x) => {
      n += x;
    });
    return n;
  }

  created() {
    this.model = {
      enabledMark: false,
      sortCode: 0,
      areaId: this.treeData.id,
      areaCode: this.treeData.code,
      areaName: this.treeData.name,
    };
    this.rules = {
      statisticalDate: [{ required: true, message: "请选择统计日期", trigger: "change" }],
      description: [{ required: true, message: "请输入备注", trigger: "blur" }],
      waterSale: [
        { required: true, type: "number", message: "请输入计量售水量", trigger: "blur" },
      ],
      waterUnsold: [
        {
          required: true,
          type: "number",
          message: "请输入未计量售水量",
          trigger: "blur",
        },
      ],
      waterFree: [
        {
          required: true,
          type: "number",
          message: "请输入计量免费售水量",
          trigger: "blur",
        },
      ],
      waterUnsoldFree: [
        {
          required: true,
          type: "number",
          message: "请输入未计量免费售水量",
          trigger: "blur",
        },
      ],
      waterStolen: [
        {
          required: true,
          type: "number",
          message: "请输入失窃水量",
          trigger: "blur",
        },
      ],
      waterError: [
        {
          required: true,
          type: "number",
          message: "请输入计量误差水量",
          trigger: "blur",
        },
      ],
      waterSeepage: [
        { required: true, type: "number", message: "请输入渗水量", trigger: "blur" },
      ],
      waterOtherLoss: [
        {
          required: true,
          type: "number",
          message: "请输入其它漏损水量",
          trigger: "blur",
        },
      ],
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
   * 月份选择事件
   */
  private monChange(date: string, dateString: string) {
    this.model.statisticalDate = dateString;
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
      .update(this.getModel.areaId, this.getModel)
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
<style lang="less" scoped>
.bar-box {
  border: 1px solid #ddd;
  margin: 5px;
  border-radius: 5px;
  &-title {
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
    background: #f5f5f5;
  }
  &-item {
    margin: 5px 20px;
    .input-number {
      width: 100%;
    }
  }
}
</style>
