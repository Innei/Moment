<template>
  <div class="layout">
    <header>
      <span class="title">{{$route.meta.title.split('--')[0]}}</span>
      <slot name="header-btn" />
    </header>
    <div class="scroll">
      <main>
        <slot name="main" />
      </main>

      <footer></footer>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.layout {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  margin: 2.5rem 3rem 0;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    .title {
      font-size: 1.5rem;
    }
  }

  .scroll {
    overflow: scroll;
  }
}
</style>