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
          <div class="add" @click="$refs.upload.classList.toggle('active')">
            <font-awesome-icon :icon="['fas','plus']" style="font-size: .8rem"></font-awesome-icon>
          </div>
          <div class="avatar" ref="upload">
            <label>修改头像地址</label>
            <div class="upload_text" style="position: relative;min-width: 18rem;">
              <input
                type="text"
                name="avatar"
                @blur="$refs.upload.classList.remove('active')"
                v-model="userAvatar"
                @keydown.enter="handleAvatarUpdate"
              />
              <div class="image_upload" id="upload_btn">
                <font-awesome-icon :icon="['fas','image']"></font-awesome-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- avatar cropper -->
        <div class="text-center">
          <avatar-cropper
            upload-form-name="pic"
            :upload-headers="{Authorization: token}"
            @uploaded="handleUploaded"
            @changed="$refs.upload.classList.add('active')"
            @uploading="$msg({ msg: '正在上传中', type: 'warning'})"
            trigger="#upload_btn"
            :upload-url="avatarUrl"
          />
        </div>
        <!-- end -->

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
                data-origin="name"
                @blur="handleBlur"
                @keyup.enter="handleBlur"
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
                data-origin="nickname"
                v-model="data.user.nickname"
                @blur="handleBlur"
                @keyup.enter="handleBlur"
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
                  data-origin="github"
                  v-model="data.user.githubUrl"
                  @blur="handleBlur"
                  @keyup.enter="handleBlur"
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
          <div class="info master input" ref="intro" @click="handleTextarea">{{info.introduce}}</div>
          <textarea
            name="introduce"
            v-model="info.introduce"
            ref="textarea"
            data-origin="intro"
            @blur="handleBlur"
          ></textarea>
        </div>
        <div class="right">
          <label style="text-align: center">技能总览</label>
          <div class="chart">
            <!-- <pie /> -->
            <pie :data="skill" @ready-once="handleRenderChart" />
          </div>
        </div>
      </div>

      <div class="skill-wrap">
        <div class="top">
          <label>技能树</label>
          <span @click="$refs.add.classList.toggle('active')">新增</span>
        </div>
        <div class="skill-item" v-for="(score, name) in info.skill" :key="name">
          <div class="skill-top">
            <div class="skill-name">{{name}}</div>
            <div class="skill-score-wrap">
              <div class="skill-score" @click="handleReadyToModifySkill(name)">{{score}}</div>
              <div class="modify-wrap toggle">
                <input
                  type="text"
                  class="score-text"
                  :placeholder="score"
                  @keyup.enter="handleModifySkill(name)"
                  :ref="'skill-' + name"
                  @blur="handleBlurSkill(name)"
                />
                <font-awesome-icon
                  class="del icon"
                  :icon="['fas','trash-alt']"
                  @click="handleModifySkill(name, true)"
                ></font-awesome-icon>
              </div>
            </div>
          </div>

          <div class="process">
            <transition name="move">
              <span class="up" :style="`right: ${100-score}%`"></span>
            </transition>
          </div>
        </div>

        <div class="skill-item add" ref="add">
          <input class="skill-name" name="add-name" placeholder="name" v-model="add.name" />
          <input
            class="skill-score"
            name="add-score"
            placeholder="score"
            v-model="add.score"
            @keyup.enter="handleAdd"
          />
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getUserIntroduce, modifyIntro } from '@/api/master'
import pie from 'v-charts/lib/pie.common.js'
import AvatarCropper from "vue-avatar-cropper"
export default {
  data () {
    return {
      info: {},
      data: {
        user: {}
      },
      skill: {},
      add: {
        name: null,
        score: null
      },
      userAvatar: '', // 用户头像地址
      avatarUrl: process.env.NODE_ENV === 'production' ? '/api/upload' : 'http://localhost:3000/api/upload' // 提交接口
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
    pie, AvatarCropper
  },
  computed: {
    ...mapGetters(['user', 'token'])
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
    async handleBlur (e) {
      // console.log(e, e.target.dataset, e.target.name)

      const value = e.target.value
      const name = e.target.name
      const origin = this.$refs[e.target.dataset['origin']]
      // console.log(this.data.user[name], value);

      if (value === this.user[name]) {
        origin.classList.remove('hidden')
        return
      }
      const { data } = await modifyIntro({ [name]: value })
      if (data.ok) {
        origin.innerText = value
        origin.classList.remove('hidden')
        this.loadUser()
        this.$msg({ msg: '更新成功~' })
      }
    },

    handleRenderChart (e) {
      // console.log(e);
      setTimeout(() => {
        e.resize()
      }, 1500);
    },
    handleTextarea () {
      const intro = this.$refs.intro
      intro.classList.add('hidden')
      console.log(this.$refs.textarea);
      // this.$refs.textarea.style = Object.assign({ height: intro.offsetHeight, width: intro.offsetWidth })
      this.$refs.textarea.setAttribute('style', `height: ${intro.offsetHeight}px;width: ${intro.offsetWidth}px`)

    },
    async handleAdd () {
      if (this.add.score > 100 || this.add.score < 0)
        return this.$msg({ msg: '分值需在 0 - 100 之间', type: 'error' })
      if (this.add.name.length > 30)
        return this.$msg({ msg: '内容过长', type: 'error' })
      const { data } = await modifyIntro({ skill: Object.assign(this.info.skill, { [this.add.name]: Number(this.add.score) }) })
      if (data.ok) {
        this.info.skill = Object.assign({}, this.info.skill, { [this.add.name]: Number(this.add.score) })
        this.add = Object.assign({}, { name: null, score: null })
        this.skill = Object.assign({}, this.parseChart(this.info.skill))
        this.$refs.add.classList.toggle('active')
      }
    },
    handleReadyToModifySkill (name) {
      const ref = this.$refs[`skill-${name}`][0]
      ref.parentNode.classList.add('active');
      ref.parentNode.parentNode.querySelector('.skill-score').style = 'visibility: hidden;';
      setTimeout(() => {
        ref.focus()
      }, 300);
    },
    handleBlurSkill (name) {
      const ref = this.$refs[`skill-${name}`][0]
      ref.parentNode.classList.remove('active');
      ref.parentNode.parentNode.querySelector('.skill-score').style = '';
    },
    async handleModifySkill (name, del = false) {
      // console.log(name, del, this.$refs[`skill-${name}`][0].value);
      const ref = this.$refs[`skill-${name}`][0]
      if (!del) {
        const score = ref.value

        if (score > 100 || score < 0)
          return this.$msg({ msg: '分值需在 0 - 100 之间', type: 'error' })
        this.info.skill[name] = score
      } else {
        delete this.info.skill[name]
      }
      ref.parentNode.classList.remove('active')
      ref.parentNode.parentNode.querySelector('.skill-score').style = 'visibility: visible;'
      const { data } = await modifyIntro({ skill: this.info.skill })
      if (data.ok) {
        this.skill = Object.assign({}, this.parseChart(this.info.skill))
      }
    },
    handleUploaded (resp) {
      this.$msg({ msg: '上传成功! 在输入框回车确定' })
      this.userAvatar = resp.src
    },
    async handleAvatarUpdate () {
      const { data } = await modifyIntro({ avatar: this.userAvatar })
      if (data.ok) {
        this.loadUser()
        this.$msg({ msg: '修改成功!' })
        this.userAvatar = ''
        this.$refs.upload.classList.remove('active')
      }
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
.grid.top {
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
  color: #333;
  font-weight: 800;
}
input,
textarea,
.input {
  position: absolute;
}
.hidden {
  visibility: hidden;
}

.master:not(.hidden) + input,
.master:not(.hidden) + textarea {
  visibility: hidden;
}
.master.hidden + input,
.master.hidden + textarea {
  visibility: visible !important;
}
.master {
  cursor: pointer;
}

input,
textarea {
  border-radius: 12px;
  border: 1px solid #eee;
  outline: none;
  transition: 0.5s;
  box-sizing: border-box;
  padding: 0.5rem;
  min-width: 18rem;
}
textarea {
  resize: none;
}
input:focus,
textarea:focus {
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
.toggle {
  opacity: 0;
  visibility: hidden;
  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.skill-wrap {
  margin: 0 auto 0 50px;
  width: 300px;
  line-height: 2;
  transition: 0.5s;
  .skill-score {
    cursor: pointer;
  }

  .score-text {
    position: absolute;
    min-width: unset;
    width: 3rem;
    top: 0;
    right: 1.3rem;
  }
  .del.icon {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(50%);
    color: #e74c3c;
    cursor: pointer;

    // margin-left: 12px
  }
  .top {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    span {
      opacity: 0;
      color: #00a0d7;
      transition: opacity 0.5s;
    }
    span:hover {
      opacity: 1;
    }
  }

  .skill-top {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .process {
    background-color: #c7cbca;
    height: 4px;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    margin: 10px 0;
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
.avatar {
  visibility: hidden;
  transition: 1s;
  opacity: 0;
  transform: translateY(0);
}
.avatar.active {
  visibility: visible;
  margin-top: 100px;
  // animation: slide 1s forwards;
  opacity: 1;
  transform: translateY(5px);
}
.skill-item.add {
  &.active {
    visibility: visible;
  }
  visibility: hidden;
  display: grid;
  grid-template-columns: 50% auto;
  grid-gap: 20px;
  position: relative;
  input {
    position: relative;
    // width: 100%;
    min-width: unset;
    display: flex;
  }
}

.image_upload {
  position: absolute;
  right: 10px;
  top: 1rem;
  bottom: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>

<style>
.avatar-cropper .avatar-cropper-mark {
  backdrop-filter: blur(3px);
}
</style>