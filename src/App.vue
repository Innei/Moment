<template>
  <router-view></router-view>
</template>

<script>
import { mapMutations } from 'vuex'
import masterApi from '@/api/master'

export default {
  methods: {
    ...mapMutations(['storeData'])
  },
  async created () {
    const data = (await masterApi.getUserInfo()).data
    this.storeData(data)
  }
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  background-color: #fafafa;
}

body {
  min-height: 100vh;
}

a {
  color: unset;
}

a:active {
  color: unset;
}

a:hover {
  color: unset;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

html {
  font-size: 16px;
}
@media (max-width: 500px) {
  html {
    font-size: 0.8rem;
  }
}

.notice-list {
  top: 2em;
  left: 0;
  right: 0;
  z-index: 60;
  position: fixed;
  user-select: none;
  pointer-events: none;
  /* display: flex;
      justify-content: center;
      align-items: center; */
}
</style>
