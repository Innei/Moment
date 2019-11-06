<template>
  <div class="layout">
    <header>
      <span class="title">{{$route.meta.title.split('--')[0]}}</span>
      <slot name="header-btn"/>
    </header>

    <main></main>

    <footer></footer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.layout {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 3rem;
  header {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 1.5rem;
    }
  }
}
</style>