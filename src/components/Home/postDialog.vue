<template>
  <div class="form-wrap">
    <form action="#" method="post" class="form" ref="form">
      <div class="title">发布一个瞬间</div>
      <item :name="'类型'">
        <select name="type" id="type" v-model="moment.type" style="width: 5rem">
          <option value="moment">瞬间</option>
          <option value="hitokoto">一言</option>
          <option value="idea">想法</option>
          <option value="picture">照片</option>
        </select>
      </item>
      <item :name="'标题'" v-if="moment.type === 'moment'">
        <input type="text" v-model="moment.title" />
      </item>
      <item :name="'内容'" v-if="moment.type !== 'picture'">
        <textarea name="body" id="body" rows="10" style="resize: vertical;" v-model="moment.body"></textarea>
      </item>
      <item :name="'来源'" v-if="moment.type === 'hitokoto'">
        <input type="text" v-model="moment.hitokoto" />
      </item>
      <item :name="'心情'" v-if="moment.type === 'moment'">
        <input type="text" v-model="moment.mood" />
      </item>
      <item :name="'天气'" v-if="moment.type === 'moment'">
        <input type="text" v-model="moment.weather" />
      </item>
      <item :name="'注释'" v-if="moment.type === 'picture'">
        <input type="text" v-model="moment.comment" />
      </item>
      <item :name="'上传图片'" v-if="moment.type === 'picture'">
        <input type="file" name="src" id="picture" accept="image/*" multiple ref="file" />
        <div class="files">
          <button @click.prevent.stop="$refs.file.click()" class="primary" ref="btn">点击上传</button>
          <ul v-if="files.length !== 0" style="padding: 0;">
            <li
              v-for="file in files"
              :key="file"
              style="display:flex; justify-content:space-between; list-style: none"
              class="file-item"
            >
              <div style="color: #2c3e50">
                <font-awesome-icon :icon="['fas','file']" style="margin-right: .5rem"></font-awesome-icon>
                {{ file }}
              </div>
              <font-awesome-icon :icon="['far','check-circle']" style="color: #2ecc71"></font-awesome-icon>
            </li>
          </ul>
        </div>
      </item>
      <div class="nav">
        <input type="submit" value="提交" @click.prevent="handleSubmit" />
        <input type="reset" value="取消" @click.prevent="handleCancelOrCompleted" />
      </div>
    </form>
  </div>
</template>

<script>
import item from './form/form-item.vue'

import uploadApi from '@/api/upload'
import momentApi from '@/api/moment'
export default {
  components: {
    item
  },
  data () {
    return {
      moment: {
        type: 'moment',
        title: '',
        mood: '',
        source: '',
        body: '',
        weather: '',
        // TODO 多张图片的渲染
        src: '',
        comment: ''
      },
      files: []
    }
  },
  methods: {
    handleSubmit () {
      momentApi.postNewMoment(this.moment).then(({ data }) => {
        if (data.ok === 1) {
          // this.$refs.form.classList.add('remove')
          // setTimeout(() => {
          //   this.$emit('cancel-post')
          // }, 250);
          this.handleCancelOrCompleted()
        }
      })
    },
    handleCancelOrCompleted () {
      this.$refs.form.classList.add('remove')
      setTimeout(() => {
        this.$emit('cancel-post')
      }, 400);
    },
  },
  mounted () {
    this.$watch('moment.type', {
      deep: true, // 深度监听 对象中属性的变化
      handler (newVal) {
        if (newVal === "picture") {
          this.$nextTick(() => {
            this.$refs.file.onchange = e => {
              const file = e.target.files[0]
              this.files.push(file.name)

              let formdata = new FormData()
              formdata.append('pic', file)

              uploadApi.upload(formdata).then(({ data }) => {
                const { src } = data
                this.moment.src = src
                this.$msg({ msg: '上传成功' })
              })
            }
          })
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  padding: 1.5rem 3rem;
  background: #fff;
  border-radius: 12px;
  border: 1px #eee solid;
  box-sizing: border-box;
  min-width: 50vw;
  transition: height 0.5s, transform 0.2s;
  transform: scale(0.2);
  animation: scale 0.2s forwards cubic-bezier(0.06, 1.14, 0.36, 1.11);

  &.remove {
    transform: scale(0);
    animation: none;
  }
  .title {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 100;
    margin-bottom: 2rem;
  }
}
.file-item {
  padding: 0;
  cursor: pointer;
}
.nav {
  display: flex;
  justify-content: space-around;
}

input[type='submit'],
input[type='reset'] {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -webkit-appearance: none;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  width: 8rem;
  color: #fff;
}
input[type='submit'] {
  background-color: #2ecc71;
}
input[type='reset'] {
  background-color: #e74c3c;
}

@keyframes scale {
  0% {
    transform: scale(0.2);
  }
  to {
    transform: scale(1);
  }
}
</style>