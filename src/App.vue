<script>
import EmptyLayoutComponent from "./shared/layouts/empty-layout.component.vue";

export default {
  name: "BondTech App",
  components: { EmptyLayoutComponent },
  computed: {
    layout() {
      return this.$route.meta.layout || 'ParkingManagementLayout' || 'EmptyLayout' || 'AuthLayout';
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
