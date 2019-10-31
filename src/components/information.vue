<template>
  <div class="info">
    <div class="header">
      <div class="name">
        <div class="nick-name">{{ data.nickname}}</div>
        <div class="username">{{ data.username }}</div>
      </div>
      <a :href="data.githubUrl" v-if="data.githubUrl">
        <div class="link">
          <font-awesome-icon :icon="['fab','github']" />
        </div>
      </a>
    </div>
    <!--    end header  -->
    <div class="body">
      <p class="title" v-if="$slots.introduce">introduce</p>
      <slot name="introduce"></slot>
      <div class="skill" v-if="!ObjectIsEmpty(skill)">
        <p class="title">Skill</p>
        <skill v-for="(val,name) in skill" :key="name" :name="name" :score="val"></skill>
      </div>
    </div>
    <div class="post-new" @click="$emit('post-new')" v-if="showPostBtn">
      <font-awesome-icon :icon="['fas', 'edit']" />
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
      default () {
        return {}
      }
    },
    showPostBtn: {
      type: Boolean,
      require: true
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
    ObjectIsEmpty (obj) {
      return JSON.stringify(obj) === '{}'
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  user-select: none;
}
.skill {
  margin-top: 4rem;
}
.info {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 6.875rem);
  position: relative;

  .header {
    display: flex;
    flex-direction: row;
    position: relative;
    margin-bottom: 4rem;

    .name {
      flex: 0.8;
      display: flex;
      flex-direction: column;

      .nick-name {
        color: #4c5f6a;
        font-size: 2.1rem;
        margin-bottom: 1rem;
        /*margin-left: .5rem;*/
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

  .post-new {
    cursor: pointer;
    position: absolute;
    right: 15px;
    bottom: 15px;
    height: 3rem;
    width: 3rem;
    background: #6467f6;
    border-radius: 50%;
    color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    font-size: 1.3rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 5px 20px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.5s;
    animation: scale 0.5s forwards ease-in-out;

    &:hover {
      box-shadow: none;
    }
    svg {
      transform: translateX(1.7px);
    }

    @media (max-width: 568px) {
      & {
        right: 30px;
        bottom: 50px;
        height: 5rem;
        width: 5rem;
        font-size: 2rem;
      }
    }
  }
}

@keyframes scale {
  0% {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>