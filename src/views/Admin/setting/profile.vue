<template>
  <layout>
    <template #main>
      <div class="grid top">
        <div class="left">
          <img
            class="before"
            @load="$refs.avatar.classList.remove('before')"
            @error="$refs.avatar.classList.add('before')"
            :src="user.avatar"
            ref="avatar"
          />
          <div class="add">+</div>
        </div>
        <div class="right">
          <form action="#">
            <div class="row">
              <label>主人昵称</label>
              <div
                class="master input master_name"
                ref="name"
                @click="$refs.name.classList.add('hidden')"
              >{{ user.username }}</div>
              <input
                type="text"
                name="username"
                class="master_name"
                v-model="data.user.username"
                @blur="handleBlur"
              />
            </div>
            <div class="row">
              <label>主人别名</label>
              <div
                class="master input nickname"
                ref="nickname"
                @click="$refs.nickname.classList.add('hidden')"
              >{{ user.nickname }}</div>
              <input
                type="text"
                name="nickname"
                class="master_nickname hidden"
                v-model="data.user.nickname"
              />
            </div>
            <div class="row">
              <div class="has-github" v-if="user.githubUrl">
                <label>主人的 GitHub 地址</label>
                <div
                  class="master input"
                  ref="github"
                  @click="$refs.github.classList.add('hidden')"
                >{{ user.githubUrl }}</div>
                <input
                  type="text"
                  name="githubUrl"
                  class="github hidden"
                  v-model="data.user.githubUrl"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- end top grid -->

      <div class="body grid">
        <div class="left">
          <label>主人介绍</label>
          <div class="info">{{info.introduce}}</div>
        </div>
        <div class="right">
          <label style="text-align: center">技能总览</label>
          <div class="chart">
            <!-- <pie /> -->
            <pie :data="skill"></pie>
          </div>
        </div>
      </div>

      <div class="skill-wrap">
        <label>技能树</label>

        <div class="skill-item" v-for="(name, score) in data.skill" :key="name">
          <div class="skill-name">{{name}}</div>
          <div class="process">
            <transition name="move">
              <span class="up" :style="'right: '+ score"></span>
            </transition>
          </div>
          <div class="skill-score">{{score}}</div>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getUserIntroduce, modifyIntroduce } from '@/api/master'
import pie from 'v-charts/lib/pie.common.js'

export default {
  data () {
    return {
      info: {},
      data: {
        user: {}
      },
      skill: {}
    }
  },
  async created () {
    const { data } = await getUserIntroduce()
    if (data.ok) {
      this.info = data
      this.data.user = Object.assign({}, this.user)
      this.skill = Object.assign({}, this.parseChart(data.skill))
    }
  },
  components: {
    layout: () => import('@/components/Admin/layout.vue'),
    pie
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['loadUser']),
    parseChart (data) {
      const lang = Object.keys(data)
      const columns = ['语言', '分数']
      const rows = Object.values(data).map((v, i) => Object.assign({}, { '语言': lang[i], '分数': v, id: i }))
      // JSON.stringify({ colums, rows })
      return { columns, rows }
    },
    handleBlur (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: repeat(2, 100px);
}
.left,
.right {
  position: relative;
}
.top {
  .left {
    grid-row: 1 / 3;
  }
  .right {
    margin: 0 10rem;
    line-height: 2;
  }
  margin-bottom: 100px;
}
img {
  max-width: 100px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 3px solid #eee;
  transition: border 0.8s;
  transform: scale(2);
  transform-origin: left top;
  margin: 0 50px;
  position: relative;
}
img.before {
  width: 50px;
  height: 50px;
  border: 53px solid #eee;
}
img:not([before]) + .add {
  border-radius: 50%;
  background: #00a0d7;
  position: absolute;
  bottom: 10px;
  right: 0;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  user-select: none;
  cursor: pointer;
  box-shadow: 2px 2px 7px -4px #123;
  transition: box-shadow 0.5s;
}
.add:hover {
  box-shadow: none !important;
}
.row {
  overflow: hidden;
  margin-bottom: 2.5rem;
}
label {
  display: block;
}
input,
.input {
  position: absolute;
}
.hidden {
  visibility: hidden;
}

.master:not(.hidden) + input {
  visibility: hidden;
}
.master.hidden + input {
  visibility: visible !important;
}
.master {
  cursor: pointer;
}

input {
  border-radius: 12px;
  border: 1px solid #eee;
  outline: none;
  transition: 0.5s;
  box-sizing: border-box;
  padding: 0.5rem;
  min-width: 18rem;
}
input:focus {
  border-color: #00a0d7;
}

.body {
  grid-template-rows: 100px;
  grid-gap: 120px;
  line-height: 2;
  margin-bottom: 100px;
  .left {
    margin-left: 50px;
  }
}

.skill-wrap {
  display: grid;
  grid-template-columns: 8rem auto 4rem;

  > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .process {
    background-color: #c7cbca;
    height: 4px;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }

  .process .up {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 100%;
    transition: 1.5s;
    background-color: #fbd2d5;
  }
}
.move-enter-active,
.move-leave-active {
  transition: 0.5s;
}
.move-enter, .move-leave-to /* move-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
}
</style>