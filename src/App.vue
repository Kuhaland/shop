<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

const route = useRoute()

const layouts = {
  default: DefaultLayout,
  empty: EmptyLayout,
}

const layout = computed(() => {
  return layouts[route.meta.layout || 'default']
})
</script>
