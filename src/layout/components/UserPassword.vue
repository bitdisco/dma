<template>
  <a-modal class="userPassword"
           v-model="visible"
           centered
           destroyOnClose
           :title="title"
           ok-text="确认"
           cancel-text="取消"
           @ok="clickModalBtn('ok')"
           @cancel="clickModalBtn('cancel')">
    <a-form-model ref="passwordForm"
                  :layout="layout"
                  :rules="rules"
                  :model="dataForm"
                  v-bind="formItemLayout">
      <a-form-model-item label="原密码" class="model-item-box" prop="oldPassword">
        <a-input placeholder="请输入原密码" v-model="dataForm.oldPassword" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="新密码" class="model-item-box" prop="newPassword">
        <a-input placeholder="请输入新密码" v-model="dataForm.newPassword" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="姓名" class="model-item-box" prop="newPassword2">
        <a-input placeholder="请输入确认密码" v-model="dataForm.newPassword2" allow-clear/>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import UserInfo from "@/api/platform/generatorApis/AppUser";

@Component<UserCenter>({
  name: "UserCenter",
})
export default class UserCenter extends Vue {
  @Prop({default: false}) public visibleData!: boolean;
  @Prop({default: ""}) public userId!: string;

  private title: string = "修改密码";
  private visible: boolean = false;
  private layout: string = "horizontal";
  private formItemLayout: any = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
  };
  private dataForm: any = {
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  };

  private rules: any = {
    oldPassword: [{required: true, message: "请输入原密码", trigger: "blur"}],
    newPassword: [{required: true, message: "请输入新密码", trigger: "blur"}],
    newPassword2: [{required: true, message: "请确认新密码", trigger: "blur"}],
  };

  @Watch("visibleData")
  public visibleDataChange(val: boolean) {
    this.visible = val;
  }

  /**
   * 点击确认或者取消按钮
   * */
  private clickModalBtn(type: string) {
    let visible: boolean = true;
    if (type === "cancel") {
      (this.$refs.passwordForm as any).resetFields();
      visible = false;
    } else {
      (this.$refs.passwordForm as any).validate((valid: any) => {
        if (valid) {
          this.updateUserPassword();
          console.log("submit!", valid);
        } else {
          visible = true;
          console.log("error submit!!");
          return false;
        }
      });
    }
    this.$emit("closeUserPassword", visible);
  }

  /**
   * 点击确认提交数据
   * */
  private updateUserPassword() {
    if (this.dataForm.newPassword !== this.dataForm.newPassword2) {
      this.$message.error("输入的两次新密码不一致，请重试！");
      return;
    }
    console.log("提交数据为", this.dataForm);
    const params: any = {
      oldPassword: this.dataForm.oldPassword,
      newPassword: this.dataForm.newPassword,
    };
    UserInfo.changePassword(params).then((res: any) => {
      if (res && (res.userName || res.userId)) {
        this.$message.success("修改成功！");
        this.$emit("closeUserPassword", false);
      }
    });
  }
}
</script>

<style lang="less" scoped>
.userPassword {

}
</style>
