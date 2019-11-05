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
  token: null
}

const actions = {
  loadUser({ commit }) {
    return new Promise(async (r, j) => {
      try {
        const data = (await masterApi.getUserInfo()).data
        commit('storeData', data)
        r(data)
      } catch (e) {
        j(e)
      }
    })
  }
}

// const getters = {
//   data: state => {
//     return {
//       username: state.username,
//       avatar: state.avatar,
//       nickname: state.nickname,
//       githubUrl: state.githubUrl
//     }
//   }
// }

const mutations = {
  storeData(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
  }
}

export default {
  state,
  actions,
  mutations
}
