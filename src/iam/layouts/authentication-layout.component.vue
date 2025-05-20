<script>
export default {
  name: "authentication-layout"
}
</script>

<template>
  <div class="flex flex-col md:grid md:grid-cols-2 min-h-screen">
    <main class="w-full">
      <slot />
    </main>
    <div class="hidden md:flex w-full flex-col items-center justify-center bg-gray-100">
      <img src="../../assets/images/money.png" alt="Logo" class="w-full h-auto max-h-[1000px] object-fill" />
    </div>
  </div>
</template>

<style scoped>

</style>