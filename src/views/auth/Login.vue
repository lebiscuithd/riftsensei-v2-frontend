<template>
  <v-container class="section-container py-0 px-0 mt-10 rounded-lg elevation-5" >
    <v-row class="signin">
      <v-col cols="6" class="left d-none d-md-flex">
        <v-card class="roundedlogin">
            <v-img
              :src="require('../../assets/lol_promoart_8.jpg')"
              class="white--text roundedlogin"
              gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="800"
            >
            </v-img>
          </v-card>
      </v-col>
      <v-col cols="12" md="6" class="right my-auto">
        <div class="text-left text-h4 font-weight-bold">Sign in</div>
        <div class="text-left grey--text text--lighten-1 text-h6 mb-8">New here ?
          <router-link to="/register" class="routerlink">Create Account
          </router-link>
        </div>
        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="submit"
            >
                <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="E-mail"
                required
                outlined
                dark
                ></v-text-field>

                <v-text-field
                v-model="form.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                dark
                outlined
                @click:append="show1 = !show1"
                ></v-text-field>
                <v-alert
                  :value="alert"
                  dense
                  border="left"
                  class="text-left"
                  transition="scale-transition"
                  type="error">
                    Bad credentials
                </v-alert>
                <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4 black--text"
                type="submit"
                dark
                large
                block
                >
                Login
                </v-btn>
            </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    show1: false,
    valid: true,
    form: {
      email: '',
      password: ''
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters'
    },
    alert: false
  }),

  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    submit () {
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: 'Dashboard'
        })
      }).catch(error => {
        if (error.response.status === 401) {
          this.alert = true
        }
      })
    }
  }
}
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  background-color: rgba(39, 41, 40, 0.986);
}
.section-container {
  border-radius: 15px!important;
  border: 1px solid rgba(69, 69, 69, 0.986);
}
.signin {
    padding: 0;
    border-radius: 15px!important;
    margin: 0 auto;
    min-height: 600px;
    background-color: rgba(32, 34, 33, 0.986);
}
.signin .left {
      border-radius: 15px!important;
      padding: 0px;
      box-sizing: border-box;
      display: flex;
      color: #30ac7c;
}
.signin .right {
      padding: 50px;
      box-sizing: border-box;
      color: #fff; }
.signin .left .right .h2 {
        margin: 30px 0;
}
.routerlink {
  text-decoration: none;
}
.roundedlogin {
  border-radius: 15px!important;
  background-color: transparent
}

</style>
