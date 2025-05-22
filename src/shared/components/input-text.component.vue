<script>
export default {
  name: 'InputTextComponent',
  props: {
    modelValue: String,
    label: {
      type: String,
      default: 'Label'
    },
    id: {
      type: String,
      required: true
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
  <pv-ifta-label>
    <pv-input-text
        class="w-full h-[3rem] bg-white myInputText"
        :id="id"
        v-model="internalValue"
        variant="filled"
    />
    <label :for="id" style="font-size: 0.7rem">{{ label }}</label>
  </pv-ifta-label>
</template>

<style scoped>
</style>