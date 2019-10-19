<template>
  <div class="wrap">
    <header>
      <header-nav></header-nav>
    </header>
    <main>
      <information class="i" :skill="information.skill">
        <template v-slot:introduce>
         <p>{{ information.introduce }}</p>
        </template>
      </information>
    </main>
    <swiper :data="moments" :viewport="viewport"></swiper>
  </div>
</template>

<script>
  import headerNav from '@/components/headerNav.vue'
  import swiper from '@/components/swiper.vue'
  import information from '@/components/information'

  import momentApi from '@/api/moment'
  import UserApi from '@/api/user'

  export default {
    components: {
      headerNav,
      swiper,
      information
    },
    data() {
      return {
        moments: {},
        information: {},
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
          is1600: window.innerWidth >= 1600
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
    min-height: calc(100vh - 26rem);
    display: flex;

    .i {
      flex: .28
    }
  }

  .wrap {
    min-height: 100vh;
    position: relative;
  }

  .wrap::before {
    content: '';
    position: absolute;
    width: 1px;
    top: 0;
    bottom: 0;
    border-left: 1px solid #eee;
    left: 28%
  }
</style>