<template>
  <component :is="layout">
    <RouterView />
  </component>

  <AppAlert />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppAlert from '@/components/unit/Alert.vue'

const route = useRoute()

const layouts = {
  default: DefaultLayout,
  empty: EmptyLayout,
  auth: AuthLayout,
}

const layout = computed(() => {
  return layouts[route.meta.layout || 'default']
})
</script>
