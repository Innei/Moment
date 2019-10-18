const state = {
  username: null,
  avatar: null,
  userId: null

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
      avatar: state.avatar
    }
  },
}

const mutations = {
  storeData(state, { username, avatar, userId }) {
    state.username = username
    state.avatar = avatar
    state.userId = userId
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
