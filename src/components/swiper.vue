<template>
  <swiper :options="swiperOption" class="swiper" ref="swiper">
    <!--      <card-slide :isActive="true" :data="data.data[0]" :date="parseDate(data.data[0].createdTime)"></card-slide>-->
    <card-slide
        v-for="item in data.data"
        :key="item._id"
        :data="item"
        :isActive="item.index === activeItem"
        :date="parseDate(item.createdTime)"
        @click.native="handleClick(item.index)"
        class="slide"
    ></card-slide>
  </swiper>
</template>

<script>
  // require styles
  import 'swiper/dist/css/swiper.css'

  import { swiper } from 'vue-awesome-swiper'
  import cardSlide from '@/components/slide.vue'

  export default {
    components: {
      swiper,
      cardSlide
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        activeItem: 0,
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 16,
          slideToClickedSlide: true,
          centeredSlides: true,
          observer: true,
          observeParents: true
          // freeMode: true,
        },
        viewport: {
          w: window.innerWidth,
          h: window.innerHeight,
          is568: window.innerWidth <= 568,
          is768: window.innerWidth <= 768 && window.innerWidth > 568,
          is1024: window.innerWidth <= 1024 && window.innerWidth > 768,
          is1600: window.innerWidth >= 1600
        },
      }
    },
    created() {
      let index = 0
      if (this.data.data)
        this.data.data.map(item => {
          item.index = index++
        })
    },
    mounted() {
      // update viewport
      this.updateViewport()
      // add resize listener
      window.addEventListener('resize', this.updateViewport)
    },
    watch: {
      data(n) {
        let index = 0
        n.data.map(item => {
          item.index = index++
        })
        this.data = n
      },
      viewport(n) {
        if (n.is568) this.swiperOption.slidesPerView = 1
        else if (n.is768) this.swiperOption.slidesPerView = 2
        else if (n.is1024) this.swiperOption.slidesPerView = 4
        else if (n.is1600) this.swiperOption.slidesPerView = 6
        else this.swiperOption.slidesPerView = 5
        this.$refs.swiper.swiper.destroy()   //先销毁
        this.$refs.swiper.mountInstance()   //后在加载
      }
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
      handleClick(index) {
        this.activeItem = index
      },
      updateViewport() {
        // update
        this.viewport = {
          w: window.innerWidth,
          h: window.innerHeight,
          is568: window.innerWidth <= 568,
          is768: window.innerWidth <= 768 && window.innerWidth > 568,
          is1024: window.innerWidth <= 1024 && window.innerWidth > 768,
          is1600: window.innerWidth >= 1600
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .swiper {
    padding: 0 1rem;
  }
</style>