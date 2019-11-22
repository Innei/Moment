const state = {
  sidebar: false
}

const actions = {
  toggleSidebar({ commit }) {
    commit('toggleSidebar')
  },
  closeSidebar({ commit }) {
    commit('closeSidebar')
  }
}

const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  closeSidebar (state) {
    state.sidebar = false
  }
}

export default {
  state,
  actions,
  mutations
}
