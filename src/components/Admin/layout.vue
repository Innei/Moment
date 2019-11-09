<template>
  <div class="layout">
    <header>
      <span class="title">{{$route.meta.title.split('--')[0]}}</span>
      <div class="btn" @click="$emit('btn-click')" v-if="$slots.header">
        <div class="name">
          <slot name="header"></slot>
        </div>
        <div class="add">
          <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
        </div>
      </div>
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
    background: rgba($color: #fff, $alpha: 0.3);
    backdrop-filter: blur(5px);
    z-index: 99;
    padding: 0.5rem 0.8rem;
    border-radius: 0 0 12px 12px;
    top: 0px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    .title {
      font-size: 1.5rem;
      user-select: none;
      align-items: center;
      display: flex;
    }

    .btn {
      background: #1188e8;
      padding: 1rem 2rem;
      border-radius: 24px;
      color: #fff;
      user-select: none;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      position: relative;
      .name {
        margin-right: 2rem;
      }
      .add {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        padding: 1rem;
        font-size: 16px;
      }
      .add::before {
        content: '';
        position: absolute;
        top: 1px;
        bottom: 1px;
        right: 0;
        left: 0;
        margin: 0.3rem;
        border-radius: 50%;
        background: #379af1;
        z-index: -1;
      }
      // line-height: 1.5;
    }
  }
}
</style>