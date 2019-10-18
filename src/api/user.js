import http from '@/plugins/axios'

const baseUrl = 'user'

const api = {}

api.getUserInfo = (id) => {
  return http.get(`${ baseUrl }/info/${ id }`)
}

export default api