<template>
  <swiper :options="swiperOption" class="swiper" ref="swiper">
    <!--      <card-slide :isActive="true" :data="data.data[0]" :date="parseDate(data.data[0].createdTime)"></card-slide>-->
    <card-slide
      :data="{ icon: ['fas','arrow-left'] }"
      v-if="pageOptions.hasPrevPage"
      @click.native="$emit('slide_btn-clicked', 'prev')"
    />
    <card-slide
      v-for="item in moments.data"
      :key="item._id"
      :data="item"
      :isActive="activeItem === -1 ? false : item.index === activeItem % pageOptions.size"
      :date="parseDate(item.createdTime)"
      @click.native="handleClick(item.index)"
      class="slide"
    ></card-slide>
    <card-slide
      :data="{ icon: ['fas','arrow-right'] }"
      v-if="pageOptions.hasNextPage"
      @click.native="$emit('slide_btn-clicked', 'next')"
    />
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper } from 'vue-awesome-swiper'
import cardSlide from '@/components/slide.vue'

export default {
  components: {
    swiper,
    cardSlide
  },
  props: {
    moments: {                   // 这个 data 是响应数据, data.data 是瞬间列表
      type: Object,
      required: true
    },
    swiperOptions: {
      type: Object
    },
    viewport: {
      type: Object
    },
    pageOptions: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      activeItem: this.viewport.is768 || this.viewport.is568 ? -1 : 0,
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 16,
        slideToClickedSlide: true,
        centeredSlides: true,
        observer: true,
        observeParents: true,
        autoplay: false,
        delay: 3000,
        mousewheel: true,
        ...this.swiperOptions
        // freeMode: true,
      },
      interval: null
    }
  },
  created () {
    let index = 0
    if (this.moments.data)
      this.moments.data.map(item => {
        item.index = index++
      })

    if (this.swiperOption.autoplay) {
      this.interval = setInterval(() => {
        this.activeItem++
        this.$emit('switch', this.activeItem)
      }, this.swiperOption.delay || 3000)
    }

  },
  mounted () {
    this.updateSlidesPerview(this.viewport)
  },
  watch: {
    moments (n) {
      let index = 0
      n.data.map(item => {
        item.index = index++
      })
      this.data = n
      this.$refs.swiper.swiper.slideTo(this.pageOptions.hasPrevPage ? 1 : 0)
      this.activeItem = 0
    },
    viewport (n) {
      this.updateSlidesPerview(n)
    }
  },
  methods: {
    updateSlidesPerview (n) {
      if (n.is568) this.swiperOption.slidesPerView = 2
      else if (n.is768) this.swiperOption.slidesPerView = 3
      else if (n.is1024) this.swiperOption.slidesPerView = 4
      else if (n.is1600) this.swiperOption.slidesPerView = 8
      else this.swiperOption.slidesPerView = 6
      this.$refs.swiper.swiper.destroy()   //先销毁
      this.$refs.swiper.mountInstance()   //后在加载
    },
    parseDate (date) {
      const d = new Date(date)
      const dateObj = {
        date: d.getDate(),
        my: `${d.getMonth() + 1} / ${d.getFullYear() - 2000}`
      }
      return dateObj
    },
    handleClick (index) {
      this.activeItem = index
      this.$emit('switch', this.activeItem)
      this.interval = clearInterval(this.interval)
    },

  },
  destroyed () {
    clearInterval(this.interval)
    this.interval = null
  }
}
</script>

<style lang="scss">
.swiper-wrapper {
  @for $var from 0 to 6 {
    & > div.card:nth-child(#{$var + 1}n) {
      animation: scale 0.5s forwards;
      animation-delay: $var * 0.1s;
      transform: scale(0);
    }
  }
}
@keyframes scale {
  0% {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
<style lang="scss" scoped>
.swiper {
  padding: 0 1rem;
}
</style>