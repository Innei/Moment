const state = {
  username: null,
  avatar: null,
  userId: null,
  nickname: null,
  githubUrl: null
}

const actions = {
  storeData({ commit }) {
    commit('storeData')
  }
}

const getters = {
  data: state => {
    return {
      username: state.username,
      avatar: state.avatar,
      nickname: state.nickname,
      githubUrl: state.githubUrl
    }
  },
}

const mutations = {
  storeData(state, { username, avatar, userId, nickname, githubUrl }) {
    state.username = username
    state.avatar = avatar
    state.userId = userId
    state.nickname = nickname
    state.githubUrl = githubUrl
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
