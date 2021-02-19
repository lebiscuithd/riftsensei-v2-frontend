<template>
<div>
  <v-container class="my-5">
    <v-row wrap>
        <Ad v-for="ad in ads.data" :key="ad.ad.id" :ad="ad"/>
      <template>
        <div class="text-center mx-auto">
                    {{lastPage}}
          {{currentPage}}
          <v-pagination
            v-model="currentPage"
            :length="lastPage"
            :total-visible="8"
            class="grey darken-3 rounded"
            dark
            color="teal darken-2"
            active-class="text-blue"
            @click="getAdsBystatus()"
          ></v-pagination>
        </div>
      </template>
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
      status: 'available'
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
      lastPage: 'ads/lastPage'
    })
  },
  methods: {
    ...mapActions({
      getAds: 'ads/getAds',
      getAdsByStatus: 'ads/getAdsByStatus'
    })
  }
}
</script>

<style>

</style>
