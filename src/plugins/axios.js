import axios from 'axios'

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api'
})

export default http
