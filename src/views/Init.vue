<template>
  <div class="wrap">
    <header>
      <span>MOMENT</span>
    </header>

    <main>
      <h1>おかえりなさいご主人様</h1>

      <h2>Welcome My Master</h2>

      <small>This will take a few steps to complete the initialization</small>
      <transition name="slide">
        <form :action="postUrl" method="post" v-if="currentStep === 1">
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
          />
          <label for="confirmPass">Confirm Password</label>
          <div class="nav">
            <button class="btn next" @click.prevent="checkPass">Next</button>
          </div>
        </form>
      </transition>
    </main>
  </div>
</template>

<script>
import masterApi from '@/api/master'
export default {
  data () {
    return {
      postUrl: process.env.development ? 'http://localhost:3000/api/master/first_init' : '/api/master/first_init',
      currentStep: 1,
      totalStep: 3,
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
      }
    }
  },
  methods: {
    handleNext () {
      if (this.currentStep < this.totalStep)
        this.currentStep++
    },
    checkPass () {
      masterApi.checkPass(this.master.password).then(res => {
        if (res.ok === 1) {
          this.handleNext()
        }
        else {
          this
        }
      })
    }  },
}
</script>

<style lang="scss" scoped>
// #BCBBBB
.wrap {
  padding: 4rem 3rem;
  position: relative;
  min-height: 100vh;
}
input:focus {
  background: linear-gradient(90deg, #794af5 16%, #92d6fe 84%) no-repeat;
  background-position: bottom;
  background-size: 100% 2px;
  animation: toright 0.5s forwards;
}
input {
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
  width: calc(1.5rem * 30);

  @media (max-width: 578px) {
    width: auto;
  }
  small,
  label {
    color: #bcbcbb;
  }
  form {
    margin-top: 4rem;
    line-height: 1.5;
    label {
      font-family: Arial, Helvetica, sans-serif;
      display: block;
      transform: translateY(-200%);
      transition: transform 0.5s, opacity 0.5s;
      z-index: -1;
      cursor: text;
      user-select: none;
    }
    input:focus + label {
      transform: translateY(-300%);
    }
    input[type='text'],
    input[type='password'] {
      font-family: Arial, Helvetica, sans-serif;
      z-index: 2;

      &:not(:focus):not(:placeholder-shown) + label {
        // 实现输入框中有字时 隐藏 label ps: 需要在文本框加入placeholder并且不为空
        opacity: 0;
      }
    }

    .nav {
      display: flex;
      justify-content: center;
      align-items: center;

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