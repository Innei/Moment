import http from '@/plugins/axios'

const baseUrl = 'master'

const api = {}

api.getUserInfo = () => {
  return http.get(`${baseUrl}`)
}

api.getUserIntroduce = () => http.get(`${baseUrl}/introduce`)

api.checkPass = password =>
  http.post(`${baseUrl}/check_pass`, {
    password
  })

api.completeInit = master => http.post(`${baseUrl}/init`, { ...master })
export default api
