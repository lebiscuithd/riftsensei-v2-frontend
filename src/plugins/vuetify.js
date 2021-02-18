import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: colors.teal.accent3,
        secondary: '#b0bec5',
        accent: '#8c9eff',
        backgroundDark: '#191b1c',
        backgroundLight: '#202221',
        black: '#222222'
      }
    }
  }
}

export default new Vuetify(opts)
