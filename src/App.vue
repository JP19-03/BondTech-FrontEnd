<script>
import EmptyLayoutComponent from "./shared/layouts/empty-layout.component.vue";
import AuthenticationLayoutComponent from "./iam/layouts/authentication-layout.component.vue";

export default {
  name: "BondTech App",
  components: { EmptyLayoutComponent, AuthenticationLayoutComponent },
  computed: {
    layout() {
      return this.$route.meta.layout || 'AuthenticationLayoutComponent' || 'EmptyLayoutComponent';
    }
  },
}
</script>

<template>
  <component :is="layout">
    <router-view/>
  </component>
  <pv-toast />
</template>

<style scoped>

</style>
