import axios from 'axios'

const http = axios.create({
  baseURL: '/'
})

export default http