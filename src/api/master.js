import http from '@/plugins/axios'

const baseUrl = 'master'

export const getUserInfo = () => {
  return http.get(`${baseUrl}`)
}

export const getUserIntroduce = () => http.get(`${baseUrl}/introduce`)

export const checkPass = password =>
  http.post(`${baseUrl}/check_pass`, {
    password
  })

export const completeInit = master =>
  http.post(`${baseUrl}/init`, { ...master })

export const checkInit = () => http.get(`${baseUrl}/init`)

export const login = master => http.post(`${baseUrl}/login`, { ...master })

export const checkLogged = () => http.get(`${baseUrl}/check_logged`)

export const checkToken = () => http.post(`${baseUrl}/check_token`, {
  token: localStorage.token
})

export const signOut = () => http.get(`${baseUrl}/sign_out`)

export const resetPass = ({ password, oldPassword }) =>
  http.post(`${baseUrl}/reset_password`, {
    password,
    oldPassword
  })

export const modifyIntro = data => http.put(`${baseUrl}/introduce`, data)

export default {
  getUserInfo,
  getUserIntroduce,
  checkPass,
  login,
  checkLogged,
  signOut,
  completeInit,
  checkInit,
  checkToken
}
