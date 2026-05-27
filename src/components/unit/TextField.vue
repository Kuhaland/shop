<template>
  <div class="text-field">
    <label v-if="label">{{ label }}</label>
    <input :type="type"
           :value="modelValue"
           :placeholder="placeholder"
           :disabled="disabled"
           @input="onInput"
           @keyup.enter="emit('enter')"
    />
  </div>
</template>
<script setup>
defineOptions({ name: 'TextField'});

const props = defineProps({
  modelValue: {type: [String, Number], default: ''},
  label: {type: String, default: ''},
  type: {type: String, default: 'text'},
  placeholder: {type: String, default: ''},
  disabled: {type: Boolean, default: false}
})

const emit = defineEmits([
  'update:modelValue',
  'enter'
])

const onInput = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>
<style lang="scss" scoped>
.text-field {
  display: flex; flex-direction: column; gap: 8px;
  label {
    font-size: 16px; font-weight: 600; color: #ffffff;
  }
  input {
    width:100%; height:52px; padding:0 16px;
    background-color: #fafafa;
    border:1px solid #d1d5db; border-radius:14px; outline:none;
    font-size:15px;
    transition:0.2s;
    &:focus{
      border-color:#2563eb;
      box-shadow: 0 0 0 4px rgba(37,99,235,0.12);
    }
  }
}
</style>
