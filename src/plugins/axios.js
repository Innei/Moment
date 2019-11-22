import axios from 'axios'
import Vue from 'vue'
import router from '../router'
const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : '/api',
  withCredentials: true
})

http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  err => {
    console.log(err)
  }
)

http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.msg) {
      Vue.prototype.$msg({
        msg: err.response.data.msg,
        type: 'error'
      })
    }

    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
export default http
