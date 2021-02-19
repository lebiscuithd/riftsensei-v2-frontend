// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import axios from 'axios'

require('@/store/subscriber')

axios.defaults.baseURL = 'https://ancient-badlands-05555.herokuapp.com/api'
axios.defaults.withCredentials = true

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  (() => new Vue({
    vuetify,
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  }))()
})
