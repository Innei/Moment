<template>
  <div style="position: relative; height: 100%">
    <transition name="fade">
      <div class="wrap" v-if="moments.ok === 1" key="page1">
        <header>
          <header-nav @hideSwiper="handleHideSwiper" />
        </header>
        <main
          :style="hideSwiper ? 'height: calc(100vh - 8rem)' : ''"
          v-if="viewport.is1024 || viewport.isDesktop || viewport.is1600 "
        >
          <information
            class="i"
            :skill="information.skill"
            :showPostBtn="hideSwiper"
            @post-new="handlePostNew"
          >
            <template v-slot:introduce>
              <p>{{ information.introduce }}</p>
            </template>
          </information>

          <div class="content">
            <showContent
              :content="moments.data[activeItem]"
              v-if="moments.data"
              @showImg="handleImg"
            />
          </div>
        </main>
        <!--    for responsive design  -->
        <main
          v-if="viewport.is768 || viewport.is568"
          :style="hideSwiper ? 'height: calc(100vh - 8rem)' : ''"
        >
          <info-res
            :hideSwiper="hideSwiper"
            @post-new="handlePostNew"
            :toSec="toSec"
            :skill="information.skill"
            :content="moments.data[activeItem]"
            :intro="information.introduce"
          >
            <div class="content">
              <showContent
                :content="moments.data[activeItem]"
                v-if="moments.data"
                @showImg="handleImg"
              />
            </div>
          </info-res>
        </main>
        <transition name="slide-down">
          <div id="swiper" style="position: relative" v-show="!hideSwiper">
            <swiper
              :moments="moments"
              :viewport="viewport"
              :pageOptions="pageOptions"
              @switch="handleSwitch"
              @slide_btn-clicked="handleSwitchPage"
              class="swiper"
            />
          </div>
        </transition>
      </div>
      <!--    show img  -->
      <div class="message" v-else key="page2">
        <div id="loader-wrapper">
          <div class="loader-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="margin:auto;display:block;visibility: unset"
              width="78px"
              height="78px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle cx="50" cy="33.847" r="15" fill="#e15b64">
                <animate
                  attributeName="cy"
                  dur="0.9803921568627451s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
                  keyTimes="0;0.5;1"
                  values="25;75;25"
                />
              </circle>
            </svg>
            <div class="loader-title">数据正在加载中...</div>
          </div>
        </div>
      </div>
    </transition>

    <!-- full screen components  -->
    <transition name="fade">
      <show-img :src="img.src" :comment="img.comment" @zoomOut="handleZoomOut" v-if="img.src" />
    </transition>
    <postDialog v-if="dialogs.post" @cancel-post="dialogs.post = false" @submit-ok="handleSubmit" />
    <transition name="fade">
      <overlay v-if="overlay" />
    </transition>
    <!-- end -->
  </div>
</template>

<script>
import headerNav from '@/components/Home/headerNav.vue'
import swiper from '@/components/Home/swiper.vue'
import information from '@/components/Home/information'
import showContent from '@/components/Home/showContent.vue'
import showImg from '@/components/Home/showImg.vue'
import infoRes from '@/components/Home/responsive/swiper-page.vue'
import overlay from '@/components/Home/overlay.vue'
import postDialog from '@/components/Home/postDialog.vue'

import momentApi from '@/api/moment'
import masterApi from '@/api/master'

import { mapGetters } from 'vuex'

export default {
  components: {
    headerNav,
    swiper,
    information,
    showContent,
    infoRes,
    showImg,
    overlay,
    postDialog
  },
  data () {
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
      hideSwiper: false,
      overlay: false, // 遮罩
      dialogs: {
        post: false
      }
    }
  },
  async created () {
    const moments = (await momentApi.getRecentlyMoment({
      size: 10,
      page: this.pageOptions.currentPage
    })).data
    this.pageOptions = moments.pageOptions
    const informations = (await masterApi.getUserIntroduce()).data
    this.moments = moments
    this.information = informations
  },
  mounted () {
    this.updateViewport()
    window.addEventListener('resize', this.throttle(this.updateViewport, 100))
  },
  methods: {
    throttle (func, delay) {
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
    updateViewport () {
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
    handleSwitch (e = 0) {
      this.activeItem = e

      if (this.viewport.is768 || this.viewport.is568) {
        this.toSec = true
        setTimeout(() => {
          this.toSec = false
        })
      }
    },
    handleImg (json) {
      const parse = JSON.parse(json)
      this.img = parse
    },
    handleZoomOut () {
      this.img = {}
    },
    handleHideSwiper () {
      this.hideSwiper = !this.hideSwiper
    },
    async handleSubmit () {
      this.moments = (await momentApi.getRecentlyMoment({
        size: 10,
        page: this.pageOptions.currentPage
      })).data
    },
    async handleSwitchPage (e) {
      let page = this.pageOptions.currentPage
      if (e === 'next') {
        page + 1 > this.pageOptions.totalPage ? page : ++page
      } else {
        page === 1 ? 1 : --page
      }
      const moments = (await momentApi.getRecentlyMoment({
        size: 10,
        page
      })).data
      this.pageOptions = moments.pageOptions
      this.moments = moments
      this.activeItem = 0
    },
    async handlePostNew () {
      this.dialogs.post = true
    }
  },
  watch: {
    dialogs: {
      deep: true,
      handler (val) {
        let overlay = false
        for (const flag of Object.values(val)) {

          if (flag === true) {
            overlay = true
            break
          }
        }
        this.overlay = overlay
      }
    }
  },
  computed: {
    ...mapGetters(['isLogged'])
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
  transition: height 0.5s;

  .i {
    flex: 0.28;
  }

  .content {
    flex: 0.72;
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
      background: url('./../assets/0.svg') fixed no-repeat;
      background-size: 25% 25%;
      background-position: right bottom;
      opacity: 0.25;
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
    left: 28%;
  }
}

@import '../assets/css/loading.css';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.5s;
  transform: translateY(0);
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(100%);
}
</style>