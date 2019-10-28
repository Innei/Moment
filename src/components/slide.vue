<template>
  <swiper-slide class="card" :class="{active: isActive, btn: !data.type && data.icon }">
    <div class="normal" v-if="data.type">
      <div class="header">
        <div class="date">{{ date.date || 'N'}}</div>
        <div class="type">
          <div class="top">{{ data.type }}</div>
          <div class="bottom" v-if="date.my">{{ date.my }}</div>
        </div>
      </div>
      <div class="body">{{ user.username + ' posted a ' + data.type }}</div>
    </div>
    <div class="btn next_btn prev_btn" v-else>
      <font-awesome-icon :icon="data.icon" @click="$emit('slide_btn-clicked')"/>
    </div>
  </swiper-slide>
</template>

<script>
import { swiperSlide } from 'vue-awesome-swiper'
import { mapState } from 'vuex'

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    date: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    swiperSlide
  },
  computed: {
    ...mapState({ user: state => state.user })
  }
}
</script>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  width: 15rem;
  height: 12rem;
  border-radius: 48px;
  background-color: #fff;
  will-change: backgroud;
  transition: background-color ease-in-out 0.8s, height 0.8s;
  color: #989fa7;
  padding: 2rem;
  user-select: none;

  &.active {
    background-color: #6467f6;
    color: #fff;
    height: 15rem;

    .header {
      .date {
        color: #fff;
      }

      .type {
        .top {
          color: #c7caff;
        }

        .bottom {
          color: #b0b3f3;
        }
      }
    }
  }

  .header {
    display: flex;
    align-items: center;

    .date {
      font-size: 3rem;
      color: #09233a;
    }

    .type {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;

      .top {
        flex: 1;
        color: #acb3b7;
      }

      .bottom {
        color: #072b47;
      }
    }
  }

  &.active .body {
    color: #c7caff;
  }

  .body {
    line-height: 1.8;
    color: #9599a0;
  }
}
.btn {
  background: transparent !important;

  &.next_btn.prev_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 3rem;
    height: 100%;
    width: 100%;
    position: relative;
    transition: color 0.5s;
  }

  &.next_btn.prev_btn:hover {
    color: #eee;
  }

  &.next_btn.prev_btn::before {
    content: '';
    position: absolute;
    height: 12rem;
    width: 12rem;
    z-index: -1;
    transition: opacity 0.5s;
    opacity: 0;
    background: radial-gradient(9rem circle, #9599a0 30%, transparent 31%);
    background-position: center center;
  }

  &.next_btn.prev_btn:hover::before {
    opacity: .5;
  }
}
</style>