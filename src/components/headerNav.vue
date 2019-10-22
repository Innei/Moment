<template>
  <div class="header" v-if="data.username">
    <div class="left">
      <span class="username">{{ data.username }}</span>
      <div class="btn" style="padding: .2rem 1rem;display: inline-block;" @click="handleShowItems">
        <div class="btn-flex">
          <span>
          <font-awesome-icon :icon="['fas','sliders-h']"/>
          </span>
          <span>
          <font-awesome-icon :icon="['fas','chevron-down']" v-if="!showItems"/>
           <font-awesome-icon :icon="['fas','chevron-up']" v-else/>
          </span>
        </div>

        <transition name="slide">
          <div class="items" v-if="showItems">
            <div class="item" >
              信息
            </div>
            <div class="item" >
              瞬间
            </div>
          </div>
        </transition>
      </div>
    <div class="btn" style="background: none;margin-left: 1rem" @click="$emit('hideSwiper')">
      <font-awesome-icon :icon="['fas','dot-circle']"/>
    </div>
    </div>
    <div class="right">
      <input type="text" class="search-bar" v-if="showSearchBar"/>
      <span class="btn" @click="handleSearch">
        <font-awesome-icon :icon="['fas','search']"/>
      </span>
      <span class="line"></span>

      <div class="btn" @click="handleClickUser">
        <div class="btn-flex">
          <img :src="data.avatar"/>
          <div class="btn" style="display: inline-block">
            <font-awesome-icon :icon="['fas','chevron-down']"/>
          </div>
        </div>

        <transition name="slide">
          <div class="items" v-if="showUser">
            <div class="item">
              <a href="https://github.com/Innei/moment">GitHub</a>
            </div>
            <div class="item">
              <a href="https://shizuri.net">Blog</a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        data: state => state.user
      })
    },
    data() {
      return {
        showSearchBar: false,
        showItems: false,
        showUser: false
      }
    },
    methods: {
      handleSearch() {
        this.showSearchBar = !this.showSearchBar
      },
      handleShowItems() {
        this.showItems = !this.showItems
      },
      handleClickUser() {
        this.showUser = !this.showUser
      }

    }
  }
</script>

<style scoped>

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #d0d3d6;
  }

  .header .username {
    margin-right: 1rem;
    color: #363c42;
    user-select: none;
  }

  .left,
  .right {
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .left .btn {
    background-color: #e9ebf0;
    border-radius: 24px;
  }

  .btn {
    cursor: pointer;
    position: relative;
    display: inline-block;
  }

  .btn-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left .btn span:nth-child(1) {
    margin-right: 1rem;
  }

  @media (max-width: 500px) {
    .left .btn span:nth-child(1) {
      margin-right: 0;
    }

    .left .btn span:nth-child(2) {
      display: none;
    }
  }

  .right img {
    border-radius: 88%;
    max-width: 30px;
    margin-right: 1rem;
    user-select: none;
  }

  .right .search-bar {
    width: 10rem;
    height: 1.5rem;
    border-radius: 24px;
    background: #fff;
    border: 1px solid #d0d3d6;
    margin-right: 1rem;
    outline: none;
    padding-left: 1rem;
    transition: width .5s;
    animation: to-left 1s forwards ease-out;
  }

  .line {
    position: relative;
    margin: 0 1rem;
    width: 1px;
  }

  .line::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-50%);
    height: 0.8rem;
    border-left: 1px solid #d0d3d6;
  }

  @keyframes to-left {
    0% {
      width: 0;
    }
    to {
      width: 10rem;
    }
  }

  .items {
    position: absolute;
  }

  .items .item {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 1rem 0 ;
  }

  .items .item::before {
    content: '';
    bottom: 0;
    left: 3px;
    right: 3px;
    position: absolute;
    z-index: -1;
    height: .2rem;
    background: #eee;
  }

  .slide-enter-active, .slide-leave-active {
    transition: .5s;
    transform: translateY(0);
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateY(-10%);
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }
</style>