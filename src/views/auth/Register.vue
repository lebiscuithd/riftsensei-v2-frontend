<template>
  <v-container class="section-container py-0 px-0 mt-10 elevation-5" >
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
        <div class="text-left text-h4 font-weight-bold">Sign up</div>
        <div class="text-left grey--text text--lighten-1 text-h6 mb-8">Already a member ?
          <router-link to="/login" class="routerlink">Sign in
          </router-link>
        </div>
  <v-stepper v-model="e1" dark>
    <v-stepper-header class="elevation-0 mb-5">
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
        color="teal"
        class="pl-0"
      >
        User info
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
        color="teal"
      >
        Player info
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"
       color="teal"
       class="pr-0"
       >
        Finalization
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1" class="py-0">
        <v-form
                ref="form"
                v-model="valid1"
                lazy-validation
                @submit.prevent="submit"
            >
                <v-text-field
                v-model="form.username"
                :rules="[usernameRules.required, usernameRules.min, usernameRules.max]"
                label="Username"
                required
                outlined
                dark
                class="pt-3"
                ></v-text-field>
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
                <v-text-field
                v-model="form.password_confirmation"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min, passwordConfirmationRule]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                label="Password confirmation"
                dark
                outlined
                @click:append="show2 = !show2"
                ></v-text-field>
            </v-form>
        <v-btn
          color="primary"
          @click="e1 = 2"
          class="black--text"
          :disabled="!valid1"
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2" class="pa-0">
          <div class="text-left white--text text--lighten-1 text-h6 mb-2">
            What is your IG rank ?
          </div>
          <v-chip-group
            active-class="primary--text"
            column
            v-model="form.rank_id"
            mandatory
            class="mb-5"
          >
            <v-chip
              v-for="rank in ranks"
              :key="rank.id"
              :value="rank.id"
              outlined
              filter
            >
            <v-avatar class="mr-1">
              <img
                :src="rank.image"
                alt="rankLogo"
              >
            </v-avatar>
              {{ rank.name }}
            </v-chip>
          </v-chip-group>
          <div class="text-left white--text text--lighten-1 text-h6 mb-2">
            Which lane(s) do you play ?
          </div>
        <v-chip-group
        v-model="form.lane_id"
        column
        multiple
        class="mb-10"
      >
        <v-chip
          v-for="lane in lanes"
          :key="lane.id"
          filter
          outlined
          active-class="primary--text"
          :value="lane.id"
        >
            <v-avatar class="mr-1">
              <img
                :src="lane.image"
                alt="LaneLogo"
              >
             </v-avatar>
          {{lane.name}}
        </v-chip>
      </v-chip-group>
        <v-btn text
        @click="e1 -=1">
          Previous step
        </v-btn>
        <v-btn
          color="primary"
          @click="e1 = 3"
          class="black--text"
        >
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3" class="px-0">
        <div class="text-left white--text text--lighten-1 text-h5 font-weight-bold mb-4">
        🎉  Thank you for joining us <b class="primary--text">{{form.username}}</b> !
        </div>
         <div class="text-left white--text text--lighten-1 text-h6 mb-15">
        As a welcome-home gift, you'll receive <b class="primary--text">100 gems <img class="my-auto" src="../../assets/gem.svg" height="18px" alt=""></b> to kickstart your career on RiftSensei !
        </div>

        <v-btn text
        @click="e1 -=1">
          Previous Step
        </v-btn>
                <v-btn
                :disabled="!valid1"
                color="primary"
                class="mr-4 black--text"
                @click="register()"
                dark
                >
                Register
                </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    show1: false,
    show2: false,
    valid1: false,
    e1: 1,
    form: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      rank_id: 1,
      lane_id: []
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    usernameRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 2 || 'Min 2 characters',
      max: v => v.length <= 20 || 'Max 20 characters'
    },
    passwordRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters'
    },
    alert: false
  }),

  methods: {
    ...mapActions({
      getRanks: 'getRanks',
      getLanes: 'getLanes'
    }),
    submit () {
    }
  },
  mounted () {
    this.getRanks()
    this.getLanes()
  },
  computed: {
    passwordConfirmationRule () {
      return () => (this.form.password === this.form.password_confirmation) || 'Password must match'
    },
    ...mapGetters({
      ranks: 'ranks',
      lanes: 'lanes'
    })
  }
}
</script>

<style scoped>

.v-stepper {
  background-color: transparent!important;
  box-shadow: none;
}
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
.roundedlogin {
  border-radius: 15px!important;
  background-color: transparent!important;
}
.routerlink {
  text-decoration: none;
}
.v-list {
  background-color: rgba(39, 41, 40);
}

</style>
