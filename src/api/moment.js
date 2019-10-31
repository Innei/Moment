import http from '../plugins/axios.js'

const baseUrl = 'moments'
const api = {}

api.getRecentlyMoment = function({ size, page }) {
  return http.get(baseUrl, {
    params: {
      size,
      page
    }
  })
}

api.postNewMoment = momentData => {
  let data
  const { title, body, mood, weather, source } = momentData
  switch (momentData.type) {
    case 'moment':
      data = {
        title,
        body,
        mood,
        weather
      }
      break
    case 'hitokoto':
      data = {
        source,
        body
      }
      break
    case 'idea':
      data = {
        body
      }
      break
    case 'picture':
      // TODO callback response
      data = {}

      break
    default:
      break
  }
  return http.post(baseUrl, {
    data
  })
}

export default api
