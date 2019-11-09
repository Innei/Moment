<template>
  <layout>
    <template #main>
      <!-- header start -->
      <div class="header">
        <div class="card-wrap">
          <card>
            <template #left>
              <div class="bg svg welcome"></div>
            </template>
            <template #right>
              <div class="text info">欢迎回来主人，{{user.username}} ～</div>
              <div
                class="text"
              >{{hitokoto.id ? hitokoto.hitokoto + ' ———— ' + hitokoto.from : '请稍后 ...'}}</div>
            </template>
          </card>
          <card
            :mStyle="'grid-template-columns: 60% auto;background: #4D63BC;color: #fff!important'"
          >
            <template #left>
              <div class="text info">
                <div>当前已有</div>
                <div class="num">{{total || 'NaN'}}</div>
                <div>条瞬间</div>
              </div>
            </template>
            <template #right>
              <div class="bg svg clock"></div>
            </template>
          </card>
        </div>
      </div>
      <!-- end header -->

      <!-- body card start  -->
      <div class="body">
        <div class v-for="moment in moments" :key="moment._id">
          <keep-alive>
            <item-card
              :time="{createdTime: moment.createdTime,modifiedTime:moment.modifiedTime}"
              :type="moment.type"
              :title="moment.content.title"
              :content="moment.content"
            >
              <pre>
            <!-- {{moment.content.body}} -->
          </pre>
            </item-card>
          </keep-alive>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import { mapGetters } from 'vuex'
// import MomentApi from '@/api/moment'

export default {
  data () {
    return {
      hitokoto: {
        hitokoto: null,
        id: null,
        from: null,
        creator: null
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['moments']),
    ...mapGetters(['total'])
  },
  components: {
    layout: () => import('@/components/Admin/layout.vue'),
    card: () => import('@/components/Admin/card.vue'),
    itemCard: () => import('@/components/Admin/item-card.vue')
  },
  created () {
    // get hitokoto
    import('axios').then(axios => {
      axios.get('https://v1.hitokoto.cn/').then(res => {
        this.hitokoto = res.data
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 50px;
}
.card-wrap {
  display: grid;
  grid-template-columns: 61.8% auto;
  grid-gap: 20px;
}

.bg.svg {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100%;

  &.welcome {
    background-image: url('./../../assets/1.svg');
  }
  &.clock {
    background-image: url('./../../assets/2.svg');
  }
}
</style>