<template>
  <div style="position: relative; height: 100%">
    <transition name="fade">
      <div class="wrap" v-if="moments.ok === 1" key="page1">
        <header>
          <header-nav @hideSwiper="handleHideSwiper"/>
        </header>
        <main
            :style="hideSwiper ? 'height: calc(100vh - 8rem)' : ''"
            v-if="viewport.is1024 || viewport.isDesktop || viewport.is1600 ">
          <information class="i" :skill="information.skill">
            <template v-slot:introduce>
              <p>{{ information.introduce }}</p>
            </template>
          </information>

          <div class="content">
            <showContent :content="moments.data[activeItem]" v-if="moments.data" @showImg="handleImg"/>
          </div>
        </main>
        <!--    for responsive design  -->
        <main v-if="viewport.is768 || viewport.is568"
              :style="hideSwiper ? 'height: calc(100vh - 8rem)' : ''">
          <info-res :toSec="toSec"
                    :skill="information.skill"
                    :content="moments.data[activeItem]"
                    :intro="information.introduce">
            <div class="content">
              <showContent :content="moments.data[activeItem]" v-if="moments.data" @showImg="handleImg"/>
            </div>
          </info-res>
        </main>
        <transition name="slide-down">
          <div id="swiper" style="position: relative" v-show="!hideSwiper">
              <swiper :moments="moments"
                  :viewport="viewport"
                  :pageOptions="pageOptions"
                  @switch="handleSwitch"
                  class="swiper"/>
          </div>
        </transition>
      </div>
      <!--    show img  -->
      <div class="message" v-else key="page2">
        <div id="loader-wrapper">
          <div id="loader"></div>
          <div class="loader-section section-left"></div>
          <div class="loader-section section-right"></div>
          <div class="load_title">数据正在加载中...
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
    <show-img :src="img.src" :comment="img.comment" @zoomOut="handleZoomOut" v-if="img.src"/>
    </transition>
  </div>

</template>

<script>
  import headerNav from '@/components/headerNav.vue'
  import swiper from '@/components/swiper.vue'
  import information from '@/components/information'
  import showContent from '@/components/showContent.vue'
  import showImg from '@/components/showImg.vue'

  import infoRes from '@/components/responsive/swiper-page.vue'
  import momentApi from '@/api/moment'
  import masterApi from '@/api/master'

  export default {
    components: {
      headerNav,
      swiper,
      information,
      showContent,
      infoRes,
      showImg
    },
    data() {
      return {
        moments: {},
        pageOptions: {
          size: 10,
          currentPage: 1,
          totalPage: 1,
          hasNextPage: false,
          hasPrevPage: false
        },
        information: {},
        viewport: {},
        activeItem: 0,
        toSec: false, // 前往第二页，响应式视图
        img: {
          displayImg: '',
          comment: ''
        },
        hideSwiper: false
      }
    },
    async created() {
      const moments = (await momentApi.getRecentlyMoment({
        size: 10,
        page: this.pageOptions.currentPage
      })).data
      this.pageOptions = moments.pageOptions
      const informations = (await masterApi.getUserIntroduce()).data
      this.moments = moments
      this.information = informations
    },
    mounted() {
      this.updateViewport()
      window.addEventListener('resize', this.throttle(this.updateViewport, 100))
    },
    methods: {
      throttle(func, delay) {
        let timer = null;
        return function () {
          if (!timer) {
            timer = setTimeout(() => {
              func.apply(this, arguments)
              timer = null;
            }, delay);
          }
        };
      },
      updateViewport() {
        this.viewport = {
          w: window.innerWidth,
          h: window.innerHeight,
          is568: window.innerWidth <= 568,
          is768: window.innerWidth <= 768 && window.innerWidth > 568,
          is1024: window.innerWidth <= 1024 && window.innerWidth > 768,
          isDesktop: window.innerWidth > 1024 && window.innerWidth < 1600,
          is1600: window.innerWidth >= 1600
        }
      },
      handleSwitch(e = 0) {
        this.activeItem = e

        if (this.viewport.is768 || this.viewport.is568) {
          this.toSec = true
          setTimeout(() => {
            this.toSec = false
          })
        }
      },
      handleImg(json) {
        const parse = JSON.parse(json)
        this.img = parse
      },
      handleZoomOut() {
        this.img = {}
      },
      handleHideSwiper() {
        this.hideSwiper = !this.hideSwiper
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');

  * {
    font-family: 'Josefin Sans', sans-serif;
  }
</style>
<style lang="scss" scoped>
  main {
    height: calc(100vh - 22rem);
    display: flex;
    transition: height .5s;

    .i {
      flex: .28
    }

    .content {
      flex: .72;
      height: 100%;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("./../assets/0.svg") fixed no-repeat;
        background-size: 25% 25%;
        background-position: right bottom;
        opacity: .25;
      }

      @media (max-width: 468px) {
        .content {
          background-size: 50% 50%;
          background-position: bottom;
        }
      }
    }
  }

  .wrap {
    min-height: 100vh;
    position: relative;
  }

  @media (min-width: 1024px) {
    .wrap::before {
      content: '';
      position: absolute;
      width: 1px;
      top: 0;
      bottom: 0;
      border-left: 1px solid #eee;
      left: 28%
    }
  }

  @import "../assets/css/loading.css";

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-down-enter-active, .slide-down-leave-active {
    transition: transform .5s;
    transform: translateY(0)
  }

  .slide-down-enter, .slide-down-leave-to {
    transform: translateY(100%)
  }

</style>