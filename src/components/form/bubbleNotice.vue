<template>
  <div class="notice-list">
    <div class="bubble" :style="{ backgroundColor: color}">
      <div class="content">{{msg}}</div>
    </div>
    <div class="bubble" :style="{ backgroundColor: color}">
      <div class="content">{{msg}}</div>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    msgList: []
  },
  data () {
    return {
      msg: '我好了',
      color: '#e3e3e3'
    }
  }
}
</script>

<style>
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
}
.bubble .content {
  padding: 0.5em 1em;
  display: table-cell;
}
</style>