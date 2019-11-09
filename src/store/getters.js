const getters = {
  user: state => state.user.user,
  token: state => state.user.token,
  moments: state => state.moments.moments,
  total: state => state.moments.total
}
export default getters