<template>
  <layout>
    <template #header>
      <div class>New Moment</div>
    </template>
  </layout>
</template>

<script>

export default {
  components: {
    layout: () => import('@/components/Admin/layout.vue'),
  }
}
</script>

<style>
</style>