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
              <div class="text">重逢大都是暖心的，时隔多年，偌大的城市，人海茫茫，我已不复当初，你却仍然，温暖如故</div>
            </template>
          </card>
          <card
            :mStyle="'grid-template-columns: 60% auto;background: #4D63BC;color: #fff!important'"
          >
            <template #left>
              <div class="text info">
                <div>当前已有</div>
                <div class="num">5</div>
                <div>条瞬间</div>
              </div>
            </template>
            <template #right>
              <div class="bg svg clock"></div>
            </template>
          </card>
        </div>

        <!-- end header -->

        <!-- content card start  -->
      </div>
    </template>
  </layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  },
  components: {
    layout: () => import('@/components/Admin/layout.vue'),
    card: () => import('@/components/Admin/card.vue')
  }
}
</script>

<style lang="scss" scoped>
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