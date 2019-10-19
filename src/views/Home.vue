<template>
  <div>
    <header>
      <header-nav></header-nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <swiper :data="data"></swiper>
  </div>
</template>

<script>
import headerNav from "@/components/headerNav.vue";
import swiper from "@/components/swiper.vue";
import momentApi from "@/api/moment";
export default {
  components: {
    headerNav,
    swiper
  },
  data() {
    return {
      data: {}
    };
  },
  async created() {
    const data = (await momentApi.getRecentlyMoment({
      size: 10,
      page: 1
    })).data;
    this.data = data;
  }
};
</script>

<style scoped>
  main {
    min-height: calc(100vh - 26rem)
  }
</style>