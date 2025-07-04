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
    },
    disabled: {
      type: Boolean,
      default: false
    },
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
        :disabled="disabled"
    />
    <label :for="id" style="font-size: 0.7rem">{{ label }}</label>
  </pv-ifta-label>
</template>

<style scoped>
:deep(.p-inputtext:disabled) {
  background: rgba(255, 193, 7, 0.2) !important;
  color: #000 !important;
  border-color: black !important;
  cursor: not-allowed !important;
}
</style>