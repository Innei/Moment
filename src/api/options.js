import http from '../plugins/axios.js'

const baseUrl = 'options'

export const getAccessData = ({ from, to, page, size } = {}) =>
  http.get(`${baseUrl}/access`, {
    params: { from, to, size, page }
  })

export const getAnalytics = () => http.get(`${baseUrl}/analytics`)

export default { getAccessData, getAnalytics }
