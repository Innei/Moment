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
          <div class="title">{{ data.content.title }}</div>
          <div class="body">{{ data.content.body }}</div>
        </div>
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
    padding: 2rem;

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
      display: inline-block;

      .moment-inner {
        color: #c7cbca
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