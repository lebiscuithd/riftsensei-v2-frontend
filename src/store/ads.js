import axios from 'axios'

export default {
  namespaced: true,
  state: {
    ads: [],
    errors: [],
    currentPage: 1,
    lastPage: 8
  },

  actions: {
    async getAds ({ commit }) {
      let response = await axios.get('/ads')

      return commit('SET_ADS', response.data)
    },

    async getAdsByStatus ({ commit }, data) {
      let response = await axios.get('/adsbystatus/' + data)
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
    },

    async bookIt ({dispatch, commit}, data) {
      let response = await axios.put(`/ads/book/${data[0]}/${data[1]}`)
      dispatch('getAdsByStatus', data = 'available').then(console.log(response)).catch(error => {
        commit('SET_ERRORS', error.response.data)
      })
    }
  },

  mutations: {
    SET_ADS (state, data) {
      state.ads = data
      state.currentPage = data.meta.current_page
      state.lastPage = data.meta.last_page
    },
    SET_ERRORS (state, errors) {
      state.errors = errors
    }
  },

  getters: {
    ads (state) {
      return state.ads
    },
    errors (state) {
      return state.errors
    },
    currentPage (state) {
      return state.currentPage
    },
    lastPage (state) {
      return state.lastPage
    }
  }

}
