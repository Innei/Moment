import http from '../plugins/axios.js'

const baseUrl = 'options'

export const getAccessData = (from, to) =>
  http.get(`${baseUrl}/access`, {
    params: { from, to }
  })

export const getAnalytics = () => http.get(`${baseUrl}/analytics`)

export default { getAccessData, getAnalytics }
