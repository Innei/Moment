<template>
  <layout :options="{noPadding: true}">
    <template #main>
      <small>忘记了什么都不能忘记我哦</small>

      <form action method="post" @submit.prevent="submit">
        <input type="password" name="oldPassword" v-model="master.oldPassword" placeholder=" " id />
        <label for>原密码</label>
        <input
          type="password"
          name="password"
          @blur="checkPass"
          v-model="master.password"
          placeholder=" "
          id
        />
        <label for>重置密码</label>
        <input type="password" name="confirmPass" v-model="master.confirmPass" placeholder=" " id />
        <label for>重复一遍</label>
        <div class="btn-nav">
          <div class="btn" @click="submit">提交</div>
        </div>
      </form>
    </template>
  </layout>
</template>

<script>
import { checkPass, resetPass } from '@/api/master'
export default {
  components: {
    layout: () => import('@/components/Admin/layout.vue')
  },
  data () {
    return {
      master: {
        oldPassword: '',
        password: '',
        confirmPass: '',
      },
    }
  },
  methods: {
    async submit () {

      if (this.master.password !== this.master.confirmPass) {
        this.$msg({ msg: '两次密码输入不匹配', type: 'error' })
        throw new Error('请输入用户名')
      }
      const { data } = await resetPass(this.master)
      if (data.ok === 1) {
        this.$msg({ msg: data.msg })
        this.$router.push('/login')
      }
    },
    async checkPass () {
      const { data } = await checkPass(this.master.password)
      if (data.ok === 1) {
        return
      } else {
        this.$msg({ msg: data.msg, type: 'error' })
        throw new Error(data.msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
small {
  color: #cccccc;
}
form {
  margin-top: 4rem;
  padding: 0 1rem;
  line-height: 1.5;
  max-width: 500px;
  label {
    font-family: Arial, Helvetica, sans-serif;
    display: inline-block;
    transform: translateY(-200%);
    transition: transform 0.5s, opacity 0.5s;
    cursor: text;
    user-select: none;
    position: relative;
    // z-index: -1;
    pointer-events: none;
    color: #bcbcbb;
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
.btn-nav {
  text-align: center;
}
.btn {
  padding: 0.5rem 2rem;
  background: #65c1ff;
  display: inline-block;
  border-radius: 48px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  transition: cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s;
}
.btn:hover {
  background: #2ecc71;
}
</style>