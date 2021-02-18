import axios from 'axios'
import router from '.././router'

export default {
  namespaced: true,
  state: {
    token: null,
    authuser: null,
    errors: []
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
    },

    register ({commit}, form) {
      axios.post('auth/register', form).then(response => {
        if (response.status === 201) {
          commit('DELETE_ERRORS')
          router.push({name: 'Login'})
        }
      })
        .catch(error => {
          commit('SET_ERRORS', error.response.data)
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
    },

    SET_ERRORS (state, errors) {
      state.errors = errors
    },
    DELETE_ERRORS (state) {
      state.errors = []
    }
  },

  getters: {
    authenticated (state) {
      return state.token && state.authuser
    },
    authuser (state) {
      return state.authuser
    },
    errors (state) {
      return state.errors
    }
  }

}
