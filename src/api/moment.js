import http from '../plugins/axios.js'

const baseUrl = 'moment'
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