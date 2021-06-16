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
            label="父级分区"
            prop="parentId"
          >
            <a-tree-select
              v-model="model.parentId"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="treeData"
              placeholder="Please select"
              :replaceFields="replaceFields"
              @select="onSelect"
            >
            </a-tree-select>
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
                label="分区级别"
                prop="areaGrade"
              >
                <a-input v-model="model.areaGrade"></a-input>
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
                label="分区级别"
                prop="areaGrade"
              >
                <a-input v-model="model.areaGrade"></a-input>
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
        </div>
      </div>
    </a-form-model>
  </cr-modal>
</template>
<script lang="ts">
import { Component, Watch, Prop } from "vue-property-decorator";
import { FormPageVue, ISelectOptionItem, ITreeOptionItem, ITreeOptions } from "@cr/types";
import api from "@/api/dma/generatorApis/area";

import { FormModel, List } from "ant-design-vue";
import { FormLayoutInfo } from "@cr/types/app/form";

@Component<AreaFormPage>({ name: "AreaFormPage" })
export default class AreaFormPage extends FormPageVue<any, string> {
  @Prop({ default: () => [] }) public treeData!: Array<any>;

  private enabledMark: boolean = false;
  private noWater: boolean = false;
  private replaceFields: any = {
    children: "children",
    key: "id",
    value: "id",
    title: "areaName",
  };

  protected formLayoutInput: FormLayoutInfo = {
    labelAlign: "right",
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  protected formLayoutText: FormLayoutInfo = {
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
      this.getModel.areaGrade = res.areaGrade + "级分区";
    });
    this.loading = true;
  }

  /**
   *分区选择事件
   */
  onSelect(selectedKeys: any, { dataRef }: any) {
    this.getModel.areaGrade = dataRef.areaGrade + 1 + "级分区";
  }

  /**
   *通水滑块事件
   */
  noWaterChange(e: any) {
    this.getModel.noWater = e ? 1 : 0;
  }

  /**
   * 有效标志滑块事件
   */
  enabledMarkChange(e: any) {
    this.getModel.enabledMark = e ? 1 : 0;
  }

  /**
   * 提交保存
   */
  private onSubmit() {
    let form = this.$refs.form as FormModel;

    this.getModel.areaGrade = this.getModel.areaGrade.slice(0, 1);
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
    this.getModel.noWater = this.getModel.noWater ? 1 : 0;
    this.getModel.enabledMark = this.getModel.enabledMark ? 1 : 0;
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
  }
}
</style>
