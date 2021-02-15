import Vuex from 'vuex'
import Vue from 'vue'
import auth from './auth'
import ads from './ads'
import products from './products'

Vue.use(Vuex)

// to handle state
const state = {

}

// to handle state
const getters = {

}

// to handle actions
const actions = {

}

// to handle mutations
const mutations = {

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
