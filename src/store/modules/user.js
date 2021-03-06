import masterApi from '@/api/master'
const state = {
  user: {
    username: null,
    avatar: null,
    userId: null,
    nickname: null,
    githubUrl: null,
    userUrl: null
  },
  token: localStorage.token || null,
  isLogged: false
}

const actions = {
  loadUser({ commit }) {
    return new Promise(async (r, j) => {
      try {
        const { data } = await masterApi.getUserInfo()
        commit('storeData', data)
        r(data)
      } catch (e) {
        j(e)
      }
    })
  },
  async checkLogged({ commit, state }) {
    // return new Promise(async (r, j) => {
    //   try {
    //     // const { data } = await masterApi.checkLogged()
    //     // commit('storeLogged', data.ok ? true : false)
    //     // r(data)

    //   } catch (e) {
    //     j(e)
    //   }
    // })
    if (state.token) {
      if ((await masterApi.checkToken()).data.ok === 1) {
        commit('storeLogged', true)
        return true
      } else {
        delete localStorage.token
        state.token = null
        return false
      }
    } else {
      commit('storeLogged', false)
      return false
    }
  },
  setLogged({ commit }, status) {
    commit('storeLogged', status)
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  }
}

const mutations = {
  storeData(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  storeLogged(state, status) {
    state.isLogged = status
  }
}

export default {
  state,
  actions,
  mutations
}
