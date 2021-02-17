import axios from 'axios'

export default {
  namespaced: true,
  state: {
    contacts: [],
    messages: []
  },

  actions: {
    async getContacts ({ commit }) {
      let response = await axios.get('contacts')

      return commit('SET_CONTACTS', response.data)
    },
    async getMessages ({commit}, contact) {
      let response = await axios.get(`conversation/${contact.id}`)

      return commit('SET_MESSAGES', response.data)
    },
    async sendMessages ({commit}, data) {
      let response = await axios.post('conversation/send', data)

      return commit('SET_MESSAGES', response.data)
    }
  },

  mutations: {
    SET_CONTACTS (state, data) {
      state.contacts = data
    },
    SET_MESSAGES (state, data) {
      state.messages = data
    }
  },

  getters: {
    contacts (state) {
      return state.contacts
    }
  }

}
