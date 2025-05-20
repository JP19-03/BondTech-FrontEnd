<script>
import EmptyLayoutComponent from "./shared/layouts/empty-layout.component.vue";
import CorporateBondLayoutComponent from "./bondValuation/layouts/corporate-bond-layout.component.vue";

export default {
  name: "BondTech App",
  components: { EmptyLayoutComponent },
  computed: {
    layout() {
      return this.$route.meta.layout || 'CorporateBondLayoutComponent' || 'EmptyLayout';
    }
  },
}
</script>

<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<style scoped>

</style>
