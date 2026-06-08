<template>
  <div class="text-field"
       :class="[`type-${labelType}`, { focused: isFocused, filled: hasValue, 'has-toggle': isPassword }]"
  >
    <label v-if="label && labelType === 'default'">{{ label }}</label>
    <div class="input-wrap">
      <input ref="inputEl"
             :type="resolvedType"
             :value="modelValue"
             :placeholder="inputPlaceholder"
             :disabled="disabled"
             @input="onInput"
             @focus="isFocused = true"
             @blur="isFocused = false"
             @keyup.enter="emit('enter')"
      />
      <label v-if="label && labelType === 'floating'" class="floating-label">{{ label }}</label>
      <div class="input-suffix">
        <button v-if="hasValue && !disabled"
                type="button"
                class="icon-btn clear-btn"
                aria-label="입력 내용 삭제"
                tabindex="-1"
                @click="onClear"
        >
          <span class="material-symbols-outlined">cancel</span>
        </button>
        <button v-if="isPassword"
                type="button"
                class="icon-btn toggle-password"
                :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 표시'"
                tabindex="-1"
                @click="showPassword = !showPassword"
        >
          <span class="material-symbols-outlined">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, nextTick } from 'vue'

defineOptions({ name: 'TextField'});

const props = defineProps({
  modelValue: {type: [String, Number], default: ''},
  label: {type: String, default: ''},
  type: {type: String, default: 'text'},
  placeholder: {type: String, default: ''},
  disabled: {type: Boolean, default: false},
  labelType: {type: String, default: 'default'},
})

const emit = defineEmits([
  'update:modelValue',
  'enter'
])

const inputEl = ref(null)
const isFocused = ref(false)
const showPassword = ref(false)

const isPassword = computed(() => props.type === 'password')

const resolvedType = computed(() => {
  if (isPassword.value) {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const hasValue = computed(() => {
  return props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined
})

const inputPlaceholder = computed(() => {
  if (props.labelType === 'floating') {
    return isFocused.value ? props.placeholder : ''
  }
  return props.placeholder
})

const onInput = (e) => {
  emit('update:modelValue', e.target.value)
}

const onClear = async () => {
  emit('update:modelValue', '')
  await nextTick()
  inputEl.value?.focus()
}
</script>
<style lang="scss" scoped>
.text-field {
  display: flex; flex-direction: column; gap: 8px;
  label {
    font-size: 16px; font-weight: 600; color: #ffffff;
  }
  .input-wrap {
    position: relative; height: 52px;
    border:2px solid #d1d5db; border-radius:14px;
    background-color: #fafafa;
    transition: box-shadow .2s ease, border-color .2s ease;
    &:focus-within{
      border-color: transparent;
      background-image:
        linear-gradient(#fafafa, #fafafa),
        linear-gradient(135deg, #7b1fff, #c44dff, #3da5ff, #7b1fff);
      background-origin: border-box;
      background-clip: padding-box, border-box;
      background-size: auto, 300% 300%;
      box-shadow: 0 0 0 4px rgba(123,31,255,0.12);
      animation: textFieldBorder 6s ease infinite;
    }
  }
  input {
    width:100%; height:100%; padding:0 16px;
    border:none; outline:none; background:transparent;
    font-size:15px; color:#111827;
  }
  .input-suffix{
    position:absolute; top:50%; right:8px;
    transform:translateY(-50%);
    display:flex; align-items:center; gap:2px;
    .icon-btn{
      display:flex; align-items:center; justify-content:center;
      width:32px; height:32px;
      padding:0; border:none; background:none;
      color:#9ca3af; cursor:pointer;
      transition:color .2s ease;
      &:hover{ color:#6b7280;}
      .material-symbols-outlined{ font-size:20px; line-height:1;}
    }
  }
  &.filled input{ padding-right:44px;}
  &.has-toggle input{ padding-right:44px;}
  &.has-toggle.filled input{ padding-right:76px;}
  @keyframes textFieldBorder {
    0%   { background-position: center, 0 50%;}
    50%  { background-position: center, 100% 50%;}
    100% { background-position: center, 0 50%;}
  }

  /* placeholder 위치에 있다가 포커스·입력 시 상단으로 떠오르는 라벨 */
  &.type-floating {
    .input-wrap { height: 56px;}
    input {
      padding:22px 16px 6px;
    }
    .floating-label {
      position:absolute; left:16px; top:50%;
      transform:translateY(-50%);
      font-size:15px; font-weight:400; color:#9ca3af;
      pointer-events:none;
      transition:0.2s ease;
    }
    &.focused .floating-label,
    &.filled .floating-label {
      top:9px;
      transform:translateY(0);
      font-size:12px; font-weight:600; color:#2563eb;
    }
  }
}
</style>
