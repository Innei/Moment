<template>
  <div class="wrap">
    <header>
      <span>MOMENT</span>
    </header>

    <main>
      <h1>おかえりなさいご主人様</h1>

      <h2>Welcome My Master</h2>

      <small>This will take a few steps to complete the initialization</small>

      <swiper :options="swiperOption" ref="stepSwiper">
        <swiper-slide class="swiper-no-swiping">
          <form class="form" :action="postUrl" method="post">
            <input
              type="text"
              name="username"
              id="username"
              v-model="master.username"
              autocomplete="off"
              placeholder=" "
            />
            <label for="username">Master Name</label>

            <input
              type="password"
              name="password"
              id="password"
              v-model="master.password"
              autocomplete="off"
              placeholder=" "
            />
            <label for="password">Password</label>

            <input
              type="password"
              name="confirmPass"
              id="confirmPass"
              v-model="master.confirmPass"
              autocomplete="off"
              placeholder=" "
              @keyup.enter="handleNext"
            />
            <label for="confirmPass">Confirm Password</label>
          </form>
        </swiper-slide>
        <!-- second step -->
        <swiper-slide class="swiper-no-swiping">
          <form class="form" :action="postUrl" method="post">
            <input
              type="text"
              name="nickname"
              id="nickname"
              v-model="master.nickname"
              placeholder=" "
            />
            <label for="nickname">Nickname</label>

            <input
              type="text"
              name="githubUrl"
              id="githubUrl"
              v-model="master.githubUrl"
              placeholder=" "
            />
            <label for="githubUrl">GitHub Url</label>

            <input
              type="text"
              name="avatar"
              id="avatar"
              v-model="master.avatar"
              placeholder=" "
              @keyup.enter="handleNext"
            />
            <label for="avatar">Avatar Icon Url</label>
          </form>
        </swiper-slide>

        <!-- third step -->
        <swiper-slide class="swiper-no-swiping">
          <form class="form" :action="postUrl" method="post">
            <textarea
              placeholder="一两句话, 介绍一下自己"
              rows="5"
              style="background: #eee;resize: none; padding: 1rem;margin: auto;width:90%; "
              v-model="master.userIntro.introduce"
            />
          </form>
        </swiper-slide>

        <!-- fourth step -->
        <swiper-slide class="swiper-no-swiping">
          <form class="form" style :action="postUrl" method="post">
            <div style="columns:2" v-for="i in [0,1,2]" :key="i">
              <input
                type="text"
                name="skill"
                autocomplete="off"
                placeholder=" "
                v-model="skillUnparsed[i][0]"
              />
              <label for>Skill {{i + 1}}</label>
              <input
                type="text"
                name="score"
                autocomplete="off"
                placeholder=" "
                v-model="skillUnparsed[i][1]"
              />
              <label for>Score</label>
            </div>
          </form>
        </swiper-slide>
      </swiper>

      <div class="nav">
        <button
          class="btn next"
          @click.prevent="handleNext"
        >{{currentStep !== totalStep ? 'Next': 'Finish'}}</button>
      </div>
    </main>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import masterApi from '@/api/master'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Vue from 'vue'
import {mapActions} from 'vuex'
// import router from '../router'

const orgin = window.location.href.split('#').slice(0, 2).join('#')
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      postUrl: process.env.development ? 'http://localhost:3000/api/master/init' : '/api/master/init',
      currentStep: 1,
      totalStep: 4,
      master: {
        username: '',
        password: '',
        confirmPass: '',
        avatar: '',
        nickname: '',
        githubUrl: '',
        userIntro: {
          introduce: '',
          skill: {}
        }
      },
      skillUnparsed: [['', ''], ['', ''], ['', '']],
      swiperOption: {
        noSwiping: true,
      }
    }
  },
  created () {
    window.history.pushState(null, '', orgin + '#1')
  },
  watch: {
    currentStep (val) {
      this.$refs.stepSwiper.swiper.slideTo(val - 1)
      window.history.pushState(null, '', `${orgin}#${this.currentStep}`)
    },
    $route: {
      deep: true,
      handler (val) {
        if (/#(\d*)/.test(val.hash)) {
          const step = Number(val.hash.split('#').join(''))
          if (step < this.currentStep) {
            this.currentStep = step
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['loadUser']),
    async handleNext () {
      switch (this.currentStep) {
        case 1:
          await this.checkPass()
          break;
        case 2:
          if (!this.checkUrl(this.master.avatar)) {
            this.$msg({ msg: '头像地址不正确', type: 'error' })
            throw new Error('头像地址不正确')
          }
          if (!this.checkUrl(this.master.githubUrl)) {
            this.$msg({ msg: 'GitHub 个人地址不正确', type: 'error' })
            throw new Error('GitHub 个人地址不正确')
          }
          break;
        case 3:
          break;
        case 4:
          for (const i of this.skillUnparsed)
            if (i[0] && i[1] && (i[1] == Number(i[1])))
              this.master.userIntro.skill[i[0]] = Number(i[1]) <= 100 ? Number(i[1]) : 100
          break;
        default:
          break;
      }
      if (this.currentStep < this.totalStep)
        this.currentStep++
      else if (this.currentStep === this.totalStep) {
        masterApi.completeInit(this.master).then(({ data }) => {
          if (data.ok === 1) {
            this.$msg({ msg: '初始化成功' })
            this.loadUser()
            this.$router.push({ name: 'login' })
          }
        })
      }
    },
    async checkPass () {
      if (!this.master.username) {
        this.$msg({ msg: '请输入用户名', type: 'error' })
        throw new Error('请输入用户名')
      }
      if (this.master.password !== this.master.confirmPass) {
        this.$msg({ msg: '两次密码输入不匹配', type: 'error' })
        throw new Error('请输入用户名')
      }
      const { data } = await masterApi.checkPass(this.master.password)
      if (data.ok === 1) {
        return
      } else {
        this.$msg({ msg: data.msg, type: 'error' })
        throw new Error(data.msg)
      }
    },
    checkUrl (URL) {
      return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(URL);
    },
  },
  // 路由到达前 检测是否完成初始化
  async beforeRouteEnter (to, from, next) {
    const { data } = await masterApi.checkInit()
    if (data.ok === 0) {
      // 因为无法获取到 this
      Vue.prototype.$msg({ type: 'error', msg: data.msg })
      return next('/')
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
// #BCBBBB
.wrap {
  padding: 4rem 3rem;
  position: relative;
  min-height: 100vh;
}
input:focus,
textarea:focus {
  background: linear-gradient(90deg, #794af5 16%, #92d6fe 84%) no-repeat;
  background-position: bottom;
  background-size: 100% 2px;
  animation: toright 0.5s forwards;
}
input,
textarea {
  outline: none;
  border: none;
  background: linear-gradient(to bottom, transparent 90%, #f2f2f2 91%);
  width: 100%;
  line-height: 2;
  font-size: 16px;
  margin-bottom: 1rem;
}
main {
  margin-top: calc(20vh - 4rem) !important;
  max-width: 90vw;
  margin: auto;
  width: calc(1.5rem * 20);

  @media (max-width: 578px) {
    width: auto;
  }
  small,
  label {
    color: #bcbcbb;
  }
  form {
    // height: 13.875rem;
    // overflow: scroll;
    margin-top: 4rem;
    padding: 0 1rem;
    line-height: 1.5;
    label {
      font-family: Arial, Helvetica, sans-serif;
      display: block;
      transform: translateY(-200%);
      transition: transform 0.5s, opacity 0.5s;
      z-index: -1;
      cursor: text;
      user-select: none;
      position: relative;
    }
    input:focus + label,
    textarea:focus + label {
      transform: translateY(-300%);
    }
    input[type='text'],
    input[type='password'],
    textarea {
      font-family: Arial, Helvetica, sans-serif;
      z-index: 2;

      &:not(:focus):not(:placeholder-shown) + label {
        // 实现输入框中有字时 隐藏 label ps: 需要在文本框加入placeholder并且不为空
        opacity: 0;
      }
    }
  }
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  .btn {
    width: 48%;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    line-height: 1.5;
    border-radius: 6px;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    margin-right: 2rem;
    &:last-child {
      margin: 0;
    }

    &.next,
    &.submit {
      background-image: linear-gradient(90deg, #7e7af8 16%, #58a8fb 84%);
      color: #fff;
    }
  }
}

@keyframes toright {
  0% {
    background-position: -30rem 100%;
  }
  to {
    background-position: bottom;
  }
}
</style>