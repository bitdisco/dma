<template>
  <cr-oidc-callback-error/>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CrOidcCallbackError} from "@cr/components";

@Component<OidcCallError>({
  name: "OidcCallError",
  components: {CrOidcCallbackError},
})
export default class OidcCallError extends Vue {

}
</script>
