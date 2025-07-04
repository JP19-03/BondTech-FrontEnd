<template>
  <component :is="layout">
    <router-view/>
  </component>
  <pv-toast />
</template>

<script>
import EmptyLayoutComponent from "./shared/layouts/empty-layout.component.vue";
import AuthenticationLayoutComponent from "./iam/layouts/authentication-layout.component.vue";
import CorporateBondLayoutComponent from "./bondValuation/layouts/corporate-bond-layout.component.vue";

export default {
  name: "BondTech App",
  components: { EmptyLayoutComponent, AuthenticationLayoutComponent, CorporateBondLayoutComponent },
  computed: {
    layout() {
      return this.$route.meta.layout || 'CorporateBondLayoutComponent' || 'AuthenticationLayoutComponent' || 'EmptyLayoutComponent';
    }
  },
}
</script>

<style scoped>

</style>
