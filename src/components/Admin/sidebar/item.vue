<template>
  <div class="row-item" :class="{active: isActived}">
    <!-- TODO 相应事件 父级相应处理 active -->
    <div class="item" @click="isActived = !isActived">
      <div class="icon">
        <font-awesome-icon :icon="item.icon" />
      </div>
      <div class="title">{{item.title}}</div>
      <div class="down" v-if="hasChild">
        <font-awesome-icon :icon="['fas','chevron-down']" />
      </div>
    </div>
    <div
      class="insider"
      :style="isActived ? 'max-height: '+ height : ''"
      ref="insider"
      v-if="hasChild"
    >
      <!-- <div class="insider" ref="insider"> -->
      <div class="item" v-for="i in item.subItems" :key="i.title">
        <div class="icon">
          <font-awesome-icon :icon="i.icon" />
        </div>
        <div class="title">{{i.title}}</div>
        <!-- TODO 子级中的子级菜单 -->
        <!-- <div class="down">
          <font-awesome-icon :icon="['fas','chevron-down']"/>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
    item: {
      type: Object,
      required: true,
      validator (val) {
        return typeof (val.title) === "string" && val.icon instanceof Array && val.icon.length !== 0
      }
    }

  },
  data () {
    return {
      height: 0,
      isActived: false
    }
  },
  computed: {
    hasChild () {
      return !(JSON.stringify(this.item.subItems) === '{}' || this.item.subItems === undefined)
    }
  },
  created () {
    if (this.active) {
      this.isActived = true
    }
  },
  mounted () {
    try {
      this.height = [...this.$refs.insider.querySelectorAll('.item')].length * 5 + 'rem'
    } catch (e) {
      e
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.row-item.active {
  background: rgba(16, 133, 211, 0.8);

  .down {
    transform: rotate(180deg);
  }
}
.row-item {
  transition: background 0.5s;
  border-radius: 24px 0 0 24px;
}
.insider {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s;
}

.item {
  * {
    font-family: 'McLaren', cursive;
  }
  display: grid;
  grid-template-columns: 20px auto 30px;
  padding: 1rem 0 1rem 1rem;
  transition: 0.5s;
  line-height: 1.5;
  user-select: none;
  opacity: 0.8;

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .down {
    justify-content: right;
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s;
    transform-origin: 8px 10px;
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