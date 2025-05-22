<script>
export default {
  name: "SelectComponent",
  props: {
    modelValue: {
      required: true
    },
    options: {
      required: true
    },
    placeholder: String,
    prefix: String,
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedOption: this.modelValue
    }
  },
  watch: {
    modelValue(newValue) {
      this.selectedOption = newValue;
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  }
}
</script>

<template>
  <div class="w-full">
    <pv-select
      v-model="internalValue"
      :options="options"
      :placeholder="placeholder"
      class="w-full justify-center"
      :id="id"
    />
  </div>
</template>

<style scoped>

</style>