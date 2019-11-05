<template>
  <div class="header" v-if="data.username">
    <div class="left">
      <span class="username">{{ data.username }}</span>
      <!-- <div class="btn" style="padding: .2rem 1rem;display: inline-block;" @click="handleShowItems">
        <div class="btn-flex">
          <span>
          <font-awesome-icon :icon="['fas','sliders-h']"/>
          </span>
          <span>
          <font-awesome-icon :icon="['fas','chevron-down']" v-if="!options.showItems"/>
           <font-awesome-icon :icon="['fas','chevron-up']" v-else/>
          </span>
        </div>

        <transition name="slide">
          <div class="items" v-if="options.showItems">
            <div class="item" >
              信息
            </div>
            <div class="item" >
              瞬间
            </div>
          </div>
        </transition>
      </div>-->
      <div class="btn" style="background: none;margin-left: 1rem" @click="$emit('hideSwiper')">
        <font-awesome-icon :icon="['fas','dot-circle']" />
      </div>
    </div>
    <div class="right">
      <input
        v-model="search"
        type="text"
        class="search-bar"
        :class="options.showSearchBar ? 'active' : ''"
      />
      <span class="btn" @click="handleSearch">
        <font-awesome-icon :icon="['fas','search']" />
      </span>
      <span class="line"></span>

      <div class="btn" @click="handleClickUser">
        <div class="btn-flex">
          <img :src="data.avatar" />
          <div class="btn" style="display: inline-block" v-if="objectIsEmpty(data.userUrl)">
            <font-awesome-icon :icon="['fas','chevron-down']" />
          </div>
        </div>

        <transition name="slide" v-if="!objectIsEmpty(data.userUrl)">
          <div class="items" v-if="options.showUser">
            <!-- <div class="item">
              <a href="https://github.com/Innei/moment">GitHub</a>
            </div>
            <div class="item">
              <a href="https://shizuri.net">Blog</a>
            </div>-->
            <!-- TODO replace item if logined as master -->
            <div class="item" v-for="(url, title) in data.userUrl" :key="title">
              <a :href="url">{{title}}</a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      data: 'user'
    })
  },
  data () {
    return {
      options: {
        showSearchBar: false,
        showItems: false,
        showUser: false
      },
      search: ''
    }
  },
  methods: {
    handleSearch () {
      this.options.showSearchBar = !this.options.showSearchBar
      this.search = ''
    },
    handleShowItems () {
      this.options.showItems = !this.options.showItems
    },
    handleClickUser () {
      this.options.showUser = !this.options.showUser
    },
    objectIsEmpty (obj) {
      return JSON.stringify(obj) === '{}'
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
  user-select: none;
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
  width: 0rem;
  height: 1.5rem;
  border-radius: 24px;
  background: #fff;
  border: 1px solid #d0d3d6;
  margin-right: 1rem;
  outline: none;
  padding-left: 1rem;
  transition: width 0.5s, opacity 0.3s;
  opacity: 0;
}

.right .search-bar.active {
  width: 10rem;
  opacity: 1;
}

.line {
  position: relative;
  margin: 0 1rem;
  width: 1px;
}

.line::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-50%);
  height: 0.8rem;
  border-left: 1px solid #d0d3d6;
}

.items {
  position: absolute;
}

.items .item {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 1rem 0;
}

.items .item::before {
  content: '';
  bottom: 0;
  left: 3px;
  right: 3px;
  position: absolute;
  z-index: -1;
  height: 0.2rem;
  background: #eee;
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.5s;
  transform: translateY(0);
}

.slide-enter,
.slide-leave-to {
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