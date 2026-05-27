<template>
  <label class="radio-box"
         :class="{ checked: isChecked, disabled }"
         :for="inputId"
  >
    <input :id="inputId"
           type="radio"
           :name="name"
           :value="value"
           :checked="isChecked"
           :disabled="disabled"
           @change="onChange"
    />
    <span class="radio-icon"></span>
    <span v-if="label" class="radio-label">{{ label }}</span>
  </label>
</template>
<script setup>
import { computed, useId } from 'vue'

defineOptions({ name: 'RadioButton' })

const props = defineProps({
  id: {type: String, default: ''},
  modelValue: {type: [String, Number, Boolean], default: ''},
  value: {type: [String, Number, Boolean], required: true},
  label: {type: String, default: ''},
  name: {type: String, default: ''},
  disabled: {type: Boolean, default: false},
})

const emit = defineEmits([
  'update:modelValue',
  'change',
])

const autoId = useId()

const inputId = computed(() => {
  return props.id || `radio-${autoId}`
})

const isChecked = computed(() => {
  return props.modelValue === props.value
})

const onChange = () => {
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style scoped lang="scss">
.radio-box {
  display: flex; align-items: center; gap: 10px;
  cursor: pointer; user-select: none;
  input{ display: none;}
  .radio-icon{
    position: relative; width: 22px; height: 22px;
    border: 1px solid #d0d5dd; border-radius: 50%;
    background-color:#ffffff;
    transition:all .2s ease;
    &::after{
      content: ''; position: absolute; left: 50%; top: 50%;
      width: 10px; height: 10px;
      border-radius: 50%;
      background-color: #7b1fff;
      transform: translate(-50%, -50%) scale(0);
      transition: all .2s ease;
    }
  }
  .radio-label{ font-size: 14px; color: #111827;}
  &.checked{
    .radio-icon{
      border-color: #7b1fff;
      &::after{ transform: translate(-50%, -50%) scale(1);}
    }
  }
  &.disabled{ opacity: 0.5; cursor: not-allowed;}
}
</style>
