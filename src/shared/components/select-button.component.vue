<script>
export default {
  name: "SelectButtonWrapper",
  props: {
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    onChange(newValue) {
      // Si el valor es nulo/vacío, selecciona la otra opción (solo para dos opciones)
      if (!newValue && this.options.length === 2) {
        const other = this.options.find(opt => opt !== this.modelValue);
        this.$emit('update:modelValue', other);
      } else if (newValue !== this.modelValue) {
        this.$emit('update:modelValue', newValue);
      }
    }
  }
}
</script>

<template>
  <pv-select-button
      :modelValue="modelValue"
      :options="options"
      :id="id"
      @update:modelValue="onChange"
      class="w-full justify-center"
  />
</template>