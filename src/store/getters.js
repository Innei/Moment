const getters = {
  user: state => state.user.user,
  token: state => state.user.token,
  moments: state => state.moments.moments,
  total: state => state.moments.total,
  isPost: state => state.post.isPost,
  isLogged: state => state.user.isLogged,
  sidebar: state => state.options.sidebar
}
export default getters