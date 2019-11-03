<template>
  <div
    class="bubble"
    :style="{ backgroundColor: color }"
    :class="{red:type === 'error',green: type === 'success', yellow: type === 'warning'}"
  >
    <div class="content">{{msg}}</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: '',
      color: ''
    }
  },
  install (Vue) {
    Vue.prototype.$msg = (config) => {   //通过原型注册一个方法
      if (!config.msg) {
        return
      }
      const MessageConstructor = Vue.extend(this);  //生成一个Vue子类，子类就是这个组件
      const instance = new MessageConstructor({ data: config });   //生成该子类的实例
      instance.vm = instance.$mount();  //将该实例手动挂载
      this.dom = document.body.querySelector('.notice-list').appendChild(instance.vm.$el);    //将实例挂载到body上
    }
  },
  created () {
    setTimeout(() => {
      this.$el.parentNode.removeChild(this.$el)
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.bubble {
  color: #fff;
  display: table;
  background: #333;
  border-radius: 3em;
  pointer-events: auto;
  margin: 0 auto 1em auto;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  transform: scale(0);
  animation: scale 0.5s forwards, close 0.2s forwards 2.4s;
  background-color: #7e7af8;

  &.red {
    background-image: linear-gradient(
      269deg,
      #f37878 0%,
      #ff4242 100%
    ) !important;
  }
  &.yellow {
    background-image: linear-gradient(
      90deg,
      #f1c40f 0%,
      #f29441 100%
    ) !important;
  }
  &.green {
    background-image: linear-gradient(
      90deg,
      #2ecc71 0%,
      #27ae60 100%
    ) !important;
  }
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