<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex'
import api from '@/api/master'

export default {
  methods: {
    ...mapActions(['loadUser', 'checkLogged', 'setToken'])
  },
  async created () {
    const { ok } = (await api.checkInit()).data

    if (ok) {
      return this.$router.push('/init')
    }
    this.loadUser()
    this.checkLogged()
    this.setToken(localStorage.token || '')
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

* {
  scrollbar-width: none;
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

img[src=''],
img:not([src]) {
  opacity: 0;
}
</style>
