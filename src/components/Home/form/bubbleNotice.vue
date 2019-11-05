<template>
  <div class="notice-list">
    <div
      class="bubble"
      :style="{ backgroundColor: msg.color}"
      v-for="(msg, index) in msgList"
      :key="index"
    >
      <div class="content">{{msg.msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msgList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
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
.bubble {
  color: #fff;
  display: table;
  background: #333;
  border-radius: 3em;
  pointer-events: auto;
  margin: 0 auto 1em auto;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  transform: scale(0);
  animation: scale 0.5s forwards, close 0.5s forwards 2.5s;
  background-color: #7e7af8;
}
.bubble .content {
  padding: 0.5em 1em;
  display: table-cell;
}

@keyframes scale {
  to {
    transform: scale(1);
  }
}
@keyframes close {
  to {
    transform: scale(0);
  }
}
</style>