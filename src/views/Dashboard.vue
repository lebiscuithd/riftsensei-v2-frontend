<template>
<v-container>
  <h1 class="text-left my-5">Dashboard</h1>
    <template>
    <v-card dark color="backgroundLight">
      <v-card-title class="text-center justify-center py-6">
        <h3 class="font-weight-bold">
          Coachings
        </h3>
      </v-card-title>

      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="primary"
        grow
        dark
      >
        <v-tab
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
        >
          <v-card
            color="grey lighten-3"
            flat
          >
            <v-card-text>
              <div v-for="ad in ads.data" :key="ad.id">
                <div v-if="ad.ad.coach_id === authuser.id">
                    <DashboardAd :ad="ad"/>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
                <v-tab-item
        >
          <v-card
            color="basil"
            flat
          >
            <v-card-text>
              <div v-for="ad in ads.data" :key="ad.id">
                <div v-if="ad.ad.student_id === authuser.id">
                    <DashboardAd :ad="ad"/>
                  </div>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </template>
  <v-card dark color="backgroundLight" class="mt-5">
      <v-card-title class="text-center justify-center py-6">
        <h3 class="font-weight-bold">
          Receipts
        </h3>
      </v-card-title>
      <v-card-text>
          <v-data-table
          light
          :headers="headers"
          :items="receipts.data"
          :items-per-page="5"
          class="elevation-1"
        >
        </v-data-table>
      </v-card-text>
  </v-card>
</v-container>

</template>

<script>
import DashboardAd from '../components/DashboardAd.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { DashboardAd },
  data () {
    return {
      tab: null,
      items: [
        'As a coach', 'As a student'
      ],
      headers: [
        {
          text: 'Bundle name',
          align: 'start',
          value: 'product.description'
        },
        { text: 'Gems', value: 'product.quantity' },
        { text: 'Price', value: 'product.cost' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      authuser: 'auth/authuser',
      ads: 'ads/ads',
      receipts: 'ads/receipts'
    })
  },
  methods: {
    ...mapActions({
      getAds: 'ads/getAds',
      getReceipts: 'ads/getReceipts'
    }),
    showAlert () {
      this.snackbar = true
    }
  },
  mounted () {
    this.getAds()
    this.getReceipts()
  }
}
</script>

<style>

</style>
