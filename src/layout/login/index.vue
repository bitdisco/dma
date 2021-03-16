<template>
  <cr-oidc-login/>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CrOidcLogin} from "@cr/components";

@Component<Login>({
  name: "Login",
  components: {CrOidcLogin},
})
export default class Login extends Vue {

}
</script>
