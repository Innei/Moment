<template>
  <div style="position: relative; height: 100%">
    <transition name="ease-in" mode="out-in">
      <div class="container" v-show="show">
        <div class="date">
          <div class="year">{{ createdTime.year }}</div>
          <div class="md">{{ createdTime.month }} / {{ createdTime.day }}</div>
        </div>
        <!--    if type is moment  -->
        <div class="moment" v-if="data.type === 'moment'">
          <p>{{ user.username }} posted a moment.</p>
          <div class="moment-inner moment-wrap">
            <article>
              <div class="title" v-if="data.content.title">
                <div class="b">
                  <font-awesome-icon :icon="['fas','cloud']" v-if="data.content.weather" />
                  {{ data.content.weather }}
                </div>
                <div class="b">
                  <font-awesome-icon :icon="['fas','pen']" v-if="data.content.title" />
                  {{ data.content.title }}
                </div>
                <div class="b">
                  <font-awesome-icon :icon="['far','smile']" v-if="data.content.mood" />
                  {{ data.content.mood }}
                </div>
              </div>
              <!-- {{ data.content.body }} -->
              <pre v-text="parseArticle(data.content.body)"></pre>
            </article>
          </div>
        </div>
        <!--      if type is hitokoto  -->
        <div class="moment hitokoto" v-else-if="data.type === 'hitokoto'">
          <p>{{ user.username }} posted a hitokoto.</p>
          <div class="moment-inner hitokoto-inner">
            <div class="body">{{ data.content.body }}</div>
            <div class="source">{{ data.content.source }}</div>
          </div>
        </div>
        <!--      if type is idea  -->
        <div class="moment idea" v-else-if="data.type === 'idea'">
          <p>{{ user.username }} posted a idea.</p>
          <div class="moment-inner idea-inner">
            <div class="body">{{ data.content.body }}</div>
          </div>
        </div>
        <!--      if type is picture  -->
        <div class="moment pic" v-else-if="data.type === 'picture'">
          <p>{{ user.username }} posted a picture.</p>
          <div class="moment-inner pic-inner">
            <img
              :src="data.content.src"
              :alt="data.content.comment"
              @click="handleDisplayImg(data.content.src)"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    content: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      show: true,
      data: {}
    };
  },
  created () {
    this.data = this.content;
  },
  watch: {
    content (newVal) {
      this.show = false;

      setTimeout(() => {
        this.data = newVal;
        this.show = true;
      }, 500);
    }
  },
  methods: {
    parseDate (date) {
      const d = new Date(date);
      const dateObj = {
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getSeconds()
      };
      return dateObj;
    },
    handleDisplayImg (src) {
      this.$emit(
        "showImg",
        JSON.stringify({
          src,
          comment: this.data.content.comment
        })
      );
    },
    parseArticle (body) {
      return body.replace(/\n|\r\n/g, "\n\n");
    }
  },
  computed: {
    createdTime () {
      return this.parseDate(this.data.createdTime);
    },
    ...mapGetters(['user'])
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 5rem;
  height: 100%;
  position: relative;
  @media (max-width: 468px) {
    padding: 0 2rem;
  }

  .date {
    color: #043046;
    user-select: none;

    .year {
      font-size: 3rem;
      font-weight: 800;
    }

    .md {
      font-weight: 100;
      font-size: 1.2rem;
    }
  }

  .moment {
    height: calc(100% - 5rem);
    overflow: hidden;

    .moment-inner {
      color: #c7cbca;
      height: calc(100% - 6rem);

      &.moment-wrap {
        overflow: scroll;
      }

      &.moment-wrap::-webkit-scrollbar {
        width: 3px;
      }

      &.moment-wrap::-webkit-scrollbar-thumb {
        background: #eee;
        border-radius: 12px;
      }

      &.moment-wrap::-webkit-scrollbar-track:hover {
        border-radius: 0;
        box-shadow: inset 2px 0 0 rgba(158, 158, 158, 0.116);
      }

      article {
        color: #043046;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          user-select: none;
          margin: 0 2rem;
        }

        @media (max-width: 425px) {
          .title {
            margin-left: 0;
          }
        }
      }
    }
  }

  .hitokoto .hitokoto-inner {
    margin: 3rem 10%;
    font-size: 2rem;
    text-align: center;
    position: relative;

    .body {
      margin-bottom: 3rem;
      position: relative;
      padding: 1rem 0;
    }

    .body::before {
      content: '“';
      color: #fbd2d5;
      font-size: 4rem;
      font-weight: 800;
      position: absolute;
      font-family: -apple-system, 'Microsoft Sans Serif';
      left: -0.5rem;
      top: -0.5rem;
      line-height: 1.5rem;
    }

    .source {
      position: absolute;
      right: 0;
    }

    .source::before {
      content: '-- ';
    }
  }

  .pic .pic-inner {
    animation: fade-up 1s ease-in forwards;
    position: relative;

    img[src] {
      max-width: 90%;
      max-height: 90%;
      margin-left: 3rem;
      padding: 6px;
      background: #e9ecee;
      border: 3px solid #ecf0f1;
      box-sizing: border-box;
      box-shadow: 1px 4px 7px #d2d7d9;
      cursor: zoom-in;
    }

    @media (max-width: 768px) {
      img[src] {
        margin-left: 0.3rem;
      }
    }

    p {
      z-index: 99;
      position: absolute;
      right: 10%;
      top: 3rem;
    }
  }
}

.ease-in-enter-active,
.ease-in-leave-active {
  transition: 0.5s;
}

.ease-in-enter,
.ease-in-leave-to {
  transform: translateX(20%);
  opacity: 0;
}

@keyframes fade-up {
  0% {
    bottom: -5px;
    transform: rotate(0);
    opacity: 0;
  }
  100% {
    bottom: 0;
    transform: rotate(-1deg);
    opacity: 1;
  }
}

pre {
  word-break: break-all;
  white-space: pre-line;
}
</style>