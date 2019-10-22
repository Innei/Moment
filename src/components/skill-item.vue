<template>
  <div>
    <span class="name">{{ name }}</span>
    <span class="process">
      <transition name="move">
        <span class="up" :style="'right: '+ val " v-show="val"></span>
      </transition>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      score: Number
    },
    data() {
      return { val: 0 }
    },
    mounted() {
      this.val = `${ 100 - this.score }%`
    }
  }
</script>

<style scoped>
  * {
    user-select: none;
  }
  div {
    display: flex;
    position: relative;
    margin-bottom: 2rem;
    align-items: center;
  }

  .name {
    color: #043046;
    flex: 0.4;
  }

  .process {
    flex: 0.6;
    background-color: #c7cbca;
    height: 4px;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }

  .process .up {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 100%;
    transition: 1.5s;
    background-color: #fbd2d5;
  }
  .move-enter-active, .move-leave-active {
    transition: .5s;
  }
  .move-enter, .move-leave-to /* move-leave-active below version 2.1.8 */ {
    transform: translateX(-100%);
  }
</style>