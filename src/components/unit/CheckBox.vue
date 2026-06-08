<!-- components/CheckBox.vue -->
<template>
  <label class="check-box"
         :class="{ checked: modelValue, disabled }"
         :for="inputId"
  >
    <input :id="inputId"
           type="checkbox"
           :checked="modelValue"
           :disabled="disabled"
           @change="onChange"
    />
    <span class="check-icon"></span>
    <span v-if="label" class="check-label">{{ label }}</span>
  </label>
</template>

<script setup>
import { computed, useId } from 'vue'

defineOptions({name: 'CheckBox'});
const props = defineProps({
  id: {type: String, default: '',},
  modelValue: {type: Boolean, default: false,},
  label: {type: String, default: '',},
  disabled: {type: Boolean, default: false,},
});

const emit = defineEmits([
  'update:modelValue',
  'change',
]);

const autoId = useId();

const inputId = computed(() => {
  return props.id || `checkbox-${autoId}`
});

const onChange = (e) => {
  const checked = e.target.checked

  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>

<style scoped lang="scss">
.check-box{
  display: flex; align-items: center; gap: 10px;
  cursor: pointer; user-select: none;
  input{ display: none;}
  .check-icon{
    position: relative; width: 22px; height: 22px;
    border: 1px solid #d0d5dd; border-radius: 6px;
    background-color: #ffffff;
    transition: all .2s ease;
    &::after{
      content: ''; position: absolute; left: 50%; top: 45%;
      width: 6px; height: 10px;
      border-right: 2px solid #ffffff; border-bottom: 2px solid #ffffff;
      transform: translate(-50%, -50%) rotate(45deg);
      opacity: 0;
    }
  }
  .check-label{ font-size: 14px; font-weight: 500; color: #ffffff;}
  &:hover .check-icon{ border-color: #7b1fff;}
  &.checked{
    .check-icon{
      background-color: #7b1fff;
      border-color: #7b1fff;
      &::after{ opacity: 1;}
    }
  }
  &.disabled{ opacity: 0.5; cursor: not-allowed;}
}
</style>
