<template>
  <div class="overlay"></div>
</template>

<script>
export default {

}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 55;
  background: rgba(0, 0, 0, .5);
  backdrop-filter: blur(2px);
}
</style>