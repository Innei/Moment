import http from '@/plugins/axios'

const baseUrl = 'user'

const api = {}

api.getUserInfo = (id) => {
  return http.get(`${ baseUrl }/info/${ id }`)
}

api.getUserIntroduce = id => http.get(`${ baseUrl }/introduce/${ id }`)

export default api