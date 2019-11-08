<template>
  <div class="layout">
    <header>
      <span class="title">{{$route.meta.title.split('--')[0]}}</span>
      <slot name="header-btn" />
    </header>

    <main>
      <slot name="main" />
    </main>

    <footer></footer>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: auto;
  margin: 2.5rem 3rem 0;

  header {
    position: sticky;
    background: rgba($color: #fff, $alpha: .3);
    backdrop-filter: blur(5px);
    z-index: 99;
    padding: .5rem .8rem;
    border-radius: 0 0 12px 12px;
    top: 0px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    .title {
      font-size: 1.5rem;
      user-select: none;
    }
  }

}
</style>