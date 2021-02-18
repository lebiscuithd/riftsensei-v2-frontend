<template>
<v-flex xs12 sm6 md4 lg3>
  <v-card dark color="blue-grey darken-4" height="450" elevation="5" class="text-xs-center ma-3 rounded-lg ">
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
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
            <span>User profile</span>
        </v-tooltip>    
              <v-avatar size="120">
                <img :src="ad.coach.avatar">
              </v-avatar>

    </v-responsive>
    <v-card-text class="grey--text text--lighten-2">
              <div class="text-h6 mb-2">
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
<div class="subtitle-1 text-center grey--text text--lighten-2">
        <v-icon>
          mdi-calendar
        </v-icon>
        {{date.day}}
        <v-icon>
          mdi-clock
        </v-icon>
        {{date.time}} {{date.finaltime}}
      </div>
      
    </v-card-text>

      <div>Small plates, salads sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    <v-card-actions>
      <v-btn text color="grey">
        <span class="">Message</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</v-flex>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      date: {
        day: new Date(this.ad.ad.coaching_date).toISOString().substr(0, 10),
        time: `${new Date(this.ad.ad.coaching_date).getHours()}`+ ':' + `${new Date(this.ad.ad.coaching_date).getMinutes()}`
      },
      rating: 4,
      selectedlanes: [1, 2, 3, 4, 5]
    }
  }
}
</script>

<style>

</style>
