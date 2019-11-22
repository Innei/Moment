import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import moments from './modules/moments'
import post from './modules/post'
import options from './modules/options'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    moments,
    post,
    options
  },
  getters
})

export default store
