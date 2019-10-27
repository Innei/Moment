import http from '../plugins/axios.js'

const baseUrl = 'moments'
const api = {}

api.getRecentlyMoment = function ({ size, page }) {
  return http.get(`${ baseUrl }`, {
    params: {
      size,
      page
    }
  })
}

export default api