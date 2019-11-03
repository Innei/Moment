import axios from 'axios'
import Vue from 'vue'
const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : '/api'
})

http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.msg) {
      Vue.prototype.$msg({
        msg: err.response.data.msg
      })
    }
    return Promise.reject(err)
  }
)
export default http
