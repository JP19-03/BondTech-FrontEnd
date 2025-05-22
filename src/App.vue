<template>
  <component :is="layout">
    <router-view/>
  </component>
  <pv-toast />
</template>

<script>
import EmptyLayoutComponent from "./shared/layouts/empty-layout.component.vue";
import CorporateBondLayoutComponent from "./bondValuation/layouts/corporate-bond-layout.component.vue";

export default {
  name: "BondTech App",
  components: { EmptyLayoutComponent, CorporateBondLayoutComponent },
  computed: {
    layout() {
      return this.$route.meta.layout || 'CorporateBondLayoutComponent' || 'EmptyLayout';
    }
  },
}
</script>

<style scoped>

</style>
