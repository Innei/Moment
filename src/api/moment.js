import http from '../plugins/axios.js'

const baseUrl = 'moments'

export const getRecentlyMoment = function({ size, page }) {
  return http.get(baseUrl, {
    params: {
      size,
      page
    }
  })
}

export const postNewMoment = momentData => {
  let data
  const { title, body, mood, weather, source, src, comment } = momentData
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
      data = {
        comment,
        src
      }

      break
    default:
      break
  }
  return http.post(baseUrl, {
    data
  })
}

export default { getRecentlyMoment, postNewMoment }
