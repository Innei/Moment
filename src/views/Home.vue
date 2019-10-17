<template>
  <div>
    <header>
      <header-nav></header-nav>
    </header>
    <main></main>
    <swiper></swiper>
  </div>
</template>

<script>
  import headerNav from '@/components/headerNav.vue'
  import swiper from '@/components/swiper.vue'

  export default {
    components: {
      headerNav,
      swiper
    }
  }
</script>

<style scoped>

</style>