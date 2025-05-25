<script>
export default {
  name: "InputNumberComponent",
  props: {
    modelValue: Number,
    label: {
      type: String,
      default: 'Label'
    },
    mode: String,
    currency: {
      type: String,
      default: 'PEN'
    },
    showButtons: Boolean,
    min: Number,
    suffix: String,
    minFractionDigits: Number,
    id: {
      type: String,
      required: true
    },
    disabled: Boolean,
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
    <pv-input-number
        class="w-full h-[3rem] bg-white myInputText"
        :class="[
            disabled ? 'myInputTextDisabled' : 'myInputText'
        ]"
        :id="id"
        v-model="internalValue"
        :mode="mode"
        :currency="currency"
        :showButtons="showButtons"
        :min="min"
        :suffix="suffix"
        :minFractionDigits="minFractionDigits"
        :maxFractionDigits="7"
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