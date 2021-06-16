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
                <a-input-number class="input-number" v-model="model.waterSale"></a-input-number>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="未计量售水量"
                prop="waterUnsold"
              >
                <a-input-number  class="input-number" v-model="model.waterUnsold"></a-input-number>
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
                <a-input-number class="input-number" v-model="model.waterFree"></a-input-number>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="未计量免费售水量	"
                prop="waterUnsoldFree"
              >
                <a-input-number  class="input-number" v-model="model.waterUnsoldFree"></a-input-number>
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
                <a-input-number  class="input-number" v-model="model.waterStolen"></a-input-number>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="计量误差水量"
                prop="waterError"
              >
                <a-input v-model="model.waterError"></a-input>
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
                <a-input-number  class="input-number" v-model="model.waterSeepage"></a-input-number>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                v-bind="formLayoutInput"
                has-feedback
                label="其它漏损水量"
                prop="waterOtherLoss"
              >
                <a-input-number  class="input-number" v-model="model.waterOtherLoss"></a-input-number>
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
import api from "@/api/dma/generatorApis/area";
import { CreateOrUpdateAreaItemDto } from "@/api/dma/types";
import { FormModel, List } from "ant-design-vue";

@Component<FormView>({ name: "FormView" })
export default class FormView extends FormPageVue<CreateOrUpdateAreaItemDto, string> {
  @Prop({ default: () => [] }) public treeData!: Array<any>;

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
      enterpriseWaterDemand: 0,
      averageNightPressure: 30,
      residentNumber: 1500,
      mainPipeLength: 2000,
      subPipeLength: 2,
      subPipeNumber: 1500,
      icfFactor: 4,
      enabledMark: false,
      noWater: false,
    };
    this.rules = {
      // areaGrade: [{ required: true, type: "number", defaultField: 1 }],
      areaName: [{ required: true, message: "请输入DMA分区名称~", trigger: "blur" }],
      areaCode: [{ required: true, message: "请输入DMA分区编码~", trigger: "blur" }],

      //大用户夜间用水量
      enterpriseWaterDemand: [
        { required: true, type: "number", message: "请输入用水量", trigger: "blur" },
      ],
      //夜间平均压力
      averageNightPressure: [
        {
          required: true,
          type: "number",
          message: "请输入夜间平均压力",
          trigger: "blur",
        },
      ],
      //居民用户数量
      residentNumber: [
        {
          required: true,
          type: "number",
          message: "请输入居民用户数量",
          trigger: "blur",
        },
      ],
      //主干管道长度
      mainPipeLength: [
        {
          required: true,
          type: "number",
          message: "请输入主干管道长度",
          trigger: "blur",
        },
      ],
      //私有管道平均长度
      subPipeLength: [
        {
          required: true,
          type: "number",
          message: "请输入私有管道平均长度",
          trigger: "blur",
        },
      ],
      //私有管道数量
      subPipeNumber: [
        {
          required: true,
          type: "number",
          message: "请输入私有管道数量",
          trigger: "blur",
        },
      ],
      //ICF因子
      icfFactor: [
        { required: true, type: "number", message: "请输入ICF因子", trigger: "blur" },
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

  private treeNodeFilter(data: any) {
    let list = data.map((item: any) => {
      if (item.children.length === 0 || !item.children) {
        delete item.children;
        return item;
      } else {
        this.treeNodeFilter(item.children);
        return item;
      }
    });
    return list;
  }

  /**
   * 加载数据
   */
  private async loadData() {
    if (!this.isEdit) {
      return;
    }
    // if (this.item) {
    //   this.onItemChanged();

    //   return;
    // }
    api.get(this.id).then((res: any) => {
      this.loading = false;
      this.model = res;
      this.noWater = res.noWater ? true : false;
      this.enabledMark = res.enabledMark ? true : false;
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
   .input-number{
      width: 100%;
    }
  }
}
</style>
