import axios from 'axios'

const http = axios.create({
  baseURL: 'http://yapi.demo.qunar.com/mock/7846'
})


export default http