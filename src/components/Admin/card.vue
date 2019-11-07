<template>
  <div class="card" :style="mStyle">
    <div class="left" :style="lStyle">
      <slot name="left" />
    </div>
    <div class="right" :style="rStyle">
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lStyle: String,
    rStyle: String,
    mStyle: String
  }
}
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 40% auto;
  background: #f4f4f7;
  color: #020720;
  .left,
  .right {
    padding: 1.118rem;
    // background: url(../../assets/1.svg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .text {
    .num {
      font-size: 3rem;
      display: inline;
      padding: 0 0.5em;
      font-weight: 800
    }
    .num ~ * {
      display: inline-block;
    }
  }
  .text {
    line-height: 1.5;
  }
  .info {
    margin-bottom: 0.618rem;
    font-size: 1.18rem;
  }
}
</style>