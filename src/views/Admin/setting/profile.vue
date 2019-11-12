<template>
  <layout>
    <template #main></template>
  </layout>
</template>

<script>
export default {
  components: {
    layout: () => import('@/components/Admin/layout.vue')
  }
}
</script>

<style>
</style>