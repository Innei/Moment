<template>
  <router-view></router-view>
</template>

<script>
  import { mapMutations } from 'vuex'
  import userApi from '@/api/user'

  export default {
    methods: {
      ...mapMutations(['storeData'])
    },
    async created() {
      const data = (await userApi.getUserInfo(1)).data
      this.storeData(data)
    }
  }
</script>

<style>
  body,
  html {
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  }

  body {
    min-height: 100vh;
  }

  a {
    color: unset
  }

  a:active {
    color: unset
  }

  a:hover {
    color: unset;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  html {
    font-size: 16px;
  }
  @media (max-width: 500px) {
    html {
      font-size: .8rem;
    }
  }

</style>
