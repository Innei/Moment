<template>
  <transition name="fade">
    <div class="wrap" v-if="moments.ok === 1" key="page1">
      <header>
        <header-nav/>
      </header>
      <main v-if="viewport.is1024 || viewport.isDesktop || viewport.is1600 ">
        <information class="i" :skill="information.skill">
          <template v-slot:introduce>
            <p>{{ information.introduce }}</p>
          </template>
        </information>

        <div class="content">
          <showContent :content="moments.data[activeItem]" v-if="moments.data"/>
        </div>
      </main>
      <!--    for responsive design  -->
      <main v-if="viewport.is768 || viewport.is568">
        <info-res :toSec="toSec"
                  :skill="information.skill"
                  :content="moments.data[activeItem]"
                  :intro="information.introduce">
          <div class="content">
            <showContent :content="moments.data[activeItem]" v-if="moments.data"/>
          </div>
        </info-res>
      </main>
      <swiper :data="moments" :viewport="viewport" @switch="handleSwitch"></swiper>
    </div>

    <div class="message" v-else key="page2">
      <!--<div class="box">
        <div class="msg">
          数据正在加载中...
        </div>
      </div>-->
      <div id="loader-wrapper">
        <div id="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
        <div class="load_title">数据正在加载中...
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  import headerNav from '@/components/headerNav.vue'
  import swiper from '@/components/swiper.vue'
  import information from '@/components/information'
  import showContent from '@/components/showContent.vue'
  import infoRes from '@/components/responsive/swiper-page.vue'
  import momentApi from '@/api/moment'
  import UserApi from '@/api/user'

  export default {
    components: {
      headerNav,
      swiper,
      information,
      showContent,
      infoRes
    },
    data() {
      return {
        moments: {},
        information: {},
        viewport: {},
        activeItem: 0,
        toSec: false
      }
    },
    async created() {
      const moments = (await momentApi.getRecentlyMoment({
        size: 10,
        page: 1
      })).data
      const informations = (await UserApi.getUserIntroduce(1)).data
      this.moments = moments
      this.information = informations
    },
    mounted() {
      // update viewport
      this.updateViewport()
      // add resize listener
      window.addEventListener('resize', this.updateViewport)
    },
    methods: {
      updateViewport() {
        // update
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
    height: calc(100vh - 26rem);
    display: flex;

    .i {
      flex: .28
    }

    .content {
      flex: .72;
      height: 100%;
      position: relative;
      overflow: hidden;
      background: url("./../assets/0.svg") fixed no-repeat;
      background-size: 25% 25%;
      background-position: right;

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

  /*.message {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;

    .box {
      display: flex;
      height: 6rem;
      width: 12rem;
      border-radius: 24px;
      padding: 1rem 2rem;
      justify-content: center;
      align-items: center;

      .msg {
        font-weight: 100;
        color: #797979;
      }
    }
  }*/

  @import "../assets/css/loading.css";

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>