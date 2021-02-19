import axios from 'axios'

export default {
  namespaced: true,
  state: {
    ads: [],
    errors: [],
    currentPage: 1,
    lastPage: 3,
    receipts: []
  },

  actions: {
    async getAds ({ commit }) {
      let response = await axios.get('/ads')
      return commit('SET_ADS', response.data)
    },

    async getAdsByStatus ({ commit }, data) {
      if (data.page) {
        let response = await axios.get('/adsbystatus/' + data + '/?page=' + data.page)
        return commit('SET_ADS', response.data)
      } else {
        let response = await axios.get('/adsbystatus/' + data)
        return commit('SET_ADS', response.data)
      }
    },

    deleteAd ({dispatch}, data) {
      axios.delete('/ads/' + data).then(() => {
        dispatch('getAds')
      })
    },

    getReceipts ({commit}) {
      axios.get('/receipts').then(response => {
        commit('SET_RECEIPTS', response.data)
      })
    },

    rateAd ({dispatch}, data) {
      axios.put('/ads/rating/' + data.ad, {
        ad_rating: data.rating
      }).then(() => { dispatch('getAds') })
    },

    coachingDone ({dispatch, commit}, data) {
      axios.put('/ads/finished/' + data.coach + '/' + data.ad)
        .then(response => commit('auth/EDIT_WALLET', response.data.user.wallet, { root: true }))
        .then(() => dispatch('getAds'))
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

    bookIt ({dispatch, commit}, data) {
      axios.put(`/ads/book/${data[0]}/${data[1]}`)
        .then(response => { commit('auth/EDIT_WALLET', response.data.user.wallet, { root: true }) })
        .then(() => {
          commit('DELETE_ERRORS')
        })
        .then(() => {
          dispatch('getAdsByStatus', data = 'available')
        })
        .catch(error => {
          commit('SET_ERRORS', error.response.data)
        })
    }
  },

  mutations: {
    SET_ADS (state, data) {
      state.ads = data
      if (data.meta) {
        state.currentPage = data.meta.current_page
        state.lastPage = data.meta.last_page
      }
    },
    SET_ERRORS (state, errors) {
      state.errors = errors
    },
    SET_RECEIPTS (state, data) {
      state.receipts = data
    },
    DELETE_ERRORS (state) {
      state.errors = []
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
    },
    receipts (state) {
      return state.receipts
    }
  }

}
