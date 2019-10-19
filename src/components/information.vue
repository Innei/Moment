<template>
  <div class="info">
    <div class="header">
      <div class="name">
        <div class="nick-name">
          {{ data.nickname}}
        </div>
        <div class="username">
          {{ data.username }}
        </div>
      </div>
      <a :href="data.githubUrl" v-if="data.githubUrl">
        <div class="link">
          <font-awesome-icon :icon="['fab','github']"/>
        </div>
      </a>
    </div>
    <!--    end header  -->
    <div class="body">
      <p class="title">introduce</p>
      <slot name="introduce"></slot>
      <div class="skill" v-if="!ObjectIsEmpty(skill)">
        <p class="title">Skill</p>
        <skill v-for="(val,name) in skill" :key="name" :name="name" :score="val"></skill>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import skill from '@/components/skill-item.vue'

  export default {
    props: {
      skill: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      skill
    },
    computed: {
      ...mapState({
        data: state => state.user
      })
    },
    methods: {
      ObjectIsEmpty(obj) {
        return JSON.stringify(obj) === '{}'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    text-align: center;
  }
 .skill {
   margin-top: 4rem;
 }
  .info {
    display: flex;
    align-items: center;
    flex-direction: column;

    .header {
      display: flex;
      flex-direction: row;
      position: relative;
      margin-bottom: 4rem;

      .name {
        flex: .8;
        display: flex;
        flex-direction: column;

        .nick-name {
          color: #4c5f6a;
          font-size: 2.1rem;
          margin-bottom: 1rem;
          margin-left: .5rem;
        }

        .username {
          color: #043046;
          font-size: 3rem;
        }
      }

      .link {
        flex: 1;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -3rem;
        font-size: 2rem;
      }

      @media (max-width: 756px) {
        .link {
          /*right: 0;*/
          top: 30%;
        }
      }
    }

    .body {
      color: #c7cbca;
      min-width: 13rem;
    }
  }
</style>