<script>
import ToolbarComponent from "../../public/components/toolbar.component.vue";

export default {
  name: "corporate-bond-layout",
  components: {
    ToolbarComponent,
  },
}
</script>

<template>
  <ToolbarComponent />
  <main>
    <slot />
  </main>
</template>

<style scoped>

</style>