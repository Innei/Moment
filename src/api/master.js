import http from '@/plugins/axios'

const baseUrl = 'master'

const api = {}

api.getUserInfo = () => {
  return http.get(`${ baseUrl }/info`)
}

api.getUserIntroduce = () => http.get(`${ baseUrl }/introduce`)

export default api