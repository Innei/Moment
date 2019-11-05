<template>
  <swiper :options="swiperOption" ref="pageSwiper">
    <swiper-slide class="page">
      <information :skill="skill" :showPostBtn="hideSwiper" @post-new="$emit('post-new')">
        <template v-slot:introduce>
          <p>{{ intro }}</p>
        </template>
      </information>
    </swiper-slide>
    <swiper-slide>
      <div class="content">
        <slot></slot>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import information from '@/components/Home/information'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    skill: {
      require: true,
      type: Object
    },
    content: {
      type: Object,
      require: true
    },
    toSec: {
      type: Boolean,
      default: false
    },
    intro: {},
    hideSwiper: {
      type: Boolean
    }
  },
  components: {
    swiper,
    swiperSlide,
    information
  },
  computed: {
    swiper () {
      return this.$refs.pageSwiper.swiper
    }
  },
  data () {
    return {
      swiperOption: {
        width: window.innerWidth,
        observer: true,
        observeParents: true,
        on: {
          resize () {
            this.params.width = window.innerWidth
            this.update()
          },
        }
      }
    }
  },
  watch: {
    toSec (n) {
      if (n === true) {
        this.swiper.slideTo(2, 1000, false)
      }
    }
  }
}
</script>

<style scoped>
.content {
  height: 100%;
  position: relative;
}
</style>