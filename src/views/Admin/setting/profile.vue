<template>
  <layout>
    <template #main>
      <div class="grid">
        <div class="left">
          <img
            class="before"
            @load="$refs.avatar.classList.remove('before')"
            @error="$refs.avatar.classList.add('before')"
            :src="user.avatar"
            ref="avatar"
          />
          <div class="add">+</div>
        </div>
        <div class="right">
          <form action="#"></form>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    layout: () => import('@/components/Admin/layout.vue')
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['loadUser'])
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 250px auto;
}
.left, .right {
  position: relative;
}
img {
  max-width: 100px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 3px solid #eee;
  transition: border 0.8s;
  transform: scale(2);
  transform-origin: left top;
  margin: 0 50px;
  position: relative;
}
img.before {
  width: 50px;
  height: 50px;
  border: 53px solid #eee;
}
img:not([before]) + .add {
  border-radius: 50%;
  background: #00A0D7;
  display: inline-block;
  position: absolute;
  bottom: -50%;
  right: 10px;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>