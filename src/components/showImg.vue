<template>
  <transition name="fade">
    <div class="overlay" v-if="src">
      <img :src="src" :alt="comment" @click="handleClick" />
      <div class="comment">{{ comment }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    comment: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleClick() {
      this.$emit("zoomOut");
    }
  }
};
</script>

<style scoped>
.overlay {
  backdrop-filter: blur(8px);
  height: 100vh;
  width: 100vw;
  z-index: 50;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

img {
  padding: 12px;
  background: #eee;
  border: 6px solid #fff;
  max-width: 80%;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 20px rgba(0, 0, 0, 0.2);
  cursor: zoom-out;
}

img::after {
  content: "";
  height: 50vh;
  width: 80vw;
  position: absolute;
  left: 0;
  top: 0;
  background: #eee;
  border: 6px solid #fff;
}

.comment {
  user-select: none;
  margin-top: 12px;
  font-size: 1.2rem;
  position: relative;
}

.comment::before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 0.6rem;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.4);
  z-index: -99;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>