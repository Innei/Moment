<template>
  <div>
    <router-view></router-view>
  </div>
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
      console.log(data)
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

  a {
    color: unset
  }

  a:active {
    color: unset
  }

  a:hover {
    color: unset;
  }

</style>
