import axios from 'axios'

export default {
  namespaced: true,
  state: {
    ads: []
  },

  actions: {
    async getAds ({ commit }) {
      let response = await axios.get('/ads')

      return commit('SET_ADS', response.data)
    }
  },

  mutations: {
    SET_ADS (state, data) {
      state.ads = data
    }
  },

  getters: {
    ads (state) {
      return state.ads
    }
  }

}
