import http from '@/plugins/axios'

const baseUrl = 'upload'

const api = {}

api.upload = file =>
  http.post(baseUrl, file, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    }
  })

export default api
