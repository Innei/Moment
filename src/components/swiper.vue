<template>
    <swiper :options="swiperOption" class="swiper">
      <!--      <card-slide :isActive="true" :data="data.data[0]" :date="parseDate(data.data[0].createdTime)"></card-slide>-->
      <card-slide v-for="item in data.data"
                  :key="item._id"
                  :data="item"
                  :date="parseDate(item.createdTime)"
                  @click.native="log"
                  class="slide"
      ></card-slide>
    </swiper>
</template>

<script>
  // require styles
  import 'swiper/dist/css/swiper.css'

  import { swiper } from 'vue-awesome-swiper'
  import cardSlide from '@/components/slide.vue'
  import momentApi from '@/api/moment'

  export default {
    components: {
      swiper,
      cardSlide
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 16,
          // freeMode: true,
        },
        data: {}
      }
    },
    async created() {
      const data = (await momentApi.getRecentlyMoment({
        size: 10,
        page: 1
      })).data
      this.data = data

    },
    methods: {
      parseDate(date) {

        const d = new Date(date)
        const dateObj = {
          date: d.getDate(),
          my: `${ d.getMonth() + 1 } / ${ d.getFullYear() - 2000 }`
        }
        return dateObj
      },
      log(e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper {
    padding: 0 1rem;
  }
</style>