<template>
  <cr-oidc-logout/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {CrOidcLogout} from "@cr/components";

@Component<OidcLot>({
  name: "OidcLot",
  components: {CrOidcLogout},
})
export default class OidcLot extends Vue {

}
</script>
