<template>
  <a-modal class="userCenter"
           v-model="visible"
           centered
           destroyOnClose
           :width="600"
           title="个人中心"
           ok-text="确认"
           cancel-text="取消"
           @ok="clickModalBtn('ok')"
           @cancel="clickModalBtn('cancel')">
    <a-form-model ref="userForm"
                  :rules="rules"
                  layout="horizontal"
                  :model="dataForm"
                  v-bind="formItemLayout">
      <a-form-model-item label="头像" :label-col="{ span: 3 }" :wrapper-col="{ span: 21}">
        <cr-upload-avatar :avatarUrl="avatarUrl"
                       @getFileList="getFileList"/>
      </a-form-model-item>
      <a-form-model-item label="角色" :label-col="{ span: 3 }" :wrapper-col="{ span: 21}">
        <a-select disabled
                  mode="multiple"
                  placeholder="角色"
                  v-model="dataForm.roleNames"/>
      </a-form-model-item>
      <a-form-model-item label="机构" class="model-item-box">
        <a-input disabled placeholder="机构" v-model="dataForm.organizeId" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="账户" class="model-item-box">
        <a-input disabled placeholder="请输入账户" v-model="dataForm.userName" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="姓名" class="model-item-box" prop="name">
        <a-input placeholder="请输入姓名" v-model="dataForm.name" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="邮箱" class="model-item-box" prop="email">
        <a-input placeholder="请输入邮箱" v-model="dataForm.email" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="手机" class="model-item-box">
        <a-input placeholder="请输入手机" v-model="dataForm.phoneNumber" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="身份证" class="model-item-box">
        <a-input placeholder="请输入身份证" v-model="dataForm.idCard" allow-clear/>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {CrUploadAvatar} from "@cr/components";
import {IAccountUserItem} from "@cr/types";
import {antdvPath} from "@cr/utils";
import UserInfo from "@/api/platform/generatorApis/AppUser";

@Component<UserCenter>({
  name: "UserCenter",
  components: {CrUploadAvatar},
})
export default class UserCenter extends Vue {
  @Prop({default: false}) public visibleData!: boolean;
  @Prop({default: ""}) public userId!: string;

  private visible: boolean = false;
  private avatarUrl: string = "";
  private avatar: string = "";
  private formItemLayout: any = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
  };
  private userInfo: IAccountUserItem | any = {};
  private dataForm: any = {
    roleNames: [],
    organizeId: "",
    userName: "",
    name: "",
    email: "",
    phoneNumber: "",
    idCard: "",
  };

  /**
   * 需要验证的
   * */
  private rules: any = {
    name: [{required: true, message: "请输入姓名", trigger: "blur"}],
    email: [{required: true, message: "请输入邮箱地址", trigger: "blur"}],
  };

  @Watch("visibleData")
  public visibleDataChange(val: boolean) {
    this.visible = val;
    if (val) { this.getUserCenterData(); }
  }

  /**
   * 用户数据回显
   * */
  private async getUserCenterData() {
    UserInfo.getUser(this.userId).then((res: any) => {
      const userInfo: IAccountUserItem | any = res;
      this.userInfo = userInfo;
      this.avatarUrl = antdvPath.downloadFile(userInfo.avatar);
      this.avatar = userInfo.avatar;
      const dataForm: any = {
        roleNames: userInfo.roleNames,
        organizeId: userInfo.organizeName,
        userName: userInfo.userName,
        name: userInfo.name,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        idCard: userInfo.idCard,
      };
      this.dataForm = dataForm;
    });
  }

  /**
   * 点击确认或者取消按钮
   * */
  private clickModalBtn(type: string) {
    let visible: boolean = true;
    if (type === "cancel") {
      (this.$refs.userForm as any).resetFields();
      visible = false;
    } else {
      (this.$refs.userForm as any).validate((valid: any) => {
        if (valid) {
          this.updateUserInfo();
          console.log("submit!");
        } else {
          visible = true;
          console.log("error submit!!");
          return false;
        }
      });
    }
    this.$emit("closeUserCenter", visible);
  }

  /**
   * 获取上传照片的信息
   * */
  private getFileList(fileList: any) {
    this.avatar = fileList[0].id;
  }

  /**
   * 点击确认提交数据
   * */
  private updateUserInfo() {
    const userInfo = this.userInfo;
    const param: any = {
      avatar: this.avatar,
      id: this.userId,
      organizeCode: userInfo.organizeCode,
      organizeId: userInfo.organizeId,
      concurrencyStamp: userInfo.concurrencyStamp,
    };
    const params = {...this.dataForm, ...param};
    UserInfo.updateUser(this.userId, params).then((res: any) => {
      if (res) {
        this.$message.success("修改成功！");
        this.$emit("closeUserCenter", false);
      }
    });
  }
}
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.userCenter {
  @{deep} .model-item-box {
    width: 50%;
    float: left;
    padding-left: 15px;
  }
}
</style>
