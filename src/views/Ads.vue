<template>
<div>
  <v-container class="my-5">
    <v-row wrap>
        <Ad v-for="ad in ads.data" :key="ad.ad.id" :ad="ad"/>
        <v-btn>Previous</v-btn>
        <v-btn>Next</v-btn>
    </v-row>
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
    }
  },
  mounted () {
    this.getAds()
  },
  computed: {
    ...mapGetters({
      ads: 'ads/ads',
      authuser: 'auth/authuser'
    })
  },
  methods: {
    ...mapActions({
      getAds: 'ads/getAds'
    })
  }
}
</script>

<style>

</style>
