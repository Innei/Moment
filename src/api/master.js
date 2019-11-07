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

api.checkInit = () => http.get(`${baseUrl}/init`)

api.login = master => http.post(`${baseUrl}/login`, { ...master })

api.checkLogged = () => http.get(`${baseUrl}/check_logged`)

export default api
