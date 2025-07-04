<script>
export default {
  name: "authentication-layout"
}
</script>

<template>
  <div class="flex flex-col md:grid md:grid-cols-2 h-screen">
    <!-- Contenido principal -->
    <main class="w-full">
      <slot/>
    </main>

    <!-- Contenedor de imagen -->
    <div class="hidden md:flex w-full h-full items-center justify-center bg-gray-100">
      <img
          src="../../assets/images/money.png"
          alt="Logo"
          class="w-full h-full lg:max-h-screen object-cover"
      />
    </div>
  </div>
</template>

<style scoped>

</style>