<template>
  <v-row justify="center">
    <v-col cols="12">
      <div class="text-h5 mb-5">
        Give us your payment details: {{product}}
      </div>
      <card class="stripe-card"
            stripe="pk_test_51IIW3wLera9KqYYc3uYRkdYdjFSMCFB5vzZxLU2Dbr1o2ekWUkYAWkUefStKDnA6nDGfk1JiN29fGoJyq8D5AIS100lbJg4BtA"
            :options="stripeOptions"
            @change="errorHandler($event)"/>
      <div id="card-errors" role="alert" v-text="errorMessage"></div>
      <v-btn block color="teal accent-3 black--text" class="mt-5" @click="pay(product)" :disabled="!valid">pay</v-btn>
      <div v-if="success" class="success--text">{{success}}</div>
    </v-col>
  </v-row>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: ['product'],
  components: { Card },
  data () {
    return {
      success: '',
      valid: true,
      complete: false,
      errorMessage: '',
      stripeOptions: {
        hidePostalCode: true
      }
    }
  },
  computed: {
    ...mapGetters({
      authuser: 'auth/authuser'
    })
  },
  methods: {
    ...mapMutations({
      addGems: 'auth/SET_WALLET'
    }),
    errorHandler: function (event) {
      this.errorMessage = event.error ? event.error.message : ''
    },
    async pay (product) {
      const result = await createToken()
      const response = await axios.post('/checkout', {
        stripeToken: result.token.id,
        amount: product.cost,
        quantity: product.quantity,
        description: product.quantity + ' gems for ' + this.authuser.email
      })
      if (response.status === 200) {
        this.success = response.data.message
        this.createReceipt(product.id)
        this.addGems(response.data.newWallet)
        this.valid = false
      }
    },
    createReceipt (id) {
      axios.post('/receipts', {
        product_id: id,
        user_id: this.authuser.id
      })
    }
  }
}
</script>

<style>
#card-errors {
  color: #fa755a;
}
.StripeElement {
  box-sizing: border-box;
  height: 45px;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}
.StripeElement--invalid {
  border-color: #fa755a;
}
.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
