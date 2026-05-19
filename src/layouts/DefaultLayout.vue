<template>
  <div class="layout">
    <AppHeader />

    <div class="layout-body">
      <AppLnb />

      <main class="layout-content">
        <slot />
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/Header.vue'
import AppLnb from '@/components/Lnb.vue'
import AppFooter from '@/components/Footer.vue'
</script>
