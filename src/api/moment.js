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

export const postNewMoment = momentData =>
  http.post(baseUrl, {
    ...pickContent(momentData)
  })

export const deleteOneMoment = id => http.delete(`${baseUrl}/${id}`)

export const modifyOneMoment = (id, data) =>
  http.put(`${baseUrl}/${id}`, {
    ...pickContent(data)
  })

export default {
  getRecentlyMoment,
  postNewMoment,
  deleteOneMoment,
  modifyOneMoment
}

function pickContent(momentData) {
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
  return Object.assign({}, { content: { ...data } }, { type: momentData.type })
}
