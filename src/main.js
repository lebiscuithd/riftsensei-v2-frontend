// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueEcho from 'vue-echo'
import VuePusher from 'vue-pusher'

require('./store/subscriber')

axios.defaults.baseURL = 'https://ancient-badlands-05555.herokuapp.com/api/'
axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(VueEcho, {
  broadcaster: 'pusher',
  key: 'f3c23fc2e1e0c92fda75'
})
Vue.use(VuePusher, {
  api_key: 'f3c23fc2e1e0c92fda75',
  options: {
    cluster: 'eu',
    encrypted: true
  }
})

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
