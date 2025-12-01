<script setup lang="ts">
import demos from 'virtual:demos'
import { computed, defineAsyncComponent } from 'vue'

defineOptions({
  name: 'Demo',
})
const { src } = defineProps<{
  src: string
}>()
const demo = computed(() => demos[src])
const component = computed(() => typeof demo.value?.component === 'function' ? defineAsyncComponent(demo.value.component) : demo.value.component)
</script>

<template>
  <div>
    <component :is="component" v-if="demo.component" />
    <slot />
    <div v-html="demo.html" />
  </div>
</template>
