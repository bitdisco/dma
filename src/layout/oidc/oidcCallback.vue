<template>
  <cr-oidc-callback ref="oidc" @setUserInfo="setUserInfo($event)" />
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CrOidcCallback } from "@cr/components";
import { UserModule } from "@/store";

@Component<Oidcback>({
  name: "Oidcback",
  components: { CrOidcCallback },
})
export default class Oidcback extends Vue {
  private setUserInfo(res: any) {
    UserModule.updateToken(res);
  }
}
</script>
