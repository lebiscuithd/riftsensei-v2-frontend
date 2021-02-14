<template>
<v-container fluid>
        <v-flex xs12 sm8 md4 class="mx-auto">
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
                color="teal accent-2"
                class="mr-4 black--text"
                type="submit"
                dark
                >
                Login
                </v-btn>
            </v-form>
        </v-flex>
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
</style>
