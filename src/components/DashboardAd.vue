<template>
<div>
    <v-card>
        <v-layout :class="`pa-3 project ${ad.ad.status}`">
          <v-flex xs6 md3>
            <div class="caption grey--text">Ad description</div>
            <div>{{ ad.ad.description }}</div>
          </v-flex>
          <v-flex xs6 md3>
            <div class="caption grey--text">Coaching Date</div>
            <div>{{ ad.ad.coaching_date }}</div>
          </v-flex>
          <v-flex xs3 sm2 md1>
            <div class="caption grey--text">Duration</div>
            <div> {{ad.ad.duration}} hours </div>
          </v-flex>
          <v-flex v-if="ad.ad.coach_id === authuser.id" xs3 sm2 md1>
            <div class="caption grey--text">Student</div>
            <div v-if="ad.student"> <router-link class="text--teal" to="/"> {{ad.student.username}} </router-link> </div>
          </v-flex>
          <v-flex v-if="ad.ad.student_id === authuser.id" xs6 sm4 md2>
            <div class="caption grey--text">Coach</div>
            <div v-if="ad.student"> <router-link class="text--teal" to="/"> {{ad.coach.username}} </router-link> </div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Price</div>
            <div>{{ad.ad.total_price}} <img class="" src="../assets/gem.svg" height="12px" alt=""></div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :color="classStatus" class="white--text my-2 caption">{{ ad.ad.status }}</v-chip>
            </div>
          </v-flex>
            <v-flex v-if="ad.ad.coach_id === authuser.id" xs4 sm8 md4>
                <div class="right my-2">
                <v-btn @click="deleteAd(ad.ad.id)" v-if="ad.ad.status === 'available'" small color="error" class=""> delete </v-btn>
                <v-btn @click="coachingDone({coach:authuser.id, ad:ad.ad.id})" v-if="ad.ad.status === 'pending'" small color="primary" class=""> coaching done </v-btn>
                <i v-if="ad.ad.status === 'finished'" class="caption grey--text"> Waiting for coaching rating</i>
                    <v-rating
                        v-if="ad.ad.status === 'rated'"
                        v-model="ad.ad.ad_rating"
                        readonly
                        background-color="orange lighten-3"
                        color="orange"
                        small
                    ></v-rating>
                </div>
          </v-flex>
            <v-flex v-if="ad.ad.student_id === authuser.id" xs4 sm8 md4>
                <v-row class="right my-2">
                    <v-rating
                        v-if="ad.ad.status === 'finished'"
                        v-model="rate"
                        background-color="orange lighten-3"
                        color="orange"
                        small
                    ></v-rating>
                    <v-btn @click="rateAd({ad:ad.ad.id, rating:rate})" v-if="ad.ad.status === 'finished'" small color="primary" class=""> rate IT </v-btn>
                </v-row>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
    </v-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['ad'],
  data () {
    return {
      rate: 0
    }
  },
  computed: {
    ...mapGetters({
      authuser: 'auth/authuser',
      ads: 'ads/ads'
    }),
    classStatus () {
      if (this.ad.ad.status === 'available') {
        return 'indigo'
      }
      if (this.ad.ad.status === 'pending') {
        return 'warning'
      }
      if (this.ad.ad.status === 'finished') {
        return 'primary'
      }
      if (this.ad.ad.status === 'rated') {
        return 'purple'
      }
    }
  },
  methods: {
    ...mapActions({
      deleteAd: 'ads/deleteAd',
      coachingDone: 'ads/coachingDone',
      rateAd: 'ads/rateAd'
    })
  }
}

</script>

<style>
.v-chip.finished{
  background: #3cd1c2;
}
.v-chip.pending{
  background: #ffaa2c;
}
.v-chip.available{
  background-color: #2cd8ff;
}
.v-chip.rated{
  background: #6d3ef8;
}
</style>
