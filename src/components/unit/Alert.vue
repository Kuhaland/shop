<template>
  <transition name="alert">
    <div v-if="state.visible" class="alert-layer">
      <div class="alert-dim"></div>
      <div class="alert-box" role="alertdialog" aria-modal="true">
        <p class="alert-message">{{ state.message }}</p>
        <button type="button" class="alert-confirm" @click="close">확인</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert'

defineOptions({ name: 'AppAlert' })

const { state, close } = useAlert()
</script>

<style scoped lang="scss">
.alert-layer{
  position: fixed; inset: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  .alert-dim{
    position: absolute; inset: 0;
    background-color: rgba(0,0,0,0.5);
  }
  .alert-box{
    position: relative; z-index: 1;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 360px;
    padding: 32px 24px 24px;
    background-color: #ffffff; border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    text-align: center;
  }
  .alert-message{
    margin-bottom: 24px;
    font-size: 16px; font-weight: 500; line-height: 1.5; color: #111827;
    white-space: pre-line;
    word-break: keep-all;
  }
  .alert-confirm{
    width: 100%; height: 48px;
    border: none; border-radius: 12px;
    background-color: #2563eb;
    font-size: 15px; font-weight: 700; color: #ffffff;
    cursor: pointer;
    transition: background-color .2s ease;
    &:hover{ background-color: #1d4ed8;}
  }
}

.alert-enter-active, .alert-leave-active{ transition: opacity .2s ease;}
.alert-enter-from, .alert-leave-to{ opacity: 0;}
.alert-enter-active .alert-box,
.alert-leave-active .alert-box{ transition: transform .2s ease;}
.alert-enter-from .alert-box,
.alert-leave-to .alert-box{ transform: scale(0.92);}
</style>
