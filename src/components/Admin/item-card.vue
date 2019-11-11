<template>
  <div class="wrap" ref="wrap">
    <div class="outside card" @click="active = !active">
      <div class="time">{{parseDate(this.Time.created)}}</div>
      <div class="title_type">
        <div class="type">{{type}}</div>
        <div class="title">{{title || content.body}}</div>
      </div>
      <div>
        <div class="down" :class="{active: active}">
          <font-awesome-icon :icon="['fas','chevron-down']" />
        </div>
      </div>
    </div>
    <div class="inside card" ref="inside">
      <div class="time">{{parseDate(this.Time.created)}}</div>
      <div class="body">
        <div class="card white" ref="body">
          <div class="info">
            <div>
              <div class="title" v-if="type === 'moment'">标题: {{title}}</div>
              <div class="type">类型: {{type}}</div>
              <div
                class="ctime"
              >创建时间: {{parseDate(this.Time.created)}} {{parseTime(this.Time.created)}}</div>
              <div
                class="comment"
                v-if="type==='picture' && content.comment"
              >注释: {{content.comment}}</div>
            </div>
            <div class="icon">
              <div class>
                <font-awesome-icon :icon="['far', 'clock']" v-if="type === 'moment'"></font-awesome-icon>
                <font-awesome-icon :icon="['far', 'sun']" v-if="type === 'hitokoto'"></font-awesome-icon>
                <font-awesome-icon :icon="['far', 'lightbulb']" v-if="type === 'idea'"></font-awesome-icon>
                <font-awesome-icon :icon="['far', 'image']" v-if="type === 'picture'"></font-awesome-icon>
              </div>
            </div>
          </div>

          <div class="content" style="position: relative">
            <pre v-if="type !== 'picture'">
             {{ content.body }}
            </pre>
            <img :src="content.src" v-if="type==='picture'" @load="handleImgOnload" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    time: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    title: String,
    content: {}
  },
  data () {
    return {
      active: false,
      overflowHeight: null,
      Time: {
        created: null,
        modified: null
      },

    }
  },
  created () {
    this.Time.created = new Date(this.time.createdTime)
    this.Time.modified = new Date(this.time.modifiedTime)
  },
  methods: {
    parseDate (date) {
      return moment(date).format('MMM DD YYYY')
    },
    parseTime (time) {
      return moment(time).format('HH:mm')
    },
    handleImgOnload () {
      console.log('img onload')
      try {
        this.updateWrapHeight()
      } catch (e) {
        console.log('已跳过', e)
      }
    },
    updateWrapHeight () {
      this.overflowHeight = this.$refs.body.offsetHeight + 100
      this.$refs.inside.setAttribute('style', 'transform: translateY(-' + this.overflowHeight + 'px)')
      this.$refs.wrap.removeAttribute('style')
    }
  },
  mounted () {
    this.updateWrapHeight()
  },
  watch: {
    active (val) {
      if (val === false) {
        this.$refs.inside.setAttribute('style', 'transform: translateY(-' + this.overflowHeight + 'px)')
        this.$refs.wrap.removeAttribute('style')
      } else {
        this.$refs.wrap.setAttribute('style', 'height: ' + (98 + this.overflowHeight) + 'px')
        this.$refs.inside.setAttribute('style', 'transform: translateY(0px);height: calc(' + this.$refs.wrap.style.height + ' - 98px)')
      }
    }
  },
  destroyed () {
    this.$off()
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  overflow: hidden;
  width: 100%;
  height: 98px;
  background: #f4f4f7;
  border-radius: 12px;
  position: relative;
  transition: height 0.5s;
  margin-bottom: 3rem;
  position: relative;
}
.card {
  border-radius: 12px;
  display: grid;
  background: #f4f4f7;
  color: #020720;
  // height: 100%;

  width: 100%;
  position: relative;
  transition: 0.5s;

  &.outside {
    height: 98px;
    cursor: pointer;
    user-select: none;
    grid-template-columns: 10rem auto 100px;
    box-shadow: 0px 20px 41px -9px rgba(0, 0, 0, 0.2);
    z-index: 1;
    * {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .time {
      font-weight: 800;
    }
  }
  &.inside {
    grid-template-columns: 10rem auto;
  }

  .title_type {
    display: grid;
    grid-template-columns: 8rem minmax(auto, 20rem);
    justify-content: flex-start;
    font-weight: 100;
    .type {
      margin-right: 3rem;
    }
    .title {
      white-space: nowrap;
      justify-content: flex-start;
      overflow: hidden;
    }
  }
  .down {
    color: #1a9cf3;
    transition: transform 0.5s;
    &.active {
      transform: rotate(180deg);
    }
  }
}

.inside {
  border-radius: 0 0 12px 12px;
  .time {
    display: flex;
    justify-content: center;
    font-weight: 100;
    font-size: 0.8rem;
    padding-top: 1rem;
  }
  .time {
    padding: 3rem 0;
  }
  .body {
    padding: 3rem 2rem;
    // height: calc(100% - 88px);
  }
  .info {
    display: grid;
    grid-template-columns: 80% auto;
    line-height: 2.5;
    margin-bottom: 3rem;
    .icon {
      font-size: 4rem;
    }
  }
  .card.white {
    background: #fff;
    padding: 3rem;
    box-sizing: border-box;

    display: grid;
    grid-template-rows: 9rem auto;
  }
}
pre {
  white-space: pre-wrap;
}
img {
  max-width: 100%;
  border-radius: 12px;
}
</style>