<template>
  <swiper-slide class="card" :class="isActive ? 'active': ''">
    <div class="header">
      <div class="date">{{ date.date }}</div>
      <div class="type">
        <div class="top">{{ data.type }}</div>
        <div class="bottom">{{ date.my }}</div>
      </div>
    </div>
    <div class="body">
      {{ user.username + ' posted a ' + data.type }}
      <slot></slot>
    </div>
    <div class="btn">
      <slot name="btn"></slot>
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
        required: true
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
    transition: background-color ease-in-out .8s, height .8s;
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
            color: #c7caff
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
        color: #09233a
      }

      .type {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;

        .top {
          flex: 1;
          color: #acb3b7
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
      margin-top: 1.3rem;
      line-height: 1.8;
      color: #9599a0
    }
  }
</style>