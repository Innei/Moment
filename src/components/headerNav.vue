<template>
  <div class="header" v-if="data.username">
    <div class="left">
      <span class="username">{{ data.username }}</span>
      <a class="btn" href="#">
        <span>
          <font-awesome-icon :icon="['fas','sliders-h']"/>
        </span>
        <span>
          <font-awesome-icon :icon="['fas','chevron-down']"/>
        </span>
      </a>
    </div>
    <div class="right">
      <span class="btn">
        <font-awesome-icon :icon="['fas','search']"/>
      </span>
      <span class="line"></span>
      <a href="#">
        <img :src="data.avatar"/>
      </a>
      <span class="btn">
        <font-awesome-icon :icon="['fas','chevron-down']"/>
      </span>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        data: state => state.user
      })
    }
  }
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #d0d3d6;
  }

  .header .username {
    margin-right: 1rem;
    color: #363c42;
  }

  .left,
  .right {
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .left .btn {
    padding: 0.5rem 1rem;
    background-color: #e9ebf0;
    border-radius: 24px;
  }

  .btn {
    cursor: pointer;
  }

  .left .btn span:nth-child(1) {
    margin-right: 1rem;
  }

  @media (max-width: 500px) {
    .left .btn span:nth-child(1) {
      margin-right: 0;
    }

    .left .btn span:nth-child(2) {
      display: none;
    }
  }
  .right img {
    border-radius: 88%;
    max-width: 30px;
    margin-right: 1rem;
  }

  .line {
    position: relative;
    margin: 0 1rem;
    width: 1px;
  }

  .line::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-50%);
    height: 0.8rem;
    border-left: 1px solid #d0d3d6;
  }
</style>