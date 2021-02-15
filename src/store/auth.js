import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: null,
    authuser: null
  },

  actions: {
    async signIn ({ dispatch }, credentials) {
      let response = await axios.post('auth/login', credentials)

      return dispatch('attempt', response.data.access_token)
    },

    async attempt ({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return
      }

      try {
        let response = await axios.get('auth/user-profile')

        commit('SET_AUTHUSER', response.data)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_AUTHUSER', null)
      }
    },

    signOut ({ commit }) {
      return axios.post('auth/logout').then(() => {
        commit('SET_TOKEN', null)
        commit('SET_AUTHUSER', null)
      })
    }
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_AUTHUSER (state, data) {
      state.authuser = data
    },

    SET_WALLET (state, quantity) {
      state.authuser.wallet = quantity
    }
  },

  getters: {
    authenticated (state) {
      return state.token && state.authuser
    },
    authuser (state) {
      return state.authuser
    }
  }

}
