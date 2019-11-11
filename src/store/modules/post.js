const state = {
  isPost: false
}

const actions = {
  togglePost({ commit }) {
    commit('toggleState')
  },
  resetPost({ commit }) {
    commit('resetState')
  }
}

const mutations = {
  toggleState(state) {
    state.isPost = !state.isPost
  },
  resetState(state) {
    state.isPost = false
  }
}

export default {
  state,
  actions,
  mutations
}
