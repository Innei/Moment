<template>
  <div class="wrap">
    <header>
      <span>MOMENT</span>
    </header>
    <main>
      <h1>ご主人様、おかえり</h1>

      <h2>Login</h2>
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
          @keyup.enter="login"
        />
        <label for="password">Password</label>
      </form>
      <div class="nav">
        <button class="btn next" @click.prevent="login">Login</button>
      </div>
    </main>
  </div>
</template>

<script>
import masterApi from '@/api/master'
export default {
  data () {
    return {
      postUrl: process.env.development ? 'http://localhost:3000/api/master/login' : '/api/master/login',
      master: {
        username: '',
        password: ''
      }
    }
  },
  async beforeRouteEnter (to, from, next) {
    const { data } = await masterApi.checkLogged()

    if (data.ok === 1) {
      return next({ name: 'admin' })
    }
    next()
  },
  methods: {
    async login () {
      const { data } = await masterApi.login(this.master)
      if (data.ok === 1) {
        this.$msg({ msg: '登陆成功' })
        this.$router.push({ name: 'admin' })
      }
    }
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
    margin-top: 4rem;
    padding: 0 1rem;
    line-height: 1.5;
    label {
      font-family: Arial, Helvetica, sans-serif;
      display: block;
      transform: translateY(-200%);
      transition: transform 0.5s, opacity 0.5s;
      cursor: text;
      user-select: none;
      position: relative;
      pointer-events: none
    }
    input:focus + label,
    textarea:focus + label {
      transform: translateY(-300%);
    }
    input[type='text'],
    input[type='password'] {
      font-family: Arial, Helvetica, sans-serif;
      &:not(:focus):not(:placeholder-shown) + label {
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
