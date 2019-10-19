<template>
  <transition name="ease-in" mode="out-in">
    <div class="content" v-show="show">
      <div class="date">
        <div class="year">{{ createdTime.year }}</div>
        <div class="md">
          {{ createdTime.month }} / {{ createdTime.day }}
        </div>
      </div>
      <!--    if type is moment  -->
      <div class="moment" v-if="data.type === 'moment'">
        <p>{{ user.username }} posted a moment.</p>
        <div class="moment-inner">
          <article>
            <div class="title" v-if="data.content.title">{{ data.content.title }}</div>
            {{ data.content.body }}
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

      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'

  export default {

    props: {
      content: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        show: true,
        data: {}
      }
    },
    created() {
      this.data = this.content
    },
    watch: {
      content(newVal) {
        this.show = false
        setTimeout(() => {
          this.data = newVal
          this.show = true
        }, 500)
      }
    },
    methods: {
      parseDate(date) {
        const d = new Date(date)
        const dateObj = {
          day: d.getDate(),
          month: d.getMonth() + 1,
          year: d.getFullYear(),
          hour: d.getHours(),
          minute: d.getMinutes(),
          second: d.getSeconds()
        }
        return dateObj
      }
    },
    computed: {
      createdTime() {
        return this.parseDate(this.data.createdTime)
      }, ...mapState({
        user: state => state.user
      })
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding-left: 5rem;

    .date {
      color: #043046;

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
        overflow: scroll;
        height: calc(100% - 3rem);

        article {
          .title {
            margin-left: 30%;
            font-size: 1.4rem;
            margin-bottom: 1.4rem;
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
        font-family: -apple-system, "Microsoft Sans Serif";
        left: 0;
        top: 0;
      }

      .source {
        position: absolute;
        right: 0;
      }

      .source::before {
        content: '-- '
      }
    }
  }

  .ease-in-enter-active, .ease-in-leave-active {
    transition: .5s;
  }

  .ease-in-enter, .ease-in-leave-to /* move-leave-active below version 2.1.8 */
  {
    transform: translateX(20%);
    opacity: 0;
  }
</style>