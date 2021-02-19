<template>
<div>
  <v-snackbar v-model="snackbar" :timeout="6000" text dark top :color="alertClass" transition="slide-y-transition">
      {{alertMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          primary
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  <v-container class="my-5">
    <v-row wrap>
        <Ad v-for="ad in ads.data" :key="ad.ad.id" :ad="ad" @adalert="showAlert"/>
    </v-row>
          <template>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="lastPage"
            :total-visible="8"
            class="rounded"
            dark
            color="teal darken-2"
            active-class="text-blue"
            @click="getAdsBystatus({status: status, page: page})"
          ></v-pagination>
        </div>
      </template>
  </v-container>
</div>
</template>

<script>
import Ad from '../components/Ad.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { Ad },
  data () {
    return {
      status: 'available',
      page: 1,
      snackbar: false
    }
  },
  mounted () {
    this.getAdsByStatus(this.status)
  },
  computed: {
    ...mapGetters({
      ads: 'ads/ads',
      authuser: 'auth/authuser',
      currentPage: 'ads/currentPage',
      lastPage: 'ads/lastPage',
      errors: 'ads/errors'
    }),
    alertClass () {
      if (this.errors.message) {
        return 'red'
      } else {
        return 'primary'
      }
    },
    alertMessage () {
      if (this.errors.message) {
        return this.errors.message
      } else {
        return 'You have successfully booked a coaching, you can now see it on your dashboard'
      }
    }
  },
  methods: {
    ...mapActions({
      getAds: 'ads/getAds',
      getAdsByStatus: 'ads/getAdsByStatus'
    }),
    showAlert () {
      this.snackbar = true
    }
  }
}
</script>

<style>

</style>
