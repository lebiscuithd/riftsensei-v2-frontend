import axios from 'axios'

export default {
  namespaced: true,
  state: {
    ads: [],
    errors: []
  },

  actions: {
    async getAds ({ commit }) {
      let response = await axios.get('/ads')

      return commit('SET_ADS', response.data)
    },

    async createAd ({ commit }, data) {
      let response = await axios.post('/ads', {
        coach_id: data[0],
        coaching_date: data[2],
        duration: data[1].duration,
        hourly_rate: data[1].hourly_rate,
        description: data[1].description
      }).then(response => console.log(response))
        .then(this.errors = 'no errors')
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
          }
        })
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
