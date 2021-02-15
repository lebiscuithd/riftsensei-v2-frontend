import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: []
  },

  actions: {
    async getProducts ({ commit }) {
      let response = await axios.get('/products')

      return commit('SET_PRODUCTS', response.data)
    }
  },

  mutations: {
    SET_PRODUCTS (state, data) {
      state.products = data
    }
  },

  getters: {
    products (state) {
      return state.products
    }
  }

}
