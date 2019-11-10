<template>
  <div class="bg">
    <div class="wrap" ref="wrap">
      <div class="side-bar">
        <div class="title" @click="$refs.wrap.classList.toggle('full')">
          Moment
          <!-- <div class="icon" @click="$refs.wrap.classList.add('full')">
            <font-awesome-icon :icon="['fas','arrows-alt-v']"></font-awesome-icon>
          </div>-->
        </div>
        <div class="items">
          <item
            :active="activeItems === index ? true : false"
            :item="item"
            :index="index"
            v-for="(item, index) in items"
            :key="index"
          />
        </div>
        <div class="user">
          <div class="block">
            <img :src="user.avatar" />
            <div class="username" style="transform: translateY(5px)">{{user.username}}</div>
            <div class="dot">.</div>
          </div>
        </div>
      </div>

      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <postDialog
      v-if="dialogs.post && $route.fullPath === '/master/moments'"
      @cancel-post="dialogs.post = false"
    />
    <transition name="fade">
      <overlay v-if="overlay" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import item from '@/components/Admin/sidebar/item.vue'

export default {
  name: 'admin',
  computed: {
    ...mapGetters(['user']),
  },
  components: {
    item,
    postDialog: () => import('@/components/Home/postDialog.vue'),
    overlay: () => import('@/components/Home/overlay.vue')
  },
  methods: {
    ...mapActions(['loadRecentlyMoments'])
  },
  created () {
    this.$root.$data.route = '/master'
    this.loadRecentlyMoments()
  },
  beforeDestroy () {
    this.$root.$data.route = null
    delete this.$root.$data.route
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const path = to.fullPath.replace(vm.$root.$data.route, '').split('/').map(item => '/' + item).slice(1)

      vm.items.forEach((item, index) => {
        if (item.path === path[0]) {
          vm.activeItems = index
          next()
        }
      });
    })
  },
  beforeRouteUpdate (to, from, next) {
    const path = to.fullPath.replace(this.$root.$data.route, '').split('/').map(item => '/' + item).slice(1)
    this.items.forEach((item, index) => {
      if (item.path === path[0]) {
        this.activeItems = index
        next()
      }
    });
  },
  data () {
    return {
      path: '/',
      items: [{
        title: 'Dashboard',
        icon: ['fas', 'tachometer-alt'],
        path: '/dashboard'
      },
      {
        title: 'Moment',
        icon: ['far', 'clock'],
        path: '/moments'
      }, {
        title: '菜单测试',
        icon: ['fas', 'vial'],
        path: '/moments1',
        subItems: [{
          title: '菜单测试 1',
          icon: ['fas', 'vial'],
          path: '/moments',
          subItems: [{
            title: '菜单测试 1 - 1',
            icon: ['fas', 'vial'],
            path: '/moments',
            subItems: [{
              title: '菜单测试 1 - 1 - 1',
              icon: ['fas', 'vial'],
              path: '/moments',
              subItems: [{
                title: '菜单测试 1 - 1 - 1 - 1',
                icon: ['fas', 'vial'],
                path: '/moments',
              }]
            }]
          }]
        },
        {
          title: '菜单测试 2',
          icon: ['fas', 'vial'],
          path: '/moments2',
        }]
      }
      ],
      activeItems: 0,
      overlay: false, // 遮罩
      dialogs: {
        post: false
      }
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
  }
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Nunito&display=swap);

$deepBg: #1681e1;
$shallowbg: #1a9cf3;
.bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $deepBg;
}
.wrap.full {
  margin: 0;
  border-radius: 0;
  .title .icon {
    display: none;
  }
}
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 5rem;
  background: linear-gradient(to bottom, #1188e8, #16aae7);
  border-radius: 24px;
  display: grid;
  grid-template-columns: 15rem auto;
  box-shadow: 5px 24px 133px rgba(0, 0, 0, 0.3);
  transition: margin 0.5s, border-radius 0.4s 0.1s;

  .side-bar {
    $left-margin: 1.5rem;
    color: #fff;
    display: grid;
    grid-template-rows: 6rem auto 6rem;
    overflow: hidden;
    > .title {
      display: flex;
      font-family: 'Josefin Sans', sans-serif;
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
      user-select: none;
      cursor: pointer;
      /* position: relative;
      .icon {
        position: absolute;
        right: 25px;
        transform: rotate(45deg);
        opacity: 0.8;
        cursor: pointer;
        transition: opacity 0.5s;
      }
      .icon:hover {
        opacity: 1;
      }
      .icon::before {
        content: '';
        top: 0;
        bottom: 0;
        right: 0;
        left: -8px;
        border-radius: 6px;
        background: rgba(16, 133, 211, 0.5);
        padding: 10px 15px;
        position: absolute;
        box-sizing: border-box;
        transform: rotate(-45deg);
        z-index: -1;
      } */
    }

    .items {
      margin-left: $left-margin;
      box-sizing: border-box;
      overflow: scroll;
    }

    .user {
      margin: $left-margin;
      background: #13afea;

      // background-clip: content-box;
      border-radius: 12px;
      position: relative;
      .block {
        max-height: 100%;
        display: grid;
        grid-template-columns: 50px auto 20px;
        margin: 0.5rem;
        user-select: none;
        * {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .username {
          font-family: 'Josefin Sans', sans-serif;
        }

        img {
          max-width: 30px;
          border-radius: 50%;
        }
      }
    }
  }
  .content {
    background-color: #fff !important;
    border-radius: 0 24px 24px 0;
    transition: border-radius 0.5s;
    position: relative;
  }
  &.full .content {
    border-radius: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>