import Vuex from 'vuex'
import Vue from 'vue'
import auth from './auth'
import ads from './ads'
import products from './products'
import axios from 'axios'

Vue.use(Vuex)

// to handle state
const state = {
  ranks: [],
  lanes: []
}

// to handle state
const getters = {
  ranks (state) {
    return state.ranks
  },
  lanes (state) {
    return state.lanes
  }
}

// to handle actions
const actions = {
  async getRanks ({ commit }) {
    let response = await axios.get('ranks')

    return commit('SET_RANKS', response.data)
  },
  async getLanes ({ commit }) {
    let response = await axios.get('lanes')

    return commit('SET_LANES', response.data)
  }
}

// to handle mutations
const mutations = {
  SET_RANKS (state, data) {
    state.ranks = data
  },
  SET_LANES (state, data) {
    state.lanes = data
  }
}

const modules = {
  auth,
  products,
  ads
}

// export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules
})
/** we have just created a boiler plate for our vuex store module**/
