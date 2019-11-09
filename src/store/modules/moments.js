import momentApi from '@/api/moment'

const state = {
  moments: {},
  total: 0
}

const actions = {
  loadRecentlyMoments({ commit }) {
    return new Promise(async (r, j) => {
      try {
        const data = (await momentApi.getRecentlyMoment({ size: 5 })).data
        if (data.ok === 1) {
          commit('storeMoments', data.data)
          commit('storeTotalNum', data.pageOptions.total)
        }
        r(data)
      } catch (e) {
        j(e)
      }
    })
  }
}

const mutations = {
  storeMoments(state, moments) {
    state.moments = moments
  },
  storeTotalNum (state, num) {
    state.total = num
  }
}

export default {
  state,
  actions,
  mutations
}
