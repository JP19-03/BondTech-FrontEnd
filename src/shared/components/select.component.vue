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
    <pv-ifta-label>
      <pv-select
          v-model="internalValue"
          :options="options"
          :placeholder="placeholder"
          class="w-full h-[3rem] justify-center"
          :id="id"
      />
      <label :for="id" style="font-size: 0.7rem">{{ placeholder }}</label>
    </pv-ifta-label>
  </div>
</template>

<style scoped>

</style>