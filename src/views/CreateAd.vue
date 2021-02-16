<template>
  <v-container class="section-container py-0 px-0 mt-10 elevation-5" >
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="saveAd"
        >
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.date"
                label="Coaching Date"
                dark
                outlined
                required
                :rules="dateRules"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(form.date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="form.time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.time"
                :rules="timeRules"
                dark
                required
                outlined
                label="Coaching Time"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              v-model="form.time"
              full-width
              @click:minute="$refs.menu2.save(form.time)"
            ></v-time-picker>
          </v-menu>

          <v-text-field
            v-model="form.duration"
            :rules="durationRules"
            label="Duration"
            required
            outlined
            dark
          ></v-text-field>

          <v-text-field
            v-model="form.hourly_rate"
            :rules="[hourly_rateRules.required, hourly_rateRules.min]"
            label="Rate"
            required
            outlined
            dark
          ></v-text-field>
          <v-text-field
            v-model="form.description"
            :rules="[descriptionRules.required, descriptionRules.maxLength]"
            label="Description"
            required
            outlined
            dark
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
            Save
          </v-btn>
        </v-form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    show1: false,
    valid: true,
    menu: false,
    menu2: false,
    form: {
      date: new Date().toISOString().substr(0, 10),
      time: null,
      coaching_date: '',
      duration: '',
      hourly_rate: '',
      description: ''
    },
    durationRules: [
      v => !!v || 'A duration is required',
      v => v >= 1 || 'Minimum 1 hour',
      v => v <= 8 || 'Maximum 8 hours'
    ],
    hourly_rateRules: {
      required: value => !!value || 'Required.',
      min: v => v >= 100 || 'Minimum 100 gems per hour'
    },
    descriptionRules: {
      required: value => !!value || 'Required.',
      maxLength: v => v.length <= 500 || 'Maximum 500 characters'
    },
    dateRules: [
      v => !!v || 'A date is required'
    ],
    timeRules: [
      v => !!v || 'A coaching time is required'
    ],
    alert: false
  }),
  computed: {
    time () {
      let coachingDate = this.form.date + ' ' + this.form.time
      return coachingDate
    },
    ...mapGetters({
      authuser: 'auth/authuser'
    })
  },
  methods: {
    ...mapActions({
      createAd: 'ads/createAd'
    }),
    saveAd () {
      this.createAd(
        [
          this.authuser.id, this.form, this.time
        ])
    }
  }
}
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {

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
  background-color: transparent!important;
}

</style>
