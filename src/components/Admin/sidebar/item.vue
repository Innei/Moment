<template>
  <div class="row-item" :class="{active: active,extend:extend}" ref="row-item">
    <div class="item" @click="handleClick">
      <div class="icon">
        <font-awesome-icon :icon="item.icon" />
      </div>
      <div class="title">{{item.title}}</div>
      <div v-if="hasChild" style="justify-content: left;">
        <div class="down">
          <font-awesome-icon :icon="['fas','chevron-down']" />
        </div>
      </div>
    </div>
    <div
      class="insider"
      :style="extend ? 'max-height: '+ height : ''"
      ref="insider"
      v-if="hasChild"
    >
      <item
        :active="activeItems === index ? true : false"
        :item="item"
        :index="index"
        v-for="(item, index) in item.subItems"
        :key="index"
        ref="item"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: {
    active: Boolean,
    item: {
      type: Object,
      required: true,
      validator (val) {
        return typeof (val.title) === "string"
          && val.icon instanceof Array
          && val.icon.length !== 0
      }
    },
    index: Number
  },
  data () {
    return {
      height: 0,
      activeItems: 0,
      extend: false
    }
  },
  watch: {
    active (val) {

      if (!val) {
        this.extend = false
      }
    }
  },
  computed: {
    hasChild () {
      return !(JSON.stringify(this.item.subItems) === '{}' || this.item.subItems === undefined)
    }
  },
  methods: {
    handleClick () {
      if (!this.item.subItems) {
        this.$parent.activeItems = this.index

        const activeItems = []
        for (let i = this; i.$props && i.$props.index > -1; i = i.$parent) {
          activeItems.push(i.$props.index)
        }
        // console.log(activeItems);
        // console.log(this.$parent.$data);

        for (let vm = this.$parent; vm.$data && vm.$data.activeItems > -1; vm = vm.$parent) {
          vm.$data.activeItems = activeItems.shift()
          // console.log(vm.$data.activeItems);
        }
      } else {
        this.extend = !this.extend
      }
      if (this.$parent.activeItems === this.index) {

        this.$refs['row-item'].classList.toggle('hide')
      }
      if (!this.hasChild) {
        let path = this.item.path
        let item = this.$parent
        for (; ;) {
          // path += item.path
          if (item.item && item.item.path) {
            path = item.item.path + path
            item = item.$parent
          } else break
        }
        // console.log(path);
        path = this.$root.$data.route + path

        if (path === this.$route.fullPath) {
          return
        }

        this.$router.push(path)
      }
    },
  },
  mounted () {
    try {
      this.height = [...this.$refs.insider.querySelectorAll('.item')].length * 5 + 'rem'
    } catch (e) {
      console.log('没有子元素')
    }
  }
}
</script>

<style lang="scss" scoped>
.row-item.extend:not(.hide) {
  > .item .down {
    transform: rotate(180deg);
  }
}
.row-item:not(.extend) {
  > .item .down {
    transform: rotate(0) !important;
  }
}
.row-item.active {
  background: rgba(16, 133, 211, 0.5);
}
.row-item {
  transition: background 0.5s;
  border-radius: 24px 0 0 24px;
}
.row-item.hide .insider {
  max-height: 0 !important;
  opacity: 0;
}
.row-item.active:not(.hide) {
  > .item .down {
    transform: rotate(180deg);
  }
}
.insider {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s, opacity 0.5s;
}

.item {
  * {
    font-family: 'Nunito', sans-serif;
  }
  display: grid;
  grid-template-columns: 50px auto 30px;
  padding: 1rem 0 1rem 1rem;
  transition: 0.5s;
  line-height: 1.5;
  user-select: none;
  opacity: 0.8;

  > * {
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .down {
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s;
    // transform-origin: 8px 10px;
  }

  &:hover {
    background: #1a9cf3;
    border-radius: 24px 0 0 24px;
    opacity: 1;
    .down {
      opacity: 0.8;
    }
  }
}
</style>