<template>
<div>

  <div v-for="product in products" :key="product.id">
    {{product}}
    <v-btn
    @click="bundle=product; dialog = true;"
    color="teal accent-3">
      order
    </v-btn>
  </div>

  <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
        persistent
        primary
        background-color="red"
      >
          <v-card>
            <v-toolbar
              color="teal accent-3"
              class="text-h6"
            >
             Credit card information </v-toolbar>
            <v-card-text>
              <CardPayment :product="bundle" />
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

</div>
</template>

<script>
import CardPayment from '../components/CardPayment.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { CardPayment },
  data () {
    return {
      dialog: false,
      bundle: ''
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
    })
  }
}
</script>

<style>

</style>
