<template>
<div>

  <div v-for="product in products" :key="product.id">
    {{product}}
<v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="teal accent-2"
            v-bind="attrs"
            v-on="on"
          >Order</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="teal accent-2"
            >Credit card informations</v-toolbar>
            <v-card-text>
              <CardPayment :product="product" />
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
  </div>

</div>
</template>

<script>
import CardPayment from '../components/CardPayment.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { CardPayment },
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
