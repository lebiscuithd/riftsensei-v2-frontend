<template>
<v-container class="px-15 mt-sm-15">
    <v-snackbar v-model="snackbar" :timeout="6000" text dark top color="primary" transition="slide-y-transition">
      {{alertMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          color="primary"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
<v-row>
  <v-col cols="12" md="6" v-for="product in products" :key="product.id">
          <v-card
        class="rounded-xl"
        color="backgroundLight"
        dark
      >
        <v-img
          :src="product.image"
        ></v-img>

        <v-card-title class="justify-center">
          {{product.description}} <br>
          {{product.cost}} €
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="primary"
            class="mx-auto mb-4 black--text"
            @click="bundle=product; dialog = true;"
          >
                <v-icon
            left
            dark
          >
            mdi-credit-card
          </v-icon>
            ORDER
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
        persistent
        primary
      >
          <v-card
          dark
          color="blue-grey darken-4"
          class="rounded-lg">
            <v-card-title class="headline mb-5 font-weight-bold">
          Give us your payment details
          <v-spacer></v-spacer>
          <v-chip
            class="ma-2"
            color="primary"
            outlined
          >
            {{bundle.quantity}} gems
          </v-chip>
            </v-card-title>
            <v-card-text>
              <CardPayment :product="bundle" @gemsalert="showAlert"/>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

</v-container>
</template>

<script>
import CardPayment from '../components/CardPayment.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { CardPayment },
  data () {
    return {
      dialog: false,
      bundle: '',
      snackbar: false,
      alertMessage: ''
    }
  },
  mounted () {
    this.getProducts()
  },
  computed: {
    ...mapGetters({
      products: 'products/products',
      authuser: 'auth/authuser'
    })
  },
  methods: {
    ...mapActions({
      getProducts: 'products/getProducts'
    }),
    showAlert (quantity) {
      this.snackbar = true
      this.alertMessage = 'Thank you ! ' + quantity + ' gems has been credited on your wallet.'
    }
  }
}
</script>

<style>

</style>
