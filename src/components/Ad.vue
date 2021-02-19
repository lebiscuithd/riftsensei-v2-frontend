<template>
<v-flex xs12 sm6 md4 lg3 v-if="ad.ad.status === 'available'">
  <v-card dark color="blue-grey darken-4" elevation="5" class="text-xs-center ma-3 rounded-lg ">
    <v-responsive class="pt-4">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                  color="teal darken-3"
                  fab
                  dark
                  x-small
                  absolute
                  v-bind="attrs"
                  v-on="on"
                  class=""
                  :to="'/profile/' + ad.coach.id"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
            <span>See profile</span>
        </v-tooltip>
              <v-avatar size="120">
                <img :src="ad.coach.avatar">
              </v-avatar>

    </v-responsive>
    <v-card-text class="grey--text text--lighten-2">
              <div class="text-button font-weight-bold mb-2">
                 <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                <v-icon
                v-bind="attrs"
                v-on="on"
                v-if="ad.coach.verified_coach"
                small
                color="teal lighten-2">
                 mdi-checkbox-marked-circle {{ ad.coach.username }}
                </v-icon>
                  </template>
                  <span>Verified coach</span>
                 </v-tooltip>
                {{ ad.coach.username }}
                </div>
              <v-chip
              dark
            >
            <v-avatar size="62" class="mr-1">
              <img
                :src="ad.coach.rank.image"
                alt="rankLogo"
              >
            </v-avatar>
              {{ ad.coach.rank.name }}
            </v-chip>
      <v-chip-group
        column
        multiple
        class="mt-3"
      >
        <v-chip
          v-for="lane in ad.coach.lanes"
          :key="lane.id"
          outlined
          color="yellow darken-1"
          class="mx-auto"

        >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
          <div>
        <v-avatar
        v-bind="attrs"
        v-on="on"
        >
              <img
                :src="lane.image"
                alt="LaneLogo"
              >
             </v-avatar>
          </div>
                  </template>
          <span>{{lane.name}}</span>
       </v-tooltip>
        </v-chip>
      </v-chip-group>
    </v-card-text>
<v-divider class="mx-4"></v-divider>
    <v-card-text>
            <div style="height: 95px" class="text-left grey--text text--lighten-2 mx-auto description pa-3 rounded-lg mb-3">
        <b class="mb-2">Coaching purpose</b>
        <br>
        {{ad.ad.description}}
        </div>
<div class="subtitle-1 text-center grey--text text--lighten-2 mb-3">
        <v-icon>
          mdi-calendar
        </v-icon>
        {{date}}
        <v-icon class="ml-4">
          mdi-clock
        </v-icon>
        {{formatTime}}
</div>
<v-row class="grey--text text--lighten-2 mt-1 px-8">
      <h4>Duration: {{ad.ad.duration}} hours </h4>
      <v-spacer></v-spacer>
      <h4>{{ad.ad.hourly_rate}} <img class="" src="../assets/gem.svg" height="15px" alt=""> /hour</h4>
</v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="cyan darken-2 ma-2" :to="'/chat/' + ad.coach.id">
        <v-icon left>mdi-chat</v-icon> Chat
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="teal darken-2 ma-2" @click="bookAd()"> Book it {{ad.ad.total_price}}<img class="my-auto ml-1" src="../assets/gem.svg" height="15px" alt="">
      </v-btn>
    </v-card-actions>
  </v-card>
</v-flex>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['ad'],
  data () {
    return {
      date: new Date(this.ad.ad.coaching_date).toISOString().substr(0, 10),
      rating: 4,
      selectedlanes: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    formatTime () {
      if (new Date(this.ad.ad.coaching_date).getMinutes() < 10) {
        return (new Date(this.ad.ad.coaching_date).getHours() + ':0' + new Date(this.ad.ad.coaching_date).getMinutes())
      } else {
        return (new Date(this.ad.ad.coaching_date).getHours() + ':' + new Date(this.ad.ad.coaching_date).getMinutes())
      }
    },
    ...mapGetters({
      authenticated: 'auth/authenticated',
      authuser: 'auth/authuser'
    })
  },
  methods: {
    ...mapActions({
      bookIt: 'ads/bookIt'
    }),
    bookAd () {
      if (!this.authenticated) {
        window.alert('Please login to book an Ad !')
        this.$router.push('login')
      } else {
        this.bookIt([this.authuser.id, this.ad.ad.id])
      }
    }
  }

}
</script>

<style>
.description {
  background-color: #202221;
}
</style>
